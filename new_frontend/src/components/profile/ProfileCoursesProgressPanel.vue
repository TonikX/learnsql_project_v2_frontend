<script setup lang="ts">
import type { CourseProgressCard } from '@/types/profileCourseProgressTypes'

defineProps<{
    items: CourseProgressCard[]
    isLoading: boolean
    error: string | null
    hasPartialError?: boolean
}>()

function getProgressWidth(item: CourseProgressCard) {
    return `${Math.max(0, Math.min(100, item.completionPercent))}%`
}
</script>

<template>
    <section class="rounded-[10px] border border-app-border bg-profile-card-gradient p-5 text-app-text sm:p-7">
        <h2 class="text-[22px] leading-none sm:text-[28px]">
            <span class="text-profile-prompt">&gt;_</span>
            Курсы_и_прогресс
        </h2>

        <p v-if="isLoading" class="mt-6 text-[15px] text-app-text">
            Загружаем прогресс курсов...
        </p>

        <p v-else-if="error" class="mt-6 text-[15px] text-danger">
            {{ error }}
        </p>

        <div v-else class="mt-6 space-y-5">
            <p v-if="hasPartialError" class="text-[13px] text-danger sm:text-[14px]">
                Не удалось загрузить прогресс по части курсов.
            </p>

            <div v-if="items.length" class="space-y-5">
                <article
                    v-for="item in items"
                    :key="item.courseId"
                    class="border-t border-app-border bg-transparent py-4"
                >
                    <div class="flex items-start justify-between gap-4 text-[14px] sm:text-[16px]">
                        <h3 class="min-w-0 break-words text-app-text">
                            {{ item.title }}
                        </h3>
                        <span class="shrink-0 text-[var(--color-profile-course-percent)]">
                            {{ item.completionPercent }}%
                        </span>
                    </div>

                    <p class="mt-2 text-[13px] text-app-text sm:text-[14px]">
                        <template v-if="item.totalTasks > 0">
                            {{ item.completedTasks }} из {{ item.totalTasks }} задач
                        </template>
                        <template v-else>
                            В курсе пока нет доступных задач.
                        </template>
                    </p>

                    <div class="mt-3 h-3 overflow-hidden rounded-full bg-progress-track">
                        <div
                            class="h-full rounded-full bg-primary-action"
                            :style="{ width: getProgressWidth(item) }"
                        />
                    </div>
                </article>
            </div>

            <p v-else class="text-[15px] text-app-text">
                Начните проходить курс, чтобы увидеть прогресс
            </p>
        </div>
    </section>
</template>