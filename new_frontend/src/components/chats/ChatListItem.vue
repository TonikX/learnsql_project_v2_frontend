<script setup lang="ts">
import type { ChatItem } from '@/types/chatTypes'
import { getChatUserInitials } from '@/utils/chatFormatters'

defineProps<{
    chat: ChatItem
    active?: boolean
}>()

const initials = (chat: ChatItem) => getChatUserInitials(chat.room.teacher)
</script>

<template>
    <button
        type="button"
        class="w-full rounded-[8px] border p-4 text-left transition"
        :class="active ? 'border-chat-border-active bg-chat-surface-active' : 'border-chat-border bg-chat-surface hover:border-chat-border-active'"
    >
        <div class="flex items-start gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-chat-avatar text-[13px] text-chat-on-accent">
                {{ initials(chat) }}
            </div>

            <div class="min-w-0 flex-1">
                <div class="flex items-start justify-between gap-3">
                    <div class="min-w-0">
                        <p class="truncate text-[16px] font-semibold text-chat-text">
                            {{ chat.teacher.firstName }} {{ chat.teacher.lastName }}
                        </p>
                        <p class="mt-1 truncate text-[12px] text-chat-text">
                            {{ chat.title }}
                        </p>
                    </div>
                    <div class="flex shrink-0 items-center gap-2 text-[12px] font-extralight text-chat-text">
                        <span>{{ chat.lastMessageAt }}</span>
                    </div>
                </div>

                <div class="mt-5 flex items-end justify-between gap-3">
                    <p class="min-w-0 truncate text-[14px] text-chat-text">
                        {{ chat.lastMessage }}
                    </p>
                    <span
                        v-if="chat.unreadCount"
                        class="flex h-7 min-w-7 items-center justify-center rounded-full bg-chat-avatar px-2 text-[13px] text-chat-on-accent"
                    >
                        {{ chat.unreadCount }}
                    </span>
                </div>
            </div>
        </div>
    </button>
</template>
