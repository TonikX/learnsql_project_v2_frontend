<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps<{
    title: string
    command: string
}>()
</script>

<template>
    <section class="overflow-hidden rounded-[10px] border border-auth-border bg-auth-surface-gradient text-app-text">
        <div class="flex min-h-[60px] flex-col gap-3 bg-auth-header-gradient px-4 py-4 text-white sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-10 sm:py-0">
            <div class="flex min-w-0 items-center gap-3 sm:gap-4">
                <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/80">
                    <AppIcon name="auth-card" :size="23" />
                </span>
                <h1 class="min-w-0 text-[20px] font-normal leading-tight sm:text-[30px]">{{ title }}</h1>
            </div>
            <span class="hidden w-fit whitespace-nowrap rounded-[8px] border border-auth-border bg-auth-input px-4 py-1 text-[14px] leading-none text-app-text sm:inline-flex sm:shrink-0">
                [ auth ]
            </span>
        </div>

        <div class="px-4 py-8 sm:px-10 sm:py-12">
            <p class="text-[16px] leading-snug sm:text-[26px] sm:leading-none">
                <span class="text-auth-prompt">&gt;_</span>
                <span class="ml-2 sm:ml-3">{{ command }}</span>
            </p>

            <p class="mt-6 flex flex-col gap-1 text-[13px] leading-relaxed text-app-text sm:mt-8 sm:block sm:text-[18px]">
                <span>
                    Таблица:
                    <span class="text-primary-action">public.users</span>
                </span>
                <span class="hidden sm:inline"> • </span>
                <span>Schema: authentication</span>
            </p>

            <div class="mt-8 sm:mt-10">
                <slot />
            </div>
        </div>
    </section>
</template>
