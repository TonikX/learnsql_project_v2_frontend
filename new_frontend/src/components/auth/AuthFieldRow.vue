<script setup lang="ts">
defineProps<{
    label: string
    dbType: string
    registerType?: boolean
}>()
</script>

<template>
    <div class="grid border-b border-auth-border last:border-b-0 sm:grid-cols-[260px_minmax(0,1fr)]">
        <div class="flex min-h-[60px] items-center gap-3 border-auth-border px-6 py-4 sm:border-r">
            <span class="text-[17px] leading-none text-app-text">{{ label }}</span>
            <span :class="['text-[16px] leading-none', registerType ? 'text-auth-type-muted-register' : 'text-auth-type-muted']">
                {{ dbType }}
            </span>
        </div>
        <div class="flex min-h-[60px] items-center px-6 py-3">
            <slot />
        </div>
    </div>
</template>
