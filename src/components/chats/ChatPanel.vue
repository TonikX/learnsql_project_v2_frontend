<script setup lang="ts">
import ChatCourseHeader from '@/components/chats/ChatCourseHeader.vue'
import MessageComposer from '@/components/chats/MessageComposer.vue'
import MessageList from '@/components/chats/MessageList.vue'
import type { ChatItem, ChatUser } from '@/types/chatTypes'

const chatPanelHeightClass = 'h-[calc(100dvh-3.75rem)] min-h-[460px] sm:h-[calc(100dvh-4.5rem)] sm:min-h-[520px] lg:h-[calc(100vh-5rem)] lg:min-h-[480px] lg:max-h-none xl:h-[calc(100vh-10rem)] xl:min-h-[560px] 2xl:min-h-[640px] 2xl:max-h-[900px]'

defineProps<{
    chat: ChatItem | null
    isMessagesLoading?: boolean
    isSending?: boolean
    canManageModerators?: boolean
    hasChats?: boolean
}>()

const emit = defineEmits<{
    back: []
    send: [content: string]
    retry: [messageId: number | string, content: string]
    addModerator: []
    removeModerator: [user: ChatUser]
}>()
</script>

<template>
    <section
        :class="[
            chatPanelHeightClass,
            'flex flex-col overflow-hidden rounded-[10px] border border-chat-border bg-chat-panel p-2 sm:p-3 xl:p-5',
        ]"
    >
        <button
            type="button"
            class="mb-2 inline-flex h-9 shrink-0 self-start items-center rounded-[8px] border border-chat-border bg-chat-action-button px-3 text-[13px] text-chat-text transition hover:bg-chat-surface-active sm:mb-3 sm:h-10 sm:px-4 sm:text-[14px] lg:hidden"
            @click="emit('back')"
        >
            ← К чатам
        </button>

        <div v-if="chat" class="flex min-h-0 flex-1 flex-col gap-2 sm:gap-3 xl:gap-4">
            <ChatCourseHeader
                :can-manage-moderators="canManageModerators"
                :chat="chat"
                @add-moderator="emit('addModerator')"
                @remove-moderator="emit('removeModerator', $event)"
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
            {{ hasChats ? 'Выберите чат' : 'Здесь появятся диалоги по курсам' }}
        </div>
    </section>
</template>
