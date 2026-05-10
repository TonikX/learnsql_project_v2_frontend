<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import ChatPanel from '@/components/chats/ChatPanel.vue'
import ChatSidebar from '@/components/chats/ChatSidebar.vue'
import { useChatStore } from '@/stores/chatStore'

const route = useRoute()
const router = useRouter()
const chatStore = useChatStore()
const {
    activeChat,
    activeChatId,
    error,
    filter,
    filteredChats,
    isMessagesLoading,
    isLoading,
    searchQuery,
} = storeToRefs(chatStore)

const isMobileChatOpen = ref(false)
const isSyncingRoomFromQuery = ref(false)

const routeRoomId = computed(() => {
    const value = route.query.room
    return typeof value === 'string' && value ? value : null
})

function hasRoom(roomId: string) {
    return chatStore.rooms.some((room) => String(room.id) === roomId)
}

async function syncRoomFromQuery() {
    if (isSyncingRoomFromQuery.value) return

    const roomId = routeRoomId.value

    if (roomId === null) {
        chatStore.clearActiveRoom()
        isMobileChatOpen.value = false
        return
    }

    if (!hasRoom(roomId)) {
        chatStore.clearActiveRoom()
        isMobileChatOpen.value = false
        return
    }

    if (activeChatId.value !== null && String(activeChatId.value) === roomId) {
        isMobileChatOpen.value = true
        return
    }

    isSyncingRoomFromQuery.value = true
    try {
        await chatStore.selectRoom(roomId)
        isMobileChatOpen.value = true
    } finally {
        isSyncingRoomFromQuery.value = false
    }
}

async function setRoomQuery(roomId: number | string | null) {
    const nextQuery = { ...route.query }

    if (roomId === null) {
        delete nextQuery.room
    } else {
        nextQuery.room = String(roomId)
    }

    await router.replace({ query: nextQuery })
}

async function handleSelectChat(chatId: number | string) {
    await setRoomQuery(chatId)
}

async function handleBackToList() {
    isMobileChatOpen.value = false
    await setRoomQuery(null)
}

onMounted(async () => {
    if (!chatStore.rooms.length) {
        await chatStore.loadRooms()
    }

    await syncRoomFromQuery()
})

watch(routeRoomId, async () => {
    if (isLoading.value) return
    await syncRoomFromQuery()
})

watch(() => chatStore.rooms, async () => {
    await syncRoomFromQuery()
})

onBeforeUnmount(() => {
    chatStore.disconnectSocket()
})
</script>

<template>
    <div class="min-h-full bg-chat-page py-10 font-mono text-chat-text">
        <div class="mx-auto w-full max-w-[1780px] px-4 sm:px-8">
            <header class="mb-8">
                <h1 class="text-[28px] font-semibold leading-tight md:text-[32px]">
                    Чаты преподавателей
                </h1>
                <p class="mt-3 text-[15px] text-chat-text">
                    Активные обсуждения по курсам и задачам
                </p>
            </header>

            <p v-if="error" class="mb-4 rounded-[8px] border border-chat-border bg-chat-surface p-4 text-chat-warning">
                {{ error }}
            </p>

            <p v-if="isLoading" class="rounded-[8px] border border-chat-border bg-chat-surface p-4 text-chat-muted">
                Загрузка чатов...
            </p>

            <div v-else class="grid gap-8 xl:grid-cols-[520px_minmax(0,1fr)]">
                <ChatSidebar
                    :class="isMobileChatOpen ? 'hidden xl:block' : 'block'"
                    :active-chat-id="activeChatId"
                    :chats="filteredChats"
                    :filter="filter"
                    :search-query="searchQuery"
                    @select="handleSelectChat"
                    @set-filter="chatStore.setFilter"
                    @set-search="chatStore.setSearchQuery"
                />
                <ChatPanel
                    :class="isMobileChatOpen ? 'block' : 'hidden xl:block'"
                    :chat="activeChat"
                    :is-messages-loading="isMessagesLoading"
                    @back="handleBackToList"
                    @send="chatStore.sendMessage"
                />
            </div>
        </div>
    </div>
</template>
