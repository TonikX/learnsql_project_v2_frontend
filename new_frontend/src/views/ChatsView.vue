<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import ChatPanel from '@/components/chats/ChatPanel.vue'
import ChatSidebar from '@/components/chats/ChatSidebar.vue'
import { useChatStore } from '@/stores/chatStore'

const chatStore = useChatStore()
const {
    activeChat,
    activeChatId,
    error,
    filter,
    filteredChats,
    isLoading,
    searchQuery,
} = storeToRefs(chatStore)

onMounted(() => {
    if (!chatStore.chats.length) {
        chatStore.loadChats()
    }
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
                    :active-chat-id="activeChatId"
                    :chats="filteredChats"
                    :filter="filter"
                    :search-query="searchQuery"
                    @select="chatStore.setActiveChat"
                    @set-filter="chatStore.setFilter"
                    @set-search="chatStore.setSearchQuery"
                />
                <ChatPanel :chat="activeChat" @send="chatStore.sendMessage" />
            </div>
        </div>
    </div>
</template>
