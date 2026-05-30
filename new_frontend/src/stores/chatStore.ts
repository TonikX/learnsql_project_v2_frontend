import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useChatSocket } from '@/composables/useChatSocket'
import { extractApiErrorMessage, getApiErrorStatus } from '@/errors/network'
import { chatService } from '@/services/chatService'
import { useUserStore } from '@/stores/userStore'
import {
    buildChatTitle,
    formatChatPreview,
    formatChatTime,
    getChatUserDisplayName,
} from '@/utils/chatFormatters'
import type { ChatFilter, ChatItem, ChatMessage, ChatRoom, ChatUser } from '@/types/chatTypes'

const accessStorageKey = 'access_token'
type ChatEndpointMode = 'student' | 'teacher' | 'unknown'
type LoadRoomsOptions = {
    silent?: boolean
    silentError?: boolean
}
type PendingOutgoingMessage = {
    clientTempId: string
    roomId: number | string
    content: string
    createdAt: string
}
const outgoingEchoMatchWindowMs = 20_000
let roomsLoadPromise: Promise<void> | null = null
let roomsLoadPromiseOptions: LoadRoomsOptions | null = null

function roomKey(roomId: number | string) {
    return String(roomId)
}

function createClientTempId() {
    return `outgoing-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function getMessageTime(message: Pick<ChatMessage, 'createdAt' | 'timestamp'>) {
    const time = new Date(message.createdAt ?? message.timestamp).getTime()
    return Number.isNaN(time) ? 0 : time
}

function userKey(id: number | string | null | undefined): string | null {
    return id === null || id === undefined ? null : String(id)
}

function usernameKey(username: string | null | undefined): string | null {
    const normalizedUsername = username?.trim().toLowerCase()
    return normalizedUsername ? `username:${normalizedUsername}` : null
}

function isTeacherChatRole(role?: string | null) {
    return role === 'teacher' || role === 'moderator' || role === 'admin' || role === 'staff'
}

function getAccessTokenPayload(): Record<string, unknown> | null {
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
        return JSON.parse(window.atob(paddedPayload)) as Record<string, unknown>
    } catch {
        return null
    }
}

function getCurrentUserId(): number | string | null {
    const userId = useUserStore().user?.id
    if (typeof userId === 'number' || typeof userId === 'string') return userId

    const tokenUserId = getAccessTokenPayload()?.user_id
    return typeof tokenUserId === 'number' || typeof tokenUserId === 'string'
        ? tokenUserId
        : null
}

function getCurrentUserRole() {
    const storeRole = useUserStore().user?.role
    if (typeof storeRole === 'string' && storeRole) return storeRole

    const payload = getAccessTokenPayload()
    const tokenRole = payload?.role ?? payload?.user_role

    return typeof tokenRole === 'string' && tokenRole ? tokenRole : null
}

function getChatEndpointMode(): ChatEndpointMode {
    const role = getCurrentUserRole()
    if (!role) return 'unknown'
    return isTeacherChatRole(role) ? 'teacher' : 'student'
}

function isForbiddenError(error: unknown) {
    return typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        (error as { response?: { status?: number } }).response?.status === 403
}

function normalizeKnownChatError(message: string) {
    const normalized = message.toLowerCase()

    if (normalized.includes('permission to manage moderators')) {
        return 'У вас нет прав на добавление модератора'
    }
    if (normalized.includes('user with id') && normalized.includes('does not exist')) {
        return 'Пользователь с таким ID не найден'
    }
    if (normalized.includes('only teacher users can be moderators')) {
        return 'Этот пользователь не может быть модератором. Выберите преподавателя'
    }
    if (normalized.includes('you do not have access') || normalized.includes('forbidden')) {
        return 'Нет доступа к этому чату'
    }
    if (normalized.includes('not found')) {
        return 'Чат не найден или недоступен'
    }

    return message
}

function getChatRequestErrorMessage(error: unknown, fallbackMessage: string) {
    const status = getApiErrorStatus(error)
    const message = normalizeKnownChatError(extractApiErrorMessage(error, fallbackMessage))

    if (message !== fallbackMessage) return message
    if (status === 403) return 'Нет доступа к этому чату'
    if (status === 404) return 'Чат не найден или недоступен'
    if (status === 500) return 'Не удалось загрузить данные. Проверьте подключение или попробуйте позже'

    return message
}

function getModeratorErrorMessage(error: unknown) {
    return getChatRequestErrorMessage(error, 'Не удалось добавить модератора')
}

async function ensureCurrentUserForChats() {
    const userStore = useUserStore()
    if (userStore.user?.role) return

    try {
        const user = await chatService.getCurrentUser()
        if (user) {
            userStore.setUser(user)
        }
    } catch {
    }
}

function getCurrentChatUser(): ChatUser {
    const user = useUserStore().user

    return {
        id: user?.id ?? 'current-user',
        username: user?.username ?? '',
        first_name: user?.first_name ?? '',
        last_name: user?.last_name ?? '',
        role: user?.role ?? 'student',
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

function dedupeUsers(users: Array<ChatUser | null | undefined>) {
    const seen = new Set<string>()

    return users.filter((user): user is ChatUser => {
        if (!user) return false
        const key = userKey(user.id) ?? user.username
        if (seen.has(key)) return false
        seen.add(key)
        return true
    })
}

function mergeUserDetails(user: ChatUser, fallback: ChatUser | null | undefined): ChatUser {
    if (!fallback) return user

    return {
        ...fallback,
        ...user,
        username: user.username || fallback.username,
        first_name: user.first_name?.trim() ? user.first_name : fallback.first_name,
        firstName: user.firstName?.trim() ? user.firstName : fallback.firstName,
        last_name: user.last_name?.trim() ? user.last_name : fallback.last_name,
        lastName: user.lastName?.trim() ? user.lastName : fallback.lastName,
        full_name: user.full_name?.trim() ? user.full_name : fallback.full_name,
        fullName: user.fullName?.trim() ? user.fullName : fallback.fullName,
        name: user.name?.trim() ? user.name : fallback.name,
        role: user.role ?? fallback.role,
    }
}

function roomUserLookupKeys(user: ChatUser | null | undefined) {
    return [
        userKey(user?.id),
        usernameKey(user?.username),
    ].filter((key): key is string => key !== null)
}

function setLookupUser(lookup: Map<string, ChatUser>, user: ChatUser) {
    const keys = roomUserLookupKeys(user)
    const current = keys.map((key) => lookup.get(key)).find(Boolean)
    const merged = mergeUserDetails(user, current)

    keys.forEach((key) => {
        lookup.set(key, merged)
    })
}

function buildRoomUserLookup(room: ChatRoom, messages: ChatMessage[] = []) {
    const users = [
        room.teacher,
        room.student,
        getRoomCreatorUser(room),
        ...room.subscribers,
        ...(room.moderators ?? []),
        ...(room.administrators ?? []).map((admin) => admin.user),
        ...messages.map((message) => message.author),
    ]
    const lookup = new Map<string, ChatUser>()

    users.forEach((user) => {
        if (!user) return
        setLookupUser(lookup, user)
    })

    return lookup
}

function enrichRoomUser(user: ChatUser | null | undefined, lookup: Map<string, ChatUser>): ChatUser | null {
    if (!user) return null

    const fallback = roomUserLookupKeys(user)
        .map((key) => lookup.get(key))
        .find(Boolean)

    return mergeUserDetails(user, fallback)
}

function getRoomModerators(room: ChatRoom, lookup: Map<string, ChatUser>) {
    const moderators = room.moderators?.length
        ? room.moderators
        : (room.administrators ?? [])
        .filter((admin) => admin.main_admin === false)
        .map((admin) => admin.user)
        .filter((user): user is ChatUser => Boolean(user))

    return moderators
        .map((user) => enrichRoomUser(user, lookup))
        .filter((user): user is ChatUser => Boolean(user))
}

function isStudentUser(user: ChatUser | null | undefined): user is ChatUser {
    return user?.role === 'student'
}

function getRoomCreatorUser(room: ChatRoom): ChatUser | null {
    return typeof room.creator === 'object' && room.creator !== null ? room.creator : null
}

function getRoomCreatorId(room: ChatRoom): number | string | null {
    if (typeof room.creator === 'number' || typeof room.creator === 'string') return room.creator
    return room.creator?.id ?? null
}

function getLookupUserById(lookup: Map<string, ChatUser>, id: number | string | null) {
    if (id === null) return null
    return lookup.get(String(id)) ?? null
}

function getFirstStudentMessageAuthor(messages: ChatMessage[], lookup: Map<string, ChatUser>) {
    return messages
        .map((message) => enrichRoomUser(message.author, lookup))
        .find(isStudentUser) ?? null
}

function getRoomStudent(room: ChatRoom, lookup: Map<string, ChatUser>, messages: ChatMessage[] = []) {
    const explicitStudent = enrichRoomUser(room.student, lookup)
    if (isStudentUser(explicitStudent)) return explicitStudent

    const creatorStudent = enrichRoomUser(getLookupUserById(lookup, getRoomCreatorId(room)), lookup)
    if (isStudentUser(creatorStudent)) return creatorStudent

    const messageStudent = getFirstStudentMessageAuthor(messages, lookup)
    if (messageStudent) return messageStudent

    const subscriberStudent = room.subscribers.find((user) => user.role === 'student') ?? null
    return enrichRoomUser(subscriberStudent, lookup)
}

function getRoomParticipants(room: ChatRoom, isTeacherView: boolean, messages: ChatMessage[] = []) {
    const lookup = buildRoomUserLookup(room, messages)
    const moderators = getRoomModerators(room, lookup)

    if (!isTeacherView) {
        return dedupeUsers([enrichRoomUser(room.teacher, lookup), ...moderators])
    }

    return dedupeUsers([getRoomStudent(room, lookup, messages), ...moderators])
}

function mapRoom(room: ChatRoom, messages: ChatMessage[] = [], isTeacherView = false): ChatItem {
    const lastMessage = room.last_message
    const isLastMessageOwn = lastMessage ? isOwnMessage(lastMessage.author) : false
    const lastMessageAuthorName = lastMessage && !isLastMessageOwn
        ? getChatUserDisplayName(lastMessage.author)
        : null

    return {
        id: room.id,
        room,
        context: {
            courseId: room.course?.id,
            courseTitle: room.course?.title,
        },
        title: buildChatTitle(room),
        lastMessage: formatChatPreview(lastMessage?.content) || 'Сообщений пока нет',
        lastMessageAuthorName,
        isLastMessageOwn,
        lastMessageAt: formatChatTime(room.last_message_at ?? room.last_message?.timestamp),
        unreadCount: room.unread_count,
        participants: getRoomParticipants(room, isTeacherView, messages),
        messages,
    }
}

function getRoomActivityTime(room: ChatRoom): number {
    const value = room.last_message_at ?? room.last_message?.timestamp ?? room.updated_at ?? room.created_at
    if (!value) return 0

    const time = new Date(value).getTime()
    return Number.isNaN(time) ? 0 : time
}

function sortRoomsByActivity(roomList: ChatRoom[]) {
    return [...roomList].sort((firstRoom, secondRoom) => (
        getRoomActivityTime(secondRoom) - getRoomActivityTime(firstRoom)
    ))
}

export const useChatStore = defineStore('chat', () => {
    const rooms = ref<ChatRoom[]>([])
    const activeRoomId = ref<number | string | null>(null)
    const messagesByRoom = ref<Record<string, ChatMessage[]>>({})
    const filter = ref<ChatFilter>('all')
    const courseFilter = ref('all')
    const searchQuery = ref('')
    const unreadRoomsCount = ref(0)
    const isRoomsLoading = ref(false)
    const isMessagesLoading = ref(false)
    const isSending = ref(false)
    const hasLoadedRooms = ref(false)
    const roomsError = ref<string | null>(null)
    const messagesError = ref<string | null>(null)
    const socketError = ref<string | null>(null)
    const pendingOutgoingContent = ref<string | null>(null)
    const pendingOutgoingMessage = ref<PendingOutgoingMessage | null>(null)
    const resolvedEndpointMode = ref<ChatEndpointMode>('unknown')

    const socket = useChatSocket({
        onNewMessage: handleSocketNewMessage,
        onError: handleSocketError,
    })

    const isTeacherMode = computed(() => (
        isTeacherChatRole(getCurrentUserRole()) || resolvedEndpointMode.value === 'teacher'
    ))
    const canUseCourseFilter = computed(() => isTeacherMode.value)

    function isActiveRoom(roomId: number | string | null): roomId is number | string {
        return activeRoomId.value !== null && roomId !== null && roomKey(activeRoomId.value) === roomKey(roomId)
    }

    const chats = computed<ChatItem[]>(() => {
        return rooms.value.map((room) => mapRoom(
            room,
            messagesByRoom.value[roomKey(room.id)] ?? [],
            isTeacherMode.value,
        ))
    })

    const activeChatId = computed(() => activeRoomId.value)

    const activeChat = computed(() => {
        const roomId = activeRoomId.value
        if (roomId === null) return null

        return chats.value.find((chat) => roomKey(chat.id) === roomKey(roomId)) ?? null
    })

    const isLoading = computed(() => isRoomsLoading.value)

    const error = computed(() => roomsError.value ?? messagesError.value ?? socketError.value)

    const courseOptions = computed(() => {
        const options = new Map<string, string>()

        chats.value.forEach((chat) => {
            const courseId = chat.context.courseId
            const title = chat.context.courseTitle
            if (courseId === undefined || courseId === null || !title) return
            options.set(String(courseId), title)
        })

        return Array.from(options, ([value, label]) => ({ value, label }))
            .sort((first, second) => first.label.localeCompare(second.label, 'ru'))
    })

    const filteredChats = computed(() => {
        const query = searchQuery.value.trim().toLowerCase()

        return chats.value.filter((chat) => {
            const matchesFilter =
                filter.value === 'all' ||
                (filter.value === 'unread' && chat.unreadCount > 0)

            const matchesCourse =
                !canUseCourseFilter.value ||
                courseFilter.value === 'all' ||
                String(chat.context.courseId) === courseFilter.value

            const context = [
                getChatUserDisplayName(chat.room.teacher),
                getChatUserDisplayName(chat.room.student),
                ...chat.participants.map(getChatUserDisplayName),
                chat.title,
                chat.context.courseTitle,
                chat.lastMessageAuthorName,
                chat.lastMessage,
            ].filter(Boolean).join(' ').toLowerCase()

            return matchesFilter && matchesCourse && (!query || context.includes(query))
        })
    })

    async function loadRooms(options: LoadRoomsOptions = {}) {
        if (roomsLoadPromise) {
            const currentOptions = roomsLoadPromiseOptions

            await roomsLoadPromise

            if (currentOptions?.silent && !options.silent && !hasLoadedRooms.value) {
                return loadRooms(options)
            }

            return
        }

        roomsLoadPromise = loadRoomsInternal(options).finally(() => {
            roomsLoadPromise = null
            roomsLoadPromiseOptions = null
        })
        roomsLoadPromiseOptions = { ...options }

        return roomsLoadPromise
    }

    async function loadRoomsInternal(options: LoadRoomsOptions = {}) {
        if (!options.silent) {
            isRoomsLoading.value = true
        }
        if (!options.silentError) {
            roomsError.value = null
        }

        try {
            await ensureCurrentUserForChats()
            const { response, mode } = await loadRoomsByEndpointMode(getChatEndpointMode())

            resolvedEndpointMode.value = mode
            rooms.value = sortRoomsByActivity(response.results)
            unreadRoomsCount.value = response.unread_rooms_count ?? rooms.value.filter((room) => room.unread_count > 0).length
            hasLoadedRooms.value = true
        } catch (error) {
            if (!options.silentError) {
                roomsError.value = getChatRequestErrorMessage(error, 'Не удалось загрузить чаты')
            }
        } finally {
            if (!options.silent) {
                isRoomsLoading.value = false
            }
        }
    }

    async function loadRoomsByEndpointMode(mode: ChatEndpointMode) {
        if (mode === 'teacher') return { response: await chatService.getTeacherRooms(), mode }
        if (mode === 'student') return { response: await chatService.getRooms(), mode }

        try {
            return { response: await chatService.getTeacherRooms(), mode: 'teacher' as const }
        } catch (error) {
            if (!isForbiddenError(error)) throw error
            return { response: await chatService.getRooms(), mode: 'student' as const }
        }
    }

    async function selectRoom(roomId: number | string) {
        activeRoomId.value = roomId
        disconnectSocket()

        const canUseCache = canUseMessagesCache(roomId)
        if (canUseCache) {
            messagesError.value = null
        }

        const didLoadMessages = canUseCache ? true : await loadMessages(roomId)
        if (!isActiveRoom(roomId)) return

        if (didLoadMessages) {
            markRoomAsReadLocally(roomId)
        }

        await connectActiveRoomSocket(roomId)
    }

    function hasCachedMessages(roomId: number | string) {
        return Object.prototype.hasOwnProperty.call(messagesByRoom.value, roomKey(roomId))
    }

    function getRoomById(roomId: number | string) {
        return rooms.value.find((room) => roomKey(room.id) === roomKey(roomId)) ?? null
    }

    function roomHasUnreadMessages(roomId: number | string) {
        return (getRoomById(roomId)?.unread_count ?? 0) > 0
    }

    function cachedMessagesContainLastMessage(roomId: number | string) {
        const room = getRoomById(roomId)
        const lastMessageId = room?.last_message?.id
        if (lastMessageId === null || lastMessageId === undefined) return true

        return (messagesByRoom.value[roomKey(roomId)] ?? [])
            .some((message) => String(message.id) === String(lastMessageId))
    }

    function canUseMessagesCache(roomId: number | string) {
        return hasCachedMessages(roomId) &&
            !roomHasUnreadMessages(roomId) &&
            cachedMessagesContainLastMessage(roomId)
    }

    async function loadMessages(roomId: number | string) {
        isMessagesLoading.value = true
        messagesError.value = null

        try {
            const response = await chatService.getRoomMessages(roomId, {
                page: 1,
                page_size: 50,
            })

            const key = roomKey(roomId)
            const failedMessages = (messagesByRoom.value[key] ?? [])
                .filter((message) => message.deliveryStatus === 'failed')
            const backendMessages = [...response.results].reverse().map(mapMessage)

            messagesByRoom.value = {
                ...messagesByRoom.value,
                [key]: mergeMessagesWithFailed(backendMessages, failedMessages),
            }
            return true
        } catch (error) {
            messagesError.value = getChatRequestErrorMessage(error, 'Не удалось загрузить сообщения')
            return false
        } finally {
            isMessagesLoading.value = false
        }
    }

    function mergeMessagesWithFailed(messages: ChatMessage[], failedMessages: ChatMessage[]) {
        const messageIds = new Set(messages.map((message) => String(message.id)))
        const nextFailedMessages = failedMessages.filter((message) => !messageIds.has(String(message.id)))

        return [...messages, ...nextFailedMessages]
    }

    function markRoomAsReadLocally(roomId: number | string) {
        const currentRoom = getRoomById(roomId)
        const hadUnread = (currentRoom?.unread_count ?? 0) > 0

        rooms.value = rooms.value.map((room) => (
            roomKey(room.id) === roomKey(roomId)
                ? { ...room, unread_count: 0 }
                : room
        ))
        if (hadUnread) {
            unreadRoomsCount.value = Math.max(0, unreadRoomsCount.value - 1)
        }
    }

    async function markRoomAsRead(roomId: number | string) {
        try {
            await chatService.markRoomAsRead(roomId)
            markRoomAsReadLocally(roomId)
        } catch {
        }
    }

    async function sendMessage(content: string) {
        const roomId = activeRoomId.value
        const messageText = content.trim()

        if (roomId === null || !messageText) return
        if (pendingOutgoingContent.value) return

        isSending.value = true
        socketError.value = null
        pendingOutgoingMessage.value = {
            clientTempId: createClientTempId(),
            roomId,
            content: messageText,
            createdAt: new Date().toISOString(),
        }
        pendingOutgoingContent.value = messageText

        try {
            const sent = socket.sendMessage(messageText)
            if (!sent && pendingOutgoingContent.value) {
                addFailedMessage(
                    roomId,
                    messageText,
                    socket.error.value ?? 'Не удалось отправить сообщение',
                    pendingOutgoingMessage.value,
                )
                pendingOutgoingMessage.value = null
                pendingOutgoingContent.value = null
                isSending.value = false
            }
        } catch {
            addFailedMessage(roomId, messageText, 'Не удалось отправить сообщение', pendingOutgoingMessage.value)
            pendingOutgoingMessage.value = null
            pendingOutgoingContent.value = null
            isSending.value = false
        }
    }

    async function retryFailedMessage(messageId: number | string, content: string) {
        if (pendingOutgoingContent.value) return

        const roomId = findMessageRoomId(messageId)
        if (roomId === null) {
            socketError.value = 'Не удалось найти сообщение для повторной отправки'
            return
        }
        if (!isActiveRoom(roomId)) {
            const retryError = 'Откройте этот чат, чтобы повторить отправку сообщения'
            updateFailedMessageError(roomId, messageId, retryError)
            socketError.value = retryError
            return
        }

        isSending.value = true
        socketError.value = null

        const isReadyToSend = await socket.ensureConnected(roomId)
        if (!isReadyToSend) {
            const retryError = socket.error.value ?? 'Не удалось подключиться к чату'
            updateFailedMessageError(roomId, messageId, retryError)
            socketError.value = retryError
            isSending.value = false
            return
        }

        isSending.value = false
        removeMessage(roomId, messageId)
        await sendMessage(content)
    }

    async function addModeratorToActiveRoom(userId: number | string) {
        const roomId = activeRoomId.value
        if (roomId === null) return

        try {
            const administrators = await chatService.addModerator(roomId, userId)
            rooms.value = rooms.value.map((room) => (
                roomKey(room.id) === roomKey(roomId)
                    ? { ...room, administrators }
                    : room
            ))
            socketError.value = null
        } catch (error) {
            socketError.value = getModeratorErrorMessage(error)
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
        pendingOutgoingContent.value = null
        pendingOutgoingMessage.value = null
        isSending.value = false
        resolvedEndpointMode.value = 'unknown'
        disconnectSocket()
    }

    async function handleSocketNewMessage(payload: { message?: Omit<ChatMessage, 'isOwn'> }) {
        if (!payload.message) return

        const message = mapMessage(payload.message)
        const messageRoomId = payload.message.room ?? activeRoomId.value
        if (messageRoomId === null || messageRoomId === undefined) return

        removeMatchingOutgoingFailure(messageRoomId, message)
        appendMessage(messageRoomId, message)
        updateRoomAfterMessage(messageRoomId, payload.message, isActiveRoom(messageRoomId))

        if (message.isOwn || pendingOutgoingContent.value === message.content) {
            pendingOutgoingContent.value = null
            pendingOutgoingMessage.value = null
            isSending.value = false
        }

        if (isActiveRoom(messageRoomId)) {
            await markRoomAsRead(messageRoomId)
        }
    }

    function handleSocketError(message: string) {
        socketError.value = message

        const roomId = activeRoomId.value
        const pendingMessage = pendingOutgoingMessage.value
        const failedContent = pendingMessage?.content ?? pendingOutgoingContent.value

        if (roomId !== null && failedContent) {
            addFailedMessage(roomId, failedContent, message, pendingMessage)
            pendingOutgoingMessage.value = null
            pendingOutgoingContent.value = null
            isSending.value = false
        }
    }

    function appendMessage(roomId: number | string, message: ChatMessage) {
        const key = roomKey(roomId)
        const currentMessages = messagesByRoom.value[key] ?? []

        if (currentMessages.some((currentMessage) => String(currentMessage.id) === String(message.id))) {
            return
        }

        messagesByRoom.value = {
            ...messagesByRoom.value,
            [key]: [...currentMessages, message],
        }
    }

    function findMessageRoomId(messageId: number | string): number | string | null {
        const foundEntry = Object.entries(messagesByRoom.value).find(([, messages]) => (
            messages.some((message) => String(message.id) === String(messageId))
        ))

        return foundEntry?.[0] ?? null
    }

    function removeMessage(roomId: number | string, messageId: number | string) {
        const key = roomKey(roomId)
        const currentMessages = messagesByRoom.value[key] ?? []

        messagesByRoom.value = {
            ...messagesByRoom.value,
            [key]: currentMessages.filter((message) => String(message.id) !== String(messageId)),
        }
    }

    function updateFailedMessageError(roomId: number | string, messageId: number | string, errorMessage: string) {
        const key = roomKey(roomId)
        const currentMessages = messagesByRoom.value[key] ?? []

        messagesByRoom.value = {
            ...messagesByRoom.value,
            [key]: currentMessages.map((message) => (
                String(message.id) === String(messageId)
                    ? { ...message, error: errorMessage }
                    : message
            )),
        }
    }

    function removeMatchingOutgoingFailure(roomId: number | string, message: ChatMessage) {
        if (!message.isOwn) return

        const key = roomKey(roomId)
        const currentMessages = messagesByRoom.value[key] ?? []
        const backendMessageTime = getMessageTime(message)
        const nextMessages = currentMessages.filter((currentMessage) => {
            if (currentMessage.deliveryStatus !== 'failed') return true
            if (!currentMessage.isOwn) return true
            if (currentMessage.content !== message.content) return true

            const failedMessageTime = getMessageTime(currentMessage)
            return !backendMessageTime ||
                !failedMessageTime ||
                Math.abs(backendMessageTime - failedMessageTime) > outgoingEchoMatchWindowMs
        })

        if (nextMessages.length === currentMessages.length) return

        messagesByRoom.value = {
            ...messagesByRoom.value,
            [key]: nextMessages,
        }
    }

    function addFailedMessage(
        roomId: number | string,
        content: string,
        errorMessage: string,
        pendingMessage: PendingOutgoingMessage | null,
    ) {
        const createdAt = pendingMessage?.createdAt ?? new Date().toISOString()
        const clientTempId = pendingMessage?.clientTempId ?? createClientTempId()

        appendMessage(roomId, {
            id: `failed-${clientTempId}`,
            room: roomId,
            author: getCurrentChatUser(),
            content,
            timestamp: createdAt,
            isOwn: true,
            deliveryStatus: 'failed',
            clientTempId,
            createdAt,
            error: errorMessage,
        })
    }

    function updateRoomAfterMessage(
        roomId: number | string,
        message: Omit<ChatMessage, 'isOwn'>,
        isActive: boolean,
    ) {
        rooms.value = sortRoomsByActivity(rooms.value.map((room) => {
            if (roomKey(room.id) !== roomKey(roomId)) return room

            return {
                ...room,
                last_message: message,
                last_message_at: message.timestamp,
                unread_count: isActive ? 0 : room.unread_count + 1,
            }
        }))
        unreadRoomsCount.value = rooms.value.filter((room) => room.unread_count > 0).length
    }

    function setFilter(value: ChatFilter) {
        filter.value = value
    }

    function setCourseFilter(value: string) {
        courseFilter.value = value
    }

    function setSearchQuery(value: string) {
        searchQuery.value = value
    }

    function clearChatState() {
        rooms.value = []
        activeRoomId.value = null
        messagesByRoom.value = {}
        filter.value = 'all'
        courseFilter.value = 'all'
        searchQuery.value = ''
        unreadRoomsCount.value = 0
        hasLoadedRooms.value = false
        roomsError.value = null
        messagesError.value = null
        socketError.value = null
        pendingOutgoingContent.value = null
        pendingOutgoingMessage.value = null
        isSending.value = false
        roomsLoadPromise = null
        roomsLoadPromiseOptions = null
        disconnectSocket()
    }

    return {
        rooms,
        chats,
        activeRoomId,
        activeChatId,
        messagesByRoom,
        filter,
        courseFilter,
        courseOptions,
        canUseCourseFilter,
        searchQuery,
        unreadRoomsCount,
        isRoomsLoading,
        isMessagesLoading,
        isSending,
        hasLoadedRooms,
        isLoading,
        roomsError,
        messagesError,
        socketError,
        error,
        activeChat,
        filteredChats,
        loadRooms,
        selectRoom,
        loadMessages,
        markRoomAsRead,
        sendMessage,
        retryFailedMessage,
        addModeratorToActiveRoom,
        connectActiveRoomSocket,
        disconnectSocket,
        clearActiveRoom,
        setFilter,
        setCourseFilter,
        setSearchQuery,
        clearChatState,
    }
})
