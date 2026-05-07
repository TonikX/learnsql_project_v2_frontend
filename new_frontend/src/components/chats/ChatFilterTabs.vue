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
            class="h-[32px] rounded-[6px] text-[11px] transition sm:text-[12px]"
            :class="modelValue === tab.value ? 'border border-chat-border bg-chat-filter-active-bg text-chat-filter-active-text' : 'text-chat-text hover:bg-chat-panel'"
            @click="emit('update:modelValue', tab.value)"
        >
            {{ tab.label }}
        </button>
    </div>
</template>
