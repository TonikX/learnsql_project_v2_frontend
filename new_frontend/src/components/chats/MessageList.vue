<script setup lang="ts">
import MessageBubble from '@/components/chats/MessageBubble.vue'
import type { ChatMessage } from '@/types/chatTypes'

defineProps<{
    messages: ChatMessage[]
    isLoading?: boolean
}>()
</script>

<template>
    <section class="min-h-[420px] rounded-[10px] border border-chat-border bg-chat-surface p-4 sm:p-6">
        <p v-if="isLoading" class="text-[15px] text-chat-muted">
            Загружаем сообщения...
        </p>

        <div v-else class="space-y-3">
            <MessageBubble v-for="message in messages" :key="message.id" :message="message" />
        </div>

        <p v-if="!isLoading && !messages.length" class="text-[15px] text-chat-muted">
            Сообщений пока нет
        </p>
    </section>
</template>
