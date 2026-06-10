<script setup lang="ts">
withDefaults(defineProps<{
    modelValue: string
    type?: string
    placeholder?: string
    autocomplete?: string
    disabled?: boolean
    readonly?: boolean
}>(), {
    type: 'text',
    placeholder: '',
    autocomplete: undefined,
    disabled: false,
    readonly: false,
})

defineEmits<{
    (event: 'update:modelValue', value: string): void
}>()
</script>

<template>
    <input
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :readonly="readonly"
        class="h-10 min-w-0 w-full rounded-[11px] border border-auth-border bg-auth-input px-4 text-[15px] text-app-text outline-none transition placeholder:text-app-muted focus:border-primary-action disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:text-[17px]"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
</template>
