<script setup lang="ts">
defineProps<{
    label: string
    dbType: string
}>()
</script>

<template>
    <div class="grid border-b border-auth-border last:border-b-0 md:grid-cols-[254px_minmax(0,1fr)]">
        <div class="flex min-h-[72px] min-w-0 items-center gap-3 border-auth-border px-5 py-4 md:border-r md:px-6">
            <span class="text-[15px] leading-none text-app-text md:text-[17px]">{{ label }}</span>
            <span class="text-[13px] leading-none text-auth-type-muted md:text-[16px]">{{ dbType }}</span>
        </div>
        <div class="flex min-h-[72px] min-w-0 items-center px-5 py-3 md:px-6">
            <slot />
        </div>
    </div>
</template>
