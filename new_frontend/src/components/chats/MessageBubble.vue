<script setup lang="ts">
import { computed } from 'vue'
import type { ChatMessage } from '@/types/chatTypes'

const props = defineProps<{
    message: ChatMessage
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
            class="w-fit min-w-[72px] max-w-[86%] overflow-hidden rounded-[8px] border border-chat-border p-4 text-[14px] leading-[1.55] text-chat-text [overflow-wrap:anywhere] sm:max-w-[620px]"
            :class="message.isOwn ? 'ml-auto bg-chat-own-message' : 'mr-auto bg-chat-incoming-message'"
        >
            <template v-for="(segment, index) in segments" :key="index">
                <p
                    v-if="segment.type === 'text'"
                    class="whitespace-pre-wrap break-words [overflow-wrap:anywhere]"
                >
                    {{ segment.value }}
                </p>

                <pre
                    v-else
                    class="mt-3 max-w-full overflow-x-auto rounded-[6px] border border-chat-border bg-chat-code-bg p-4 text-[14px] leading-[1.35] text-chat-code-text"
                ><code>{{ segment.value }}</code></pre>
            </template>

            <p class="mt-2 text-[12px] font-extralight text-chat-text">
                {{ message.timestamp }}
            </p>
        </div>
    </div>
</template>
