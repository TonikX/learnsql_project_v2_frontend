<script setup lang="ts">
import AppCard from './AppCard.vue'

const props = withDefaults(defineProps<{
    open: boolean
    title?: string
    closeOnBackdrop?: boolean
}>(), {
    closeOnBackdrop: true,
})

const emit = defineEmits(['close', ])
</script>

<template>
    <teleport to="body">
        <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
            class="absolute inset-0 bg-black/40"
            @click="closeOnBackdrop ? emit('close') : null"
        ></div>

        <div class="relative w-fit min-w-1/5 max-w-1/2">
            <AppCard padding="lg">
                <div class="flex items-start justify-between gap-4">
                    <div>
                    <h3 v-if="title" class="text-lg font-extrabold text-app-text">{{ title }}</h3>
                    </div>
                    <button class="text-3xl text-app-muted hover:text-app-text" @click="emit('close')">✕</button>
                </div>

                <div class="mt-4">
                    <slot />
                </div>
            </AppCard>
        </div>
        </div>
    </teleport>
</template>
