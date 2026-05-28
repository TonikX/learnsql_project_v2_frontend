<script setup lang="ts">
import { computed } from 'vue'
import type { ChatItem } from '@/types/chatTypes'
import { formatChatRole, getChatUserDisplayName, getChatUserInitials } from '@/utils/chatFormatters'

const props = defineProps<{
    chat: ChatItem
    canManageModerators?: boolean
}>()

const emit = defineEmits<{
    addModerator: []
}>()

const courseRoute = computed(() => {
    return props.chat.context.courseId ? `/courses/${props.chat.context.courseId}/` : null
})

const participants = computed(() => props.chat.participants)
</script>

<template>
    <section class="shrink-0 rounded-[8px] border border-chat-border bg-chat-surface p-4 sm:p-5">
        <div class="grid gap-3 sm:gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <h2 class="min-w-0 break-words text-[18px] font-medium leading-snug text-chat-text md:col-start-1">
                {{ chat.title }}
            </h2>

            <div class="flex shrink-0 flex-wrap items-center justify-start gap-2 md:col-start-2 md:row-span-2 md:row-start-1 md:justify-end md:self-center">
                <RouterLink
                    v-if="courseRoute"
                    :to="courseRoute"
                    class="inline-flex h-9 min-w-[104px] items-center justify-center rounded-[7px] border border-chat-border bg-chat-action-button px-3 text-[13px] leading-none text-chat-text transition hover:bg-chat-surface-active sm:min-w-[118px] sm:px-4"
                >
                    К курсу
                </RouterLink>

                <button
                    v-if="canManageModerators"
                    type="button"
                    class="inline-flex h-9 items-center justify-center rounded-[7px] border border-chat-border bg-chat-action-button px-3 text-[13px] leading-none text-chat-text transition hover:bg-chat-surface-active sm:px-4"
                    @click="emit('addModerator')"
                >
                    Добавить модератора
                </button>
            </div>

            <div class="min-w-0 md:col-start-1">
                <div v-if="participants.length" class="flex flex-wrap items-center gap-2">
                    <span
                        v-for="participant in participants"
                        :key="participant.id"
                        class="inline-flex min-w-0 max-w-full items-center gap-2 rounded-[7px] border border-chat-border bg-chat-panel px-2.5 py-1 text-[11px] text-chat-text sm:max-w-[260px] sm:px-3 sm:py-1.5 sm:text-[12px]"
                    >
                        <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-chat-avatar text-[10px] text-chat-on-accent sm:h-7 sm:w-7">
                            {{ getChatUserInitials(participant) }}
                        </span>
                        <span class="min-w-0 text-chat-text">
                            <span class="block truncate">{{ getChatUserDisplayName(participant) }}</span>
                            <span class="block truncate">{{ formatChatRole(participant.role) }}</span>
                        </span>
                    </span>
                </div>

                <p v-else class="text-[13px] text-chat-text">
                    Участники диалога пока не указаны.
                </p>
            </div>
        </div>
    </section>
</template>
