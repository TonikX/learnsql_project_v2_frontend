<script setup lang="ts">
import type { ChatItem } from '@/types/chatTypes'

defineProps<{
    chat: ChatItem
    active?: boolean
}>()

const previewLabel = (chat: ChatItem) => {
    return chat.lastMessageAuthorName
        ? `${chat.lastMessageAuthorName}: ${chat.lastMessage}`
        : chat.lastMessage
}
</script>

<template>
    <button
        type="button"
        class="w-full rounded-[10px] border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chat-border-active"
        :class="active ? 'border-chat-border-active bg-chat-surface-active' : 'border-chat-border bg-chat-surface hover:border-chat-border-active hover:bg-chat-panel'"
    >
        <div class="min-w-0">
            <div class="flex items-start justify-between gap-3">
                <p class="min-w-0 truncate text-[16px] font-medium text-chat-text">
                    {{ chat.title }}
                </p>
                <div class="flex shrink-0 items-center gap-2 text-[12px] font-extralight text-chat-text">
                    <span>{{ chat.lastMessageAt }}</span>
                </div>
            </div>

            <div class="mt-4 flex items-end justify-between gap-3">
                <p class="min-w-0 truncate text-[14px] font-normal text-chat-text">
                    {{ previewLabel(chat) }}
                </p>
                <span
                    v-if="chat.unreadCount"
                    class="flex h-7 min-w-7 items-center justify-center rounded-full bg-chat-avatar px-2 text-[13px] text-chat-on-accent"
                >
                    {{ chat.unreadCount }}
                </span>
            </div>
        </div>
    </button>
</template>
