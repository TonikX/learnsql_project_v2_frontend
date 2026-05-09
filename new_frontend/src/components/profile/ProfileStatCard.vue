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
    <article class="rounded-[10px] border border-app-border bg-profile-card-gradient p-6 text-app-text">
        <div class="flex items-center gap-4">
            <span :class="['flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px]', iconBoxClass]">
                <AppIcon :name="icon" :size="24" :class="iconClass" />
            </span>
            <p class="text-[16px] leading-tight text-app-text sm:text-[18px]">{{ label }}</p>
        </div>
        <p class="mt-5 text-[30px] leading-none text-app-text sm:text-[34px]">{{ value }}</p>
    </article>
</template>
