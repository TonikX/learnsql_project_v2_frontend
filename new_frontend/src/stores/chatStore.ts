import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { chatMockService } from '@/services/chatMockService'
import type { ChatFilter, ChatItem } from '@/types/chatTypes'

export const useChatStore = defineStore('chat', () => {
    const chats = ref<ChatItem[]>([])
    const activeChatId = ref<number | string | null>(null)
    const filter = ref<ChatFilter>('all')
    const searchQuery = ref('')
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const activeChat = computed(() => {
        return chats.value.find((chat) => chat.id === activeChatId.value) ?? null
    })

    const filteredChats = computed(() => {
        const query = searchQuery.value.trim().toLowerCase()

        return chats.value.filter((chat) => {
            const matchesFilter =
                filter.value === 'all' ||
                (filter.value === 'unread' && chat.unreadCount > 0) ||
                (filter.value === 'tasks' && chat.category === 'task') ||
                (filter.value === 'courses' && chat.category === 'course')

            const teacherName = `${chat.teacher.firstName} ${chat.teacher.lastName}`.toLowerCase()
            const context = [
                chat.title,
                chat.context.courseTitle,
                chat.context.topicTitle,
                chat.lastMessage,
                teacherName,
            ].join(' ').toLowerCase()

            return matchesFilter && (!query || context.includes(query))
        })
    })

    async function loadChats() {
        isLoading.value = true
        error.value = null

        try {
            chats.value = await chatMockService.getChats()
            activeChatId.value = chats.value[0]?.id ?? null
        } catch {
            error.value = 'Не удалось загрузить чаты'
        } finally {
            isLoading.value = false
        }
    }

    function setActiveChat(chatId: number | string) {
        activeChatId.value = chatId
    }

    function setFilter(value: ChatFilter) {
        filter.value = value
    }

    function setSearchQuery(value: string) {
        searchQuery.value = value
    }

    async function sendMessage(content: string) {
        const chat = activeChat.value
        const messageText = content.trim()

        if (!chat || !messageText) return

        try {
            const message = await chatMockService.sendMockMessage(chat.id, messageText)
            chat.messages.push(message)
            chat.lastMessage = messageText.replace(/```sql|```/g, '').trim().split('\n')[0] ?? messageText
            chat.lastMessageAt = message.timestamp
        } catch {
            error.value = 'Не удалось отправить сообщение'
        }
    }

    return {
        chats,
        activeChatId,
        filter,
        searchQuery,
        isLoading,
        error,
        activeChat,
        filteredChats,
        loadChats,
        setActiveChat,
        setFilter,
        setSearchQuery,
        sendMessage,
    }
})
