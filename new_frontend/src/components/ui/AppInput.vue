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
        <span v-if="label" class="mb-2 block text-sm font-semibold text-slate-700">{{ label }}</span>

        <div class="relative">
        <input
            :name="name"
            :type="type"
            :placeholder="placeholder"
            :disabled="disabled"
            :autocomplete="autocomplete"
            class="h-11 w-full rounded-xl bg-white px-4 text-sm font-medium text-slate-900 ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
            :class="error ? 'ring-rose-200 focus:ring-rose-200' : ''"
            :value="modelValue"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
        <slot name="rightIcon" />
        </div>

        <p v-if="error" class="mt-2 text-sm font-semibold text-rose-600">{{ error }}</p>
        <p v-else-if="hint" class="mt-2 text-sm font-medium text-slate-500">{{ hint }}</p>
    </label>
</template>