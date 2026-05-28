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
    courseFilter?: string
    courseOptions?: Array<{ value: string; label: string }>
    showCourseFilter?: boolean
    isReady?: boolean
}>()

const emit = defineEmits<{
    select: [chatId: number | string]
    setFilter: [filter: ChatFilter]
    setSearch: [query: string]
    setCourseFilter: [value: string]
}>()
</script>

<template>
    <aside class="rounded-[10px] border border-chat-border bg-chat-panel p-6">
        <ChatSearch :model-value="searchQuery" @update:model-value="emit('setSearch', $event)" />
        <div class="mt-4">
            <ChatFilterTabs :model-value="filter" @update:model-value="emit('setFilter', $event)" />
        </div>
        <label
            v-if="showCourseFilter && courseOptions?.length"
            class="mt-4 block rounded-[8px] border border-chat-border bg-chat-surface px-4 py-3 text-[12px] text-chat-text"
        >
            <span class="mb-2 block text-chat-text">Курс</span>
            <span class="relative block">
                <select
                    :value="courseFilter ?? 'all'"
                    class="w-full appearance-none rounded-[6px] border border-chat-border bg-chat-panel py-2 pl-3 pr-12 text-[14px] text-chat-text outline-none focus:border-chat-border focus:ring-0"
                    @change="emit('setCourseFilter', ($event.target as HTMLSelectElement).value)"
                >
                <option class="bg-chat-panel text-chat-text" value="all">Все курсы</option>
                <option
                    v-for="option in courseOptions"
                    :key="option.value"
                    class="bg-chat-panel text-chat-text"
                    :value="option.value"
                >
                    {{ option.label }}
                </option>
                </select>
                <span class="pointer-events-none absolute right-4 top-1/2 flex -translate-y-1/2 text-chat-text">
                    <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M5.25 7.5 10 12.25 14.75 7.5h-9.5Z" />
                    </svg>
                </span>
            </span>
        </label>

        <div class="mt-5 space-y-5">
            <ChatListItem
                v-for="chat in chats"
                :key="chat.id"
                :chat="chat"
                :active="activeChatId !== null && String(chat.id) === String(activeChatId)"
                @click="emit('select', chat.id)"
            />

            <p v-if="isReady && !chats.length" class="rounded-[8px] border border-chat-border bg-chat-surface p-4 text-[14px] text-chat-text">
                Чатов пока нет
            </p>
        </div>
    </aside>
</template>
