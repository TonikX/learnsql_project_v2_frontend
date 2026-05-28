<script setup lang="ts">
import { computed } from 'vue'
import type { ChatMessage } from '@/types/chatTypes'
import { formatChatTime, getChatUserDisplayName } from '@/utils/chatFormatters'

const props = defineProps<{
    message: ChatMessage
}>()

const emit = defineEmits<{
    retry: [messageId: number | string, content: string]
}>()

type MessageSegment = {
    type: 'text' | 'code'
    value: string
}

const segments = computed<MessageSegment[]>(() => {
    const parts: MessageSegment[] = []
    const pattern = /```sql\n?([\s\S]*?)```/g
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = pattern.exec(props.message.content)) !== null) {
        const text = props.message.content.slice(lastIndex, match.index).trim()
        if (text) parts.push({ type: 'text', value: text })
        parts.push({ type: 'code', value: match[1]?.trim() ?? '' })
        lastIndex = pattern.lastIndex
    }

    const rest = props.message.content.slice(lastIndex).trim()
    if (rest) parts.push({ type: 'text', value: rest })

    return parts.length ? parts : [{ type: 'text', value: props.message.content }]
})
</script>

<template>
    <div class="w-full">
        <div
            class="w-fit min-w-[72px] max-w-[92%] overflow-hidden rounded-[8px] border border-chat-border p-2.5 text-[12px] leading-[1.45] text-chat-text [overflow-wrap:anywhere] sm:max-w-[86%] sm:p-4 sm:text-[14px] sm:leading-[1.55] lg:max-w-[760px]"
            :class="[
                message.isOwn ? 'ml-auto bg-chat-own-message' : 'mr-auto bg-chat-incoming-message',
                message.deliveryStatus === 'failed' ? 'border-chat-warning' : '',
            ]"
        >
            <p v-if="!message.isOwn" class="mb-1.5 text-[12px] font-normal text-chat-text sm:mb-2 sm:text-[13px]">
                {{ getChatUserDisplayName(message.author) }}
            </p>

            <template v-for="(segment, index) in segments" :key="index">
                <p
                    v-if="segment.type === 'text'"
                    class="whitespace-pre-wrap break-words [overflow-wrap:anywhere]"
                >
                    {{ segment.value }}
                </p>

                <pre
                    v-else
                    class="mt-2 max-w-full overflow-x-auto rounded-[6px] border border-chat-border bg-chat-code-bg p-2.5 text-[12px] leading-[1.35] text-chat-code-text sm:mt-3 sm:p-4 sm:text-[14px]"
                ><code>{{ segment.value }}</code></pre>
            </template>

            <p class="mt-1.5 text-[11px] font-extralight text-chat-text sm:mt-2 sm:text-[12px]">
                {{ formatChatTime(message.timestamp) }}
            </p>

            <div v-if="message.deliveryStatus === 'failed'" class="mt-3 flex flex-wrap items-center gap-3 text-[12px] text-chat-warning">
                <span>! Не отправлено</span>
                <button
                    type="button"
                    class="underline underline-offset-4 hover:text-chat-text"
                    @click="emit('retry', message.id, message.content)"
                >
                    Повторить
                </button>
            </div>
        </div>
    </div>
</template>
