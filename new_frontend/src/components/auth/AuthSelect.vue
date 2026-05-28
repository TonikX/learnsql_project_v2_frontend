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
    <span class="relative block w-full">
        <select
            :value="modelValue ?? ''"
            :disabled="disabled"
            class="h-10 min-w-0 w-full appearance-none rounded-[11px] border border-auth-border bg-auth-input py-0 pl-4 pr-12 text-[15px] text-app-text outline-none transition focus:border-primary-action disabled:cursor-not-allowed disabled:opacity-60 sm:pl-5 sm:text-[17px]"
            @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        >
            <option class="bg-auth-input text-app-text" value="">{{ placeholder ?? 'Не выбрано' }}</option>
            <slot />
        </select>
        <span class="pointer-events-none absolute right-4 top-1/2 flex -translate-y-1/2 text-app-text" :class="{ 'opacity-60': disabled }">
            <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M5.25 7.5 10 12.25 14.75 7.5h-9.5Z" />
            </svg>
        </span>
    </span>
</template>
