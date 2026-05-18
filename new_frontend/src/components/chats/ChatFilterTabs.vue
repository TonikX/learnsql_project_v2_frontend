<script setup lang="ts">
import type { ChatFilter } from '@/types/chatTypes'

defineProps<{
    modelValue: ChatFilter
}>()

const emit = defineEmits<{
    'update:modelValue': [value: ChatFilter]
}>()

const tabs: Array<{ value: ChatFilter; label: string }> = [
    { value: 'all', label: 'Все' },
    { value: 'unread', label: 'Непрочитанные' },
]
</script>

<template>
    <div class="grid grid-cols-2 rounded-[8px] border border-chat-border bg-chat-surface p-[5px]">
        <button
            v-for="tab in tabs"
            :key="tab.value"
            type="button"
            class="flex h-[32px] min-w-0 items-center justify-center rounded-[6px] px-2 text-center text-[12px] leading-none transition sm:text-[12px]"
            :class="modelValue === tab.value ? 'border border-chat-border bg-chat-filter-active-bg text-chat-filter-active-text' : 'text-chat-text hover:bg-chat-panel'"
            @click="emit('update:modelValue', tab.value)"
        >
            <span class="min-w-0 truncate">
                {{ tab.label }}
            </span>
        </button>
    </div>
</template>
