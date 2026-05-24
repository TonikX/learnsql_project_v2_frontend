<script setup lang="ts">
import { computed } from 'vue'
import type { ChatItem } from '@/types/chatTypes'
import { getChatUserInitials } from '@/utils/chatFormatters'

const props = defineProps<{
    chat: ChatItem
}>()

const initials = computed(() => getChatUserInitials(props.chat.room.teacher))

const courseRoute = computed(() => {
    return props.chat.context.courseId ? `/courses/${props.chat.context.courseId}` : '/courses/all'
})

const taskRoute = computed(() => {
    if (!props.chat.context.courseId || !props.chat.context.taskId) return courseRoute.value
    return `/courses/${props.chat.context.courseId}/problem/${props.chat.context.taskId}`
})
</script>

<template>
    <section class="rounded-[8px] border border-chat-border bg-chat-surface p-5">
        <div class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div class="flex items-center gap-5">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-chat-avatar text-[14px] text-chat-on-accent">
                    {{ initials }}
                </div>
                <div>
                    <h2 class="text-[18px] font-semibold text-chat-text">
                        {{ chat.teacher.firstName }} {{ chat.teacher.lastName }}
                    </h2>
                    <p class="mt-2 text-[12px] text-chat-text">
                        {{ chat.teacher.position }}<template v-if="chat.context.courseTitle"> • {{ chat.context.courseTitle }}</template>
                    </p>
                </div>
            </div>

            <div class="flex gap-3">
                <RouterLink
                    v-if="chat.context.taskId"
                    :to="taskRoute"
                    class="inline-flex h-9 min-w-[118px] items-center justify-center rounded-[7px] border border-chat-border bg-chat-action-button px-4 text-[13px] text-chat-text transition hover:bg-chat-surface-active"
                >
                    К задаче
                </RouterLink>
                <RouterLink
                    :to="courseRoute"
                    class="inline-flex h-9 min-w-[118px] items-center justify-center rounded-[7px] border border-chat-border bg-chat-action-button px-4 text-[13px] text-chat-text transition hover:bg-chat-surface-active"
                >
                    К курсу
                </RouterLink>
            </div>
        </div>
    </section>
</template>
