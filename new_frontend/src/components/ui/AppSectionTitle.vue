<script setup lang="ts">
const props = withDefaults(defineProps<{
    title: string
    subtitle?: string
    align?: 'left' | 'center'
}>(), {
    align: 'left',
})
</script>

<template>
    <div :class="align === 'center' ? 'text-center' : 'text-left'">
        <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{{ title }}</h2>
        <p v-if="subtitle" class="mt-3 text-base font-semibold text-slate-600">{{ subtitle }}</p>
        <div class="mt-6">
        <slot />
        </div>
    </div>
</template>