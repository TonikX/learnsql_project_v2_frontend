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
        class="h-10 w-full rounded-[11px] border border-auth-border bg-auth-input px-5 text-[17px] text-app-text outline-none transition focus:border-primary-action disabled:cursor-not-allowed disabled:opacity-60"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
        <option value="">{{ placeholder ?? 'Не выбрано' }}</option>
        <slot />
    </select>
</template>
