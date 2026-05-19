<script setup lang="ts">
import ChatFilterTabs from '@/components/chats/ChatFilterTabs.vue'
import ChatListItem from '@/components/chats/ChatListItem.vue'
import ChatSearch from '@/components/chats/ChatSearch.vue'
import type { ChatFilter, ChatItem } from '@/types/chatTypes'

defineProps<{
    chats: ChatItem[]
    activeChatId: number | string | null
    filter: ChatFilter
    searchQuery: string
}>()

const emit = defineEmits<{
    select: [chatId: number | string]
    setFilter: [filter: ChatFilter]
    setSearch: [query: string]
}>()
</script>

<template>
    <aside class="rounded-[10px] border border-chat-border bg-chat-panel p-6">
        <ChatSearch :model-value="searchQuery" @update:model-value="emit('setSearch', $event)" />
        <div class="mt-4">
            <ChatFilterTabs :model-value="filter" @update:model-value="emit('setFilter', $event)" />
        </div>

        <div class="mt-5 space-y-5">
            <ChatListItem
                v-for="chat in chats"
                :key="chat.id"
                :chat="chat"
                :active="activeChatId !== null && String(chat.id) === String(activeChatId)"
                @click="emit('select', chat.id)"
            />

            <p v-if="!chats.length" class="rounded-[8px] border border-chat-border bg-chat-surface p-4 text-[14px] text-chat-muted">
                Чатов пока нет
            </p>
        </div>
    </aside>
</template>
