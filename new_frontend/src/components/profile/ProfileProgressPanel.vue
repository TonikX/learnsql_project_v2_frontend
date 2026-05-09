<script setup lang="ts">
import type { ThemeStatisticsItem } from '@/types/profileStatisticsTypes'
import { formatPercent } from '@/utils/profileFormatters'

defineProps<{
    items: ThemeStatisticsItem[]
}>()

function getProgressValue(item: ThemeStatisticsItem) {
    return item.mastery_level ?? item.success_rate ?? 0
}
</script>

<template>
    <section class="rounded-[10px] border border-app-border bg-profile-card-gradient p-5 text-app-text sm:p-7">
        <div class="flex items-center justify-between gap-4">
            <h2 class="text-[22px] leading-none sm:text-[28px]">
                <span class="text-profile-prompt">&gt;_</span>
                Темы_и_навыки
            </h2>
        </div>

        <div v-if="items.length" class="mt-6 space-y-5">
            <div v-for="item in items" :key="item.theme_id" class="rounded-[10px] border border-app-border bg-profile-details-surface p-4">
                <div class="flex items-center justify-between gap-4 text-[14px] sm:text-[16px]">
                    <span class="min-w-0 break-words text-app-text">{{ item.theme_title }}</span>
                    <span class="shrink-0 text-primary-action">{{ formatPercent(getProgressValue(item)) }}</span>
                </div>
                <div class="mt-3 h-3 overflow-hidden rounded-full bg-progress-track">
                    <div
                        class="h-full rounded-full bg-primary-action"
                        :style="{ width: `${Math.max(0, Math.min(100, Math.round(getProgressValue(item) * 100)))}%` }"
                    />
                </div>
            </div>
        </div>

        <p v-else class="mt-6 text-[15px] text-app-text">
            Решайте задачи, чтобы увидеть прогресс
        </p>
    </section>
</template>
