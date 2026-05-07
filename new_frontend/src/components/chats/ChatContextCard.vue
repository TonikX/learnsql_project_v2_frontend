<script setup lang="ts">
import type { ChatItem } from '@/types/chatTypes'

defineProps<{
    chat: ChatItem
}>()
</script>

<template>
    <section class="rounded-[8px] border border-chat-border bg-chat-surface p-5">
        <div class="grid gap-2 text-[14px] text-chat-text sm:grid-cols-[220px_minmax(0,1fr)] lg:flex lg:gap-12">
            <div>
                <h3 class="mb-2 text-[16px]">Контекст задачи</h3>
                <p>{{ chat.context.taskTitle ?? 'Обсуждение курса' }}</p>
                <p class="mt-1">Тема: {{ chat.context.topicTitle }}</p>
            </div>
            <div class="pt-0 sm:pt-8">
                <p>Курс: {{ chat.context.courseTitle }}</p>
                <p v-if="chat.context.taskId" class="mt-1">Статус: Решается</p>
            </div>
        </div>
    </section>
</template>
