import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useChatSocket } from '@/composables/useChatSocket'
import { chatService } from '@/services/chatService'
import { useUserStore } from '@/stores/userStore'
import {
    buildChatTitle,
    formatChatPreview,
    formatChatRole,
    formatChatTime,
    formatTaskTitle,
    getChatUserDisplayName,
} from '@/utils/chatFormatters'
import type { ChatFilter, ChatItem, ChatMessage, ChatRoom, ChatUser } from '@/types/chatTypes'

const accessStorageKey = 'access_token'

function roomKey(roomId: number | string) {
    return String(roomId)
}

function userKey(id: number | string | null | undefined): string | null {
    return id === null || id === undefined ? null : String(id)
}

function getCurrentUserId(): number | string | null {
    const userId = useUserStore().user?.id
    if (typeof userId === 'number' || typeof userId === 'string') return userId

    const token = typeof window === 'undefined'
        ? null
        : window.localStorage.getItem(accessStorageKey)

    if (!token) return null

    try {
        const [, payload] = token.split('.')
        if (!payload) return null

        const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/')
        const paddedPayload = normalizedPayload.padEnd(
            normalizedPayload.length + ((4 - normalizedPayload.length % 4) % 4),
            '=',
        )
        const decodedPayload = JSON.parse(window.atob(paddedPayload)) as { user_id?: number | string }
        return decodedPayload.user_id ?? null
    } catch {
        return null
    }
}

function isOwnMessage(author: ChatUser): boolean {
    const currentUserId = getCurrentUserId()
    const authorId = userKey(author.id)
    const currentId = userKey(currentUserId)

    return authorId !== null && currentId !== null && authorId === currentId
}

function mapMessage(message: Omit<ChatMessage, 'isOwn'>): ChatMessage {
    return {
        ...message,
        isOwn: isOwnMessage(message.author),
    }
}

function mapRoom(room: ChatRoom, messages: ChatMessage[] = []): ChatItem {
    const teacherName = getChatUserDisplayName(room.teacher)
    const [fallbackFirstName = teacherName, fallbackLastName = ''] = teacherName.split(' ')

    return {
        id: room.id,
        room,
        teacher: {
            id: room.teacher?.id ?? 'teacher',
            username: room.teacher?.username ?? '',
            firstName: room.teacher?.first_name || fallbackFirstName,
            lastName: room.teacher?.last_name || fallbackLastName,
            role: room.teacher?.role ?? 'teacher',
            position: formatChatRole(room.teacher?.role),
        },
        context: {
            courseId: room.course?.id,
            courseTitle: room.course?.title,
            taskId: room.task_detail?.id,
            taskNumber: room.task_detail?.number ?? undefined,
            taskTitle: room.task_detail ? formatTaskTitle(room.task_detail) : undefined,
            topicTitle: room.task_detail?.theme?.title,
        },
        title: buildChatTitle(room),
        lastMessage: formatChatPreview(room.last_message?.content) || 'Сообщений пока нет',
        lastMessageAt: formatChatTime(room.last_message_at ?? room.last_message?.timestamp),
        unreadCount: room.unread_count,
        messages,
    }
}

function getRoomActivityTime(room: ChatRoom): number {
    const value = room.last_message_at ?? room.last_message?.timestamp ?? room.updated_at ?? room.created_at
    if (!value) return 0

    const time = new Date(value).getTime()
    return Number.isNaN(time) ? 0 : time
}

export const useChatStore = defineStore('chat', () => {
    const rooms = ref<ChatRoom[]>([])
    const activeRoomId = ref<number | string | null>(null)
    const messagesByRoom = ref<Record<string, ChatMessage[]>>({})
    const filter = ref<ChatFilter>('all')
    const searchQuery = ref('')
    const isRoomsLoading = ref(false)
    const isMessagesLoading = ref(false)
    const isSending = ref(false)
    const roomsError = ref<string | null>(null)
    const messagesError = ref<string | null>(null)
    const socketError = ref<string | null>(null)

    const socket = useChatSocket({
        onNewMessage: handleSocketNewMessage,
        onError: (message) => {
            socketError.value = message
        },
    })

    function isActiveRoom(roomId: number | string | null): roomId is number | string {
        return activeRoomId.value !== null && roomId !== null && roomKey(activeRoomId.value) === roomKey(roomId)
    }

    const chats = computed<ChatItem[]>(() => {
        return rooms.value.map((room) => mapRoom(room, messagesByRoom.value[roomKey(room.id)] ?? []))
    })

    const activeChatId = computed(() => activeRoomId.value)

    const activeChat = computed(() => {
        const roomId = activeRoomId.value
        if (roomId === null) return null

        return chats.value.find((chat) => roomKey(chat.id) === roomKey(roomId)) ?? null
    })

    const isLoading = computed(() => isRoomsLoading.value)

    const error = computed(() => roomsError.value ?? messagesError.value ?? socketError.value)

    const socketStatus = computed(() => socket.status.value)

    const filteredChats = computed(() => {
        const query = searchQuery.value.trim().toLowerCase()

        return chats.value.filter((chat) => {
            const matchesFilter =
                filter.value === 'all' ||
                (filter.value === 'unread' && chat.unreadCount > 0)

            const context = [
                getChatUserDisplayName(chat.room.teacher),
                chat.title,
                chat.context.courseTitle,
                chat.context.taskTitle,
                chat.context.taskNumber,
                chat.context.topicTitle,
                chat.lastMessage,
            ].filter(Boolean).join(' ').toLowerCase()

            return matchesFilter && (!query || context.includes(query))
        })
    })

    async function loadRooms() {
        isRoomsLoading.value = true
        roomsError.value = null

        try {
            const response = await chatService.getRooms()
            rooms.value = [...response.results].sort((firstRoom, secondRoom) => (
                getRoomActivityTime(secondRoom) - getRoomActivityTime(firstRoom)
            ))

        } catch {
            roomsError.value = 'Не удалось загрузить чаты'
        } finally {
            isRoomsLoading.value = false
        }
    }

    async function selectRoom(roomId: number | string) {
        activeRoomId.value = roomId
        disconnectSocket()

        await loadMessages(roomId)
        if (!isActiveRoom(roomId)) return

        await markRoomAsRead(roomId)
        if (!isActiveRoom(roomId)) return

        await connectActiveRoomSocket(roomId)
    }

    async function loadMessages(roomId: number | string) {
        isMessagesLoading.value = true
        messagesError.value = null

        try {
            const response = await chatService.getRoomMessages(roomId, {
                page: 1,
                page_size: 50,
            })

            messagesByRoom.value = {
                ...messagesByRoom.value,
                [roomKey(roomId)]: [...response.results].reverse().map(mapMessage),
            }
        } catch {
            messagesError.value = 'Не удалось загрузить сообщения'
        } finally {
            isMessagesLoading.value = false
        }
    }

    async function markRoomAsRead(roomId: number | string) {
        try {
            await chatService.markRoomAsRead(roomId)
            rooms.value = rooms.value.map((room) => (
                roomKey(room.id) === roomKey(roomId)
                    ? { ...room, unread_count: 0 }
                    : room
            ))
        } catch {
        }
    }

    async function sendMessage(content: string) {
        const roomId = activeRoomId.value
        const messageText = content.trim()

        if (roomId === null || !messageText) return

        isSending.value = true
        socketError.value = null

        try {
            const sent = socket.sendMessage(messageText)
            if (!sent) return
        } finally {
            isSending.value = false
        }
    }

    async function connectActiveRoomSocket(roomId: number | string | null = activeRoomId.value) {
        if (!isActiveRoom(roomId)) return
        await socket.connect(roomId)
    }

    function disconnectSocket() {
        socket.disconnect()
    }

    function clearActiveRoom() {
        activeRoomId.value = null
        messagesError.value = null
        socketError.value = null
        disconnectSocket()
    }

    async function handleSocketNewMessage() {
        const roomId = activeRoomId.value
        if (roomId !== null) {
            await loadMessages(roomId)
            await markRoomAsRead(roomId)
        }

        await loadRooms()
    }

    function setFilter(value: ChatFilter) {
        filter.value = value
    }

    function setSearchQuery(value: string) {
        searchQuery.value = value
    }

    function clearChatState() {
        rooms.value = []
        activeRoomId.value = null
        messagesByRoom.value = {}
        filter.value = 'all'
        searchQuery.value = ''
        roomsError.value = null
        messagesError.value = null
        socketError.value = null
        disconnectSocket()
    }

    return {
        rooms,
        chats,
        activeRoomId,
        activeChatId,
        messagesByRoom,
        filter,
        searchQuery,
        isRoomsLoading,
        isMessagesLoading,
        isSending,
        isLoading,
        roomsError,
        messagesError,
        socketStatus,
        socketError,
        error,
        activeChat,
        filteredChats,
        loadRooms,
        selectRoom,
        loadMessages,
        markRoomAsRead,
        sendMessage,
        connectActiveRoomSocket,
        disconnectSocket,
        clearActiveRoom,
        setFilter,
        setSearchQuery,
        clearChatState,
    }
})
