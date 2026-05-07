<script setup lang="ts">
import type { ChatItem } from '@/types/chatTypes'

defineProps<{
    chat: ChatItem
}>()

const initials = (chat: ChatItem) => {
    return `${chat.teacher.firstName[0] ?? ''}${chat.teacher.lastName[0] ?? ''}`.toUpperCase()
}
</script>

<template>
    <section class="rounded-[8px] border border-chat-border bg-chat-surface p-5">
        <div class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div class="flex items-center gap-5">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-chat-avatar text-[14px] text-chat-on-accent">
                    {{ initials(chat) }}
                </div>
                <div>
                    <h2 class="text-[18px] font-semibold text-chat-text">
                        {{ chat.teacher.firstName }} {{ chat.teacher.lastName }}
                    </h2>
                    <p class="mt-2 text-[12px] text-chat-text">
                        {{ chat.teacher.position }} • {{ chat.context.courseTitle }}
                    </p>
                    <p class="mt-2 flex items-center gap-2 text-[13px] text-chat-text">
                        <span class="h-2 w-2 rounded-full bg-chat-online"></span>
                        В сети
                    </p>
                </div>
            </div>

            <div class="flex gap-3">
                <RouterLink
                    to="/courses"
                    class="inline-flex h-9 min-w-[118px] items-center justify-center rounded-[7px] border border-chat-border bg-chat-action-button px-4 text-[13px] text-chat-text transition hover:bg-chat-surface-active"
                >
                    К задаче
                </RouterLink>
                <RouterLink
                    to="/courses"
                    class="inline-flex h-9 min-w-[118px] items-center justify-center rounded-[7px] border border-chat-border bg-chat-action-button px-4 text-[13px] text-chat-text transition hover:bg-chat-surface-active"
                >
                    К курсу
                </RouterLink>
            </div>
        </div>
    </section>
</template>
