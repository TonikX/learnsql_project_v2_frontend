<script setup lang="ts">
const props = withDefaults(defineProps<{
    modelValue: string
    label?: string
    placeholder?: string
    type?: string
    error?: string
    hint?: string
    disabled?: boolean
    name?: string
    autocomplete?: string
}>(), {
    type: 'text',
    disabled: false,
})

const emit = defineEmits<{
    (e: 'update:modelValue', v: string): void
}>()
</script>

<template>
  <label class="block">
        <span v-if="label" class="mb-2 block text-sm font-semibold text-app-text">{{ label }}</span>

        <div class="relative">
        <input
            :name="name"
            :type="type"
            :placeholder="placeholder"
            :disabled="disabled"
            :autocomplete="autocomplete"
            class="h-11 w-full rounded-[10px] border border-app-border bg-card px-4 text-sm font-medium text-app-text placeholder:text-app-muted focus:border-primary-action focus:outline-none focus:ring-2 focus:ring-primary-action/30 disabled:opacity-60"
            :class="error ? 'border-danger focus:border-danger focus:ring-danger/30' : ''"
            :value="modelValue"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
        <slot name="rightIcon" />
        </div>

        <p v-if="error" class="mt-2 text-sm font-semibold text-danger">{{ error }}</p>
        <p v-else-if="hint" class="mt-2 text-sm font-medium text-app-muted">{{ hint }}</p>
    </label>
</template>
