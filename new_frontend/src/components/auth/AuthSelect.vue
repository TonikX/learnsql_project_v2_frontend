<script setup lang="ts">
defineProps<{
    modelValue: string | number | null
    placeholder?: string
    disabled?: boolean
}>()

defineEmits<{
    (event: 'update:modelValue', value: string): void
}>()
</script>

<template>
    <select
        :value="modelValue ?? ''"
        :disabled="disabled"
        class="h-10 min-w-0 w-full rounded-[11px] border border-auth-border bg-auth-input px-4 text-[15px] text-app-text outline-none transition focus:border-primary-action disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:text-[17px]"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
        <option value="">{{ placeholder ?? 'Не выбрано' }}</option>
        <slot />
    </select>
</template>
