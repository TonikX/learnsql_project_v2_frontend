<script setup lang="ts">
import { computed } from 'vue'
import type { ChatItem, ChatUser } from '@/types/chatTypes'
import { formatChatRole, getChatUserDisplayName, getChatUserInitials } from '@/utils/chatFormatters'

const props = defineProps<{
    chat: ChatItem
    canManageModerators?: boolean
}>()

const emit = defineEmits<{
    addModerator: []
    removeModerator: [user: ChatUser]
}>()

const courseRoute = computed(() => {
    return props.chat.context.courseId ? `/courses/${props.chat.context.courseId}/` : null
})

const participants = computed(() => props.chat.participants)

function canRemoveParticipant(user: ChatUser) {
    return props.canManageModerators === true && user.role === 'moderator'
}
</script>

<template>
    <section class="shrink-0 rounded-[8px] border border-chat-border bg-chat-surface p-2.5 sm:p-4 xl:p-5">
        <div class="grid gap-2 sm:gap-3 xl:gap-4 min-[1280px]:grid-cols-[minmax(0,1fr)_auto] min-[1280px]:items-center">
            <h2 class="min-w-0 break-words text-[16px] font-medium leading-snug text-chat-text sm:text-[17px] xl:text-[18px] min-[1280px]:col-start-1">
                {{ chat.title }}
            </h2>

            <div class="flex min-w-0 shrink-0 flex-wrap items-center justify-start gap-2 min-[1280px]:col-start-2 min-[1280px]:row-span-2 min-[1280px]:row-start-1 min-[1280px]:justify-end min-[1280px]:self-center">
                <RouterLink
                    v-if="courseRoute"
                    :to="courseRoute"
                    class="inline-flex h-8 min-w-[88px] items-center justify-center rounded-[7px] border border-chat-border bg-chat-action-button px-3 text-[12px] leading-none text-chat-text transition hover:bg-chat-surface-active sm:h-9 sm:min-w-[118px] sm:px-4 sm:text-[13px]"
                >
                    К курсу
                </RouterLink>

                <button
                    v-if="canManageModerators"
                    type="button"
                    class="inline-flex h-8 max-w-full items-center justify-center rounded-[7px] border border-chat-border bg-chat-action-button px-3 text-[12px] leading-none text-chat-text transition hover:bg-chat-surface-active sm:h-9 sm:px-4 sm:text-[13px]"
                    @click="emit('addModerator')"
                >
                    Добавить модератора
                </button>
            </div>

            <div class="min-w-0 min-[1280px]:col-start-1">
                <div v-if="participants.length" class="flex max-h-[74px] flex-wrap items-center gap-1.5 overflow-y-auto pr-1 sm:max-h-[88px] sm:gap-2 lg:max-h-[76px] xl:max-h-none xl:overflow-visible xl:pr-0">
                    <span
                        v-for="participant in participants"
                        :key="participant.id"
                        class="inline-flex min-w-0 max-w-full items-center gap-1.5 rounded-[7px] border border-chat-border bg-chat-panel px-2 py-1 text-[11px] text-chat-text min-[520px]:max-w-[240px] sm:max-w-[270px] sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[12px] min-[1280px]:max-w-[300px]"
                    >
                        <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-chat-avatar text-[9px] text-chat-on-accent sm:h-7 sm:w-7 sm:text-[10px]">
                            {{ getChatUserInitials(participant) }}
                        </span>
                        <span class="min-w-0 text-chat-text">
                            <span class="block truncate">{{ getChatUserDisplayName(participant) }}</span>
                            <span class="block truncate">{{ formatChatRole(participant.role) }}</span>
                        </span>
                        <button
                            v-if="canRemoveParticipant(participant)"
                            type="button"
                            class="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border border-chat-border text-[14px] leading-none text-chat-text transition hover:bg-chat-surface-active disabled:cursor-not-allowed disabled:opacity-60 sm:h-6 sm:w-6"
                            :aria-label="`Удалить ${getChatUserDisplayName(participant)} из модераторов`"
                            title="Удалить модератора"
                            @click.stop="emit('removeModerator', participant)"
                        >
                            ×
                        </button>
                    </span>
                </div>

                <p v-else class="text-[13px] text-chat-text">
                    Участники диалога пока не указаны.
                </p>
            </div>
        </div>
    </section>
</template>
