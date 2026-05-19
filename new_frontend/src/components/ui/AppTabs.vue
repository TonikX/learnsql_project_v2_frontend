<script setup lang="ts">
type Tab = { key: string; label: string; badge?: string | number }

const props = defineProps<{
    tabs: Tab[]
    modelValue: string
}>()

const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()
</script>

<template>
    <div class="flex flex-wrap gap-2">
        <button
        v-for="t in tabs"
        :key="t.key"
        class="rounded-full px-4 py-2 text-sm font-bold transition"
        :class="modelValue === t.key ? 'bg-primary-action text-white' : 'border border-app-border bg-card text-app-text hover:bg-panel'"
        @click="emit('update:modelValue', t.key)"
        >
        {{ t.label }}
        <span
            v-if="t.badge !== undefined"
            class="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs font-extrabold"
        >
            {{ t.badge }}
        </span>
        </button>
    </div>
</template>
