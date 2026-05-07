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
    back: []
    send: [content: string]
}>()
</script>

<template>
    <section class="rounded-[10px] border border-chat-border bg-chat-panel p-6">
        <button
            type="button"
            class="mb-4 inline-flex h-10 items-center rounded-[8px] border border-chat-border bg-chat-action-button px-4 text-[14px] text-chat-text transition hover:bg-chat-surface-active xl:hidden"
            @click="emit('back')"
        >
            ← К чатам
        </button>

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
