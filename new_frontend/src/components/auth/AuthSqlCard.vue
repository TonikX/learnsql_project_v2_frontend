<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps<{
    title: string
    command: string
}>()
</script>

<template>
    <section class="overflow-hidden rounded-[10px] border border-auth-border bg-auth-surface-gradient text-app-text">
        <div class="flex min-h-[60px] items-center justify-between gap-4 bg-auth-header-gradient px-6 text-white sm:px-10">
            <div class="flex items-center gap-4">
                <span class="flex h-9 w-9 items-center justify-center rounded-full border border-white/80">
                    <AppIcon name="auth-card" :size="23" />
                </span>
                <h1 class="text-[24px] font-normal leading-tight sm:text-[30px]">{{ title }}</h1>
            </div>
            <span class="rounded-[8px] border border-auth-border bg-auth-input px-4 py-1 text-[14px] leading-none text-app-text">
                [ auth ]
            </span>
        </div>

        <div class="px-6 py-10 sm:px-10 sm:py-12">
            <p class="text-[20px] leading-none sm:text-[26px]">
                <span class="text-auth-prompt">&gt;_</span>
                <span class="ml-3">{{ command }}</span>
            </p>

            <p class="mt-8 text-[15px] leading-relaxed text-app-text sm:text-[18px]">
                Таблица:
                <span class="text-primary-action">public.users</span><span> • Schema: authentication</span>
            </p>

            <div class="mt-10">
                <slot />
            </div>
        </div>
    </section>
</template>
