<script setup lang="ts">
import { computed } from 'vue'
import type { ThemeStatisticsItem, ThemesStatistics } from '@/types/profileStatisticsTypes'
import {
    formatAttemptsCount,
    formatAverageAttempts,
    formatNumber,
    formatPercent,
    formatStartedTasksText,
} from '@/utils/profileFormatters'

const props = defineProps<{
    themes?: ThemesStatistics | null
}>()

const items = computed(() => props.themes?.items ?? [])
const summary = computed(() => props.themes?.summary ?? null)
const themesStarted = computed(() => summary.value?.themes_started ?? items.value.length)
const strongestTheme = computed(() => summary.value?.strongest_theme ?? null)
const weakestTheme = computed(() => summary.value?.weakest_theme ?? null)

function getThemeKey(theme: ThemeStatisticsItem | null) {
    if (!theme) return null
    if (theme.theme_id !== null && theme.theme_id !== undefined && String(theme.theme_id) !== '') {
        return `id:${String(theme.theme_id)}`
    }

    const title = theme.theme_title?.trim()
    return title ? `title:${title}` : null
}

const shouldShowStrongWeak = computed(() => {
    if (themesStarted.value <= 1 || !strongestTheme.value || !weakestTheme.value) return false

    const strongestKey = getThemeKey(strongestTheme.value)
    const weakestKey = getThemeKey(weakestTheme.value)

    return strongestKey !== null && weakestKey !== null && strongestKey !== weakestKey
})
</script>

<template>
    <section class="rounded-[10px] border border-app-border bg-profile-card-gradient p-5 text-app-text sm:p-7">
        <h2 class="text-[22px] leading-none sm:text-[28px]">
            <span class="text-profile-prompt">&gt;_</span>
            Темы_и_результаты
        </h2>

        <p v-if="!items.length || themesStarted === 0" class="mt-6 text-[15px] text-app-text">
            Решайте задачи, чтобы увидеть результаты по темам.
        </p>

        <div v-else class="mt-6 space-y-5">
            <div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-app-text sm:text-[15px]">
                <span>Тем начато: {{ formatNumber(themesStarted) }}</span>
                <span v-if="shouldShowStrongWeak && summary?.strongest_theme">
                    Сильная тема: {{ summary.strongest_theme.theme_title }}
                </span>
                <span v-if="shouldShowStrongWeak && summary?.weakest_theme">
                    Требует внимания: {{ summary.weakest_theme.theme_title }}
                </span>
            </div>

            <div class="space-y-5">
                <article
                    v-for="item in items"
                    :key="item.theme_id"
                    class="border-t border-app-border bg-transparent py-4"
                >
                    <div class="flex items-start justify-between gap-4 text-[14px] sm:text-[16px]">
                        <h3 class="min-w-0 break-words text-app-text">
                            {{ item.theme_title }}
                        </h3>
                        <span class="shrink-0 text-app-text">
                            Успех {{ formatPercent(item.success_rate) }}
                        </span>
                    </div>

                    <p class="mt-2 text-[13px] text-app-text sm:text-[14px]">
                        {{ formatStartedTasksText(item.tasks_solved, item.tasks_started) }}
                    </p>

                    <p class="mt-1 text-[13px] text-app-text sm:text-[14px]">
                        {{ formatAttemptsCount(item.attempts) }} · {{ formatAverageAttempts(item.average_attempts_per_task) }} попытки на задачу
                    </p>
                </article>
            </div>
        </div>
    </section>
</template>
