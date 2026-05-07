<script setup lang="ts">
import ChatContextCard from '@/components/chats/ChatContextCard.vue'
import ChatTeacherCard from '@/components/chats/ChatTeacherCard.vue'
import MessageComposer from '@/components/chats/MessageComposer.vue'
import MessageList from '@/components/chats/MessageList.vue'
import type { ChatItem } from '@/types/chatTypes'

defineProps<{
    chat: ChatItem | null
}>()

const emit = defineEmits<{
    send: [content: string]
}>()
</script>

<template>
    <section class="rounded-[10px] border border-chat-border bg-chat-panel p-6">
        <div v-if="chat" class="space-y-4">
            <ChatTeacherCard :chat="chat" />
            <ChatContextCard :chat="chat" />
            <MessageList :messages="chat.messages" />
            <MessageComposer :key="chat.id" @send="emit('send', $event)" />
        </div>

        <div v-else class="flex min-h-[420px] items-center justify-center rounded-[10px] border border-chat-border bg-chat-surface text-chat-muted">
            Выберите чат
        </div>
    </section>
</template>
