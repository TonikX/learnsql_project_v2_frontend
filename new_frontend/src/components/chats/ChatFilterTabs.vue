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
    { value: 'tasks', label: 'Задачи' },
    { value: 'courses', label: 'Курсы' },
]
</script>

<template>
    <div class="grid grid-cols-4 rounded-[8px] border border-chat-border bg-chat-surface p-[5px]">
        <button
            v-for="tab in tabs"
            :key="tab.value"
            type="button"
            class="flex h-[32px] min-w-0 items-center justify-center rounded-[6px] px-0.5 text-center text-[9px] leading-none transition min-[390px]:text-[10px] sm:px-2 sm:text-[12px]"
            :class="modelValue === tab.value ? 'border border-chat-border bg-chat-filter-active-bg text-chat-filter-active-text' : 'text-chat-text hover:bg-chat-panel'"
            @click="emit('update:modelValue', tab.value)"
        >
            <span class="min-w-0 truncate">
                {{ tab.label }}
            </span>
        </button>
    </div>
</template>
