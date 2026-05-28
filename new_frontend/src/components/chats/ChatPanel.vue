<script setup lang="ts">
import ChatCourseHeader from '@/components/chats/ChatCourseHeader.vue'
import MessageComposer from '@/components/chats/MessageComposer.vue'
import MessageList from '@/components/chats/MessageList.vue'
import type { ChatItem } from '@/types/chatTypes'

// Tune this single class string if the chat workspace needs more or less vertical room.
const chatPanelHeightClass = 'h-[calc(100dvh-4.5rem)] min-h-[560px] sm:min-h-[640px] lg:h-[calc(100vh-7rem)] lg:min-h-[720px] xl:min-h-[780px] 2xl:min-h-[820px]'

defineProps<{
    chat: ChatItem | null
    isMessagesLoading?: boolean
    isSending?: boolean
    canManageModerators?: boolean
}>()

const emit = defineEmits<{
    back: []
    send: [content: string]
    retry: [messageId: number | string, content: string]
    addModerator: []
}>()
</script>

<template>
    <section
        :class="[
            chatPanelHeightClass,
            'flex flex-col overflow-hidden rounded-[10px] border border-chat-border bg-chat-panel p-2 sm:p-5',
        ]"
    >
        <button
            type="button"
            class="mb-3 inline-flex h-10 shrink-0 self-start items-center rounded-[8px] border border-chat-border bg-chat-action-button px-4 text-[14px] text-chat-text transition hover:bg-chat-surface-active sm:mb-4 lg:hidden"
            @click="emit('back')"
        >
            ← К чатам
        </button>

        <div v-if="chat" class="flex min-h-0 flex-1 flex-col gap-2 sm:gap-4">
            <ChatCourseHeader
                :can-manage-moderators="canManageModerators"
                :chat="chat"
                @add-moderator="emit('addModerator')"
            />
            <MessageList
                :chat-id="chat.id"
                :is-loading="isMessagesLoading"
                :messages="chat.messages"
                @retry="(messageId, content) => emit('retry', messageId, content)"
            />
            <MessageComposer :key="chat.id" :disabled="isSending" class="mt-auto shrink-0" @send="emit('send', $event)" />
        </div>

        <div v-else class="flex min-h-0 flex-1 items-center justify-center rounded-[10px] border border-chat-border bg-chat-surface px-4 text-center text-[16px] text-chat-text">
            Выберите чат
        </div>
    </section>
</template>
