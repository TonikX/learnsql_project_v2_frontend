<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import MessageBubble from '@/components/chats/MessageBubble.vue'
import type { ChatMessage } from '@/types/chatTypes'

const props = defineProps<{
    chatId?: number | string
    messages: ChatMessage[]
    isLoading?: boolean
}>()

const emit = defineEmits<{
    retry: [messageId: number | string, content: string]
}>()

const scrollContainer = ref<HTMLElement | null>(null)

function isNearBottom(container: HTMLElement) {
    const distance = container.scrollHeight - container.scrollTop - container.clientHeight
    return distance < 96
}

onMounted(() => {
    void scrollToBottomAfterRender()
})

function waitForFrame() {
    return new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => resolve())
    })
}

async function getRenderedScrollContainer() {
    await nextTick()
    await nextTick()
    await waitForFrame()
    return scrollContainer.value
}

function scrollContainerToBottom(container: HTMLElement, behavior: ScrollBehavior) {
    const maxScrollTop = Math.max(container.scrollHeight - container.clientHeight, 0)

    container.scrollTo({
        top: maxScrollTop,
        behavior,
    })
    container.scrollTop = maxScrollTop
}

async function keepScrollAtBottom(container: HTMLElement, frames = 10) {
    for (let frame = 0; frame < frames; frame += 1) {
        scrollContainerToBottom(container, 'auto')
        await waitForFrame()
    }
    scrollContainerToBottom(container, 'auto')
}

async function scrollToBottomAfterRender(behavior: ScrollBehavior = 'auto', settleFrames = 10) {
    const container = await getRenderedScrollContainer()
    if (!container) return

    scrollContainerToBottom(container, behavior)
    await keepScrollAtBottom(container, settleFrames)
}

watch(
    () => props.messages.length,
    async (_nextLength, previousLength) => {
        const container = scrollContainer.value
        const lastMessage = props.messages[props.messages.length - 1]
        const shouldScroll = !container || previousLength === 0 || lastMessage?.isOwn || isNearBottom(container)
        if (shouldScroll) {
            const isInitialMessagesRender = previousLength === 0
            await scrollToBottomAfterRender(isInitialMessagesRender ? 'auto' : 'smooth', isInitialMessagesRender ? 12 : 4)
        }
    },
    { flush: 'post' },
)

watch(
    () => props.isLoading,
    async (isLoading) => {
        if (!isLoading) {
            await scrollToBottomAfterRender('auto', 12)
        }
    },
    { flush: 'post' },
)

watch(
    () => props.chatId,
    async () => {
        await scrollToBottomAfterRender('auto', 12)
    },
    { flush: 'post' },
)
</script>

<template>
    <section class="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[10px] border border-chat-border bg-chat-surface">
        <div v-if="isLoading" class="flex min-h-0 flex-1 items-center justify-center p-3 text-[15px] text-chat-text sm:p-5">
            <AppLoader text="Загружаем сообщения" mode="inline" text-class="text-chat-text" />
        </div>

        <div v-else-if="!messages.length" class="flex min-h-0 flex-1 items-center justify-center px-4 text-center text-[15px] text-chat-text">
            Сообщений пока нет
        </div>

        <div
            v-else
            ref="scrollContainer"
            class="min-h-0 flex-1 overflow-y-auto px-2 pb-3 pt-2 sm:px-5 sm:pb-4 sm:pt-5"
        >
            <div class="flex min-h-full flex-col gap-2 sm:gap-3">
                <div class="mt-auto" aria-hidden="true"></div>

                <MessageBubble
                    v-for="message in messages"
                    :key="message.id"
                    :message="message"
                    @retry="(messageId, content) => emit('retry', messageId, content)"
                />

                <div class="h-3 shrink-0 sm:h-4" aria-hidden="true"></div>
            </div>
        </div>
    </section>
</template>
