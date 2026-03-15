<script setup lang="ts">
import AppCard from './AppCard.vue'

const props = withDefaults(defineProps<{
    open: boolean
    title?: string
    closeOnBackdrop?: boolean
}>(), {
    closeOnBackdrop: true,
})

const emit = defineEmits<{ (e: 'close'): void }>()
</script>

<template>
    <teleport to="body">
        <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
            class="absolute inset-0 bg-black/40"
            @click="closeOnBackdrop ? emit('close') : null"
        ></div>

        <div class="relative w-full max-w-lg">
            <AppCard padding="lg">
            <div class="flex items-start justify-between gap-4">
                <div>
                <h3 v-if="title" class="text-lg font-extrabold text-slate-900">{{ title }}</h3>
                </div>
                <button class="text-slate-500 hover:text-slate-900" @click="emit('close')">✕</button>
            </div>

            <div class="mt-4">
                <slot />
            </div>

            <div class="mt-6">
                <slot name="footer" />
            </div>
            </AppCard>
        </div>
        </div>
    </teleport>
</template>