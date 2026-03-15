<script setup lang="ts">
const props = withDefaults(defineProps<{
    padding?: 'none' | 'sm' | 'md' | 'lg'
    hoverable?: boolean
    bordered?: boolean
}>(), {
    padding: 'md',
    hoverable: false,
    bordered: true,
})
</script>

<template>
    <div
        class="rounded-2xl bg-white"
        :class="[
        bordered ? 'ring-1 ring-slate-200' : '',
        hoverable ? 'transition hover:-translate-y-0.5 hover:shadow-card' : '',
        padding === 'none' ? '' : padding === 'sm' ? 'p-4' : padding === 'lg' ? 'p-8' : 'p-6'
        ]"
    >
        <slot />
    </div>
</template>