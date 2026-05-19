<script setup lang="ts">
import type { ChatItem } from '@/types/chatTypes'

defineProps<{
    chat: ChatItem
}>()
</script>

<template>
    <section class="rounded-[8px] border border-chat-border bg-chat-surface p-5">
        <div class="text-[14px] text-chat-text">
            <h3 class="mb-2 text-[16px]">Контекст задачи</h3>
            <div class="space-y-1">
                <p>{{ chat.context.taskTitle ?? 'Обсуждение курса' }}</p>
                <p v-if="chat.context.topicTitle">
                    Тема: {{ chat.context.topicTitle }}
                </p>
                <p v-if="chat.context.courseTitle">
                    Курс: {{ chat.context.courseTitle }}
                </p>
            </div>
        </div>
    </section>
</template>
