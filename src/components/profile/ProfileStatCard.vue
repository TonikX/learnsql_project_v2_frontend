<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps<{
    icon: string
    label: string
    value: string
    iconBoxClass: string
    iconClass: string
}>()
</script>

<template>
    <article class="rounded-[10px] border border-app-border bg-profile-card-gradient p-4 text-app-text sm:p-6">
        <div class="flex items-center gap-3 sm:gap-4">
            <span :class="['flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] sm:h-11 sm:w-11 sm:rounded-[10px]', iconBoxClass]">
                <AppIcon :name="icon" :size="22" :class="iconClass" />
            </span>
            <p class="text-[13px] leading-tight text-app-text sm:text-[18px]">{{ label }}</p>
        </div>
        <p class="mt-4 text-[24px] leading-none text-app-text sm:mt-5 sm:text-[34px]">{{ value }}</p>
    </article>
</template>
