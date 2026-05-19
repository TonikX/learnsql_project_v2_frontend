<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps<{
    modelValue: string
}>()

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()
</script>

<template>
    <label class="flex h-[46px] items-center gap-3 rounded-[8px] border border-chat-border bg-chat-surface px-4">
        <AppIcon name="search" :size="20" class="text-chat-placeholder" />

        <input
            :value="modelValue"
            type="search"
            class="chat-placeholder min-w-0 flex-1 bg-transparent text-[14px] font-extralight text-chat-text outline-none"
            placeholder="Поиск по чатам..."
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
    </label>
</template>
