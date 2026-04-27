<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import { useAuthStore } from '@/stores/authStore'
import { useProgressStore } from '@/stores/progressStore'
import { useCoursesStore } from '@/stores/courseStore'

const auth = useAuthStore()
const progress = useProgressStore()
const courses = useCoursesStore()
</script>

<template>
    <section class="bg-surface2">
        <div class="app-container py-16 lg:py-20">
        <div class="grid items-center gap-12 lg:grid-cols-2">
            <!-- Left -->
            <div>
            <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Интерактивная платформа<br class="hidden sm:block" /> для изучения SQL
            </h1>

            <p class="mt-6 text-lg font-semibold text-slate-600">
                Практикуйтесь на задачах, проходите курсы по уровням
                и закрепляйте навыки работы с базами данных.
            </p>

            <div class="mt-8 flex flex-wrap gap-3">
                <AppButton v-if="auth.isAuth" to="/courses">Продолжить обучение</AppButton>
                <AppButton v-else to="/register">Начать обучение</AppButton>
                <AppButton variant="ghost" to="/courses">Посмотреть курсы</AppButton>
            </div>

            <div class="mt-6 flex flex-wrap gap-2">
                <span class="rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-slate-700">Практика вместо теории</span>
                <span class="rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-slate-700">Уровни сложности</span>
                <span class="rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-slate-700">Курсы от преподавателей</span>
            </div>
            </div>

            <!-- Right: Mockup -->
            <AppCard padding="lg" class="ring-2 ring-primary-100">
            <div class="text-xs font-semibold text-slate-400">Preview / Mockup</div>

            <div class="mt-4 grid gap-4 md:grid-cols-[1fr_160px]">
                <!-- code -->
                <div class="rounded-2xl bg-[#0B1220] p-5 font-mono text-sm font-semibold text-white">
                <div>SELECT u.name, COUNT(*) AS orders</div>
                <div>FROM users u</div>
                <div>JOIN orders o ON o.user_id = u.id</div>
                <div>WHERE o.status = 'paid'</div>
                <div>GROUP BY u.name;</div>
                <div class="mt-3 text-xs font-semibold text-slate-300">✓ Проверка пройдена • 0 ошибок</div>
                </div>

                <!-- progress -->
                <div class="rounded-2xl bg-[#F8FAFF] p-4 ring-1 ring-slate-200">
                <div class="text-sm font-extrabold text-slate-900">Прогресс</div>

                <div class="mt-3">
                    <div class="h-3 w-full rounded-full bg-primary-50">
                    <div class="h-3 rounded-full bg-primary-500" :style="{ width: progress.selectProgress + '%' }"></div>
                    </div>
                    <div class="mt-2 text-sm font-bold text-slate-600">SELECT • {{ progress.selectProgress }}%</div>
                </div>

                <div class="mt-4">
                    <div class="h-3 w-full rounded-full bg-primary-50">
                    <div class="h-3 rounded-full bg-emerald-500" :style="{ width: progress.joinProgress + '%' }"></div>
                    </div>
                    <div class="mt-2 text-sm font-bold text-slate-600">JOIN • {{ progress.joinProgress }}%</div>
                </div>
                </div>
            </div>

            <!-- mini course cards -->
            <div class="mt-5 space-y-3">
                <div class="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                <div class="flex items-center justify-between gap-4">
                    <div>
                    <!-- <div class="text-sm font-extrabold text-slate-900">Курс: {{ courses.previewCourses[0].title }}</div>
                    <div class="mt-1 text-sm font-semibold text-slate-500">{{ courses.previewCourses[0].meta }}</div> -->
                    </div>
                    <AppButton size="sm" to="/courses">Открыть</AppButton>
                </div>
                </div>

                <div class="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                <div class="flex items-center justify-between gap-4">
                    <div>
                    <!-- <div class="text-sm font-extrabold text-slate-900">Курс: {{ courses.previewCourses[1].title }}</div>
                    <div class="mt-1 text-sm font-semibold text-slate-500">{{ courses.previewCourses[1].meta }}</div> -->
                    </div>
                    <AppButton size="sm" variant="ghost" to="/courses">Смотреть</AppButton>
                </div>
                </div>
            </div>
            </AppCard>
        </div>
        </div>
    </section>
</template>