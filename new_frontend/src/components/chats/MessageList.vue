<script setup lang="ts">
import MessageBubble from '@/components/chats/MessageBubble.vue'
import type { ChatMessage } from '@/types/chatTypes'

defineProps<{
    messages: ChatMessage[]
}>()
</script>

<template>
    <section class="min-h-[420px] rounded-[10px] border border-chat-border bg-chat-surface p-6">
        <div class="space-y-3">
            <MessageBubble v-for="message in messages" :key="message.id" :message="message" />
        </div>

        <p v-if="!messages.length" class="text-[15px] text-chat-muted">
            В этом чате пока нет сообщений
        </p>
    </section>
</template>
