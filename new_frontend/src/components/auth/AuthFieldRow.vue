<script setup lang="ts">
defineProps<{
    label: string
    dbType: string
    registerType?: boolean
}>()
</script>

<template>
    <div class="grid border-b border-auth-border last:border-b-0 min-[768px]:grid-cols-[260px_minmax(0,1fr)]">
        <div class="flex min-h-[52px] min-w-0 items-center gap-2 border-auth-border px-4 py-3 min-[768px]:min-h-[60px] min-[768px]:gap-3 min-[768px]:border-r min-[768px]:px-6 min-[768px]:py-4">
            <span class="text-[15px] leading-none text-app-text min-[768px]:text-[17px]">{{ label }}</span>
            <span :class="['text-[13px] leading-none min-[768px]:text-[16px]', registerType ? 'text-auth-type-muted-register' : 'text-auth-type-muted']">
                {{ dbType }}
            </span>
        </div>
        <div class="flex min-h-[52px] min-w-0 items-center px-4 py-3 min-[768px]:min-h-[60px] min-[768px]:px-6">
            <slot />
        </div>
    </div>
</template>
