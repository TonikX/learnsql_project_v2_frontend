<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { NotFoundError } from '@/errors/network'
import AppLoader from '@/components/ui/AppLoader.vue'
import leaderboardService from '@/services/leaderboardService'
import { useThemeStore } from '@/stores/themeStore'
import type { LeaderboardEntry, LeaderboardScope } from '@/types/leaderboardTypes'
import type { CourseProgressCard } from '@/types/profileCourseProgressTypes'

type LeaderboardFilter = {
    scope: LeaderboardScope
    label: string
    courseId?: number | string
}

const props = defineProps<{
    courses?: CourseProgressCard[]
}>()

const isLoading = ref(false)
const error = ref<string | null>(null)
const activeScope = ref<LeaderboardScope>('all')
const activeCourseId = ref<number | string | null>(null)
const leaders = ref<LeaderboardEntry[]>([])
const currentUser = ref<LeaderboardEntry | null>(null)
const themeStore = useThemeStore()
const { resolvedTheme } = storeToRefs(themeStore)

const commonLeaderboardFilters: LeaderboardFilter[] = [
    { scope: 'all', label: 'Все пользователи' },
    { scope: 'group', label: 'Моя группа' },
]

const courseLeaderboardFilters = computed<LeaderboardFilter[]>(() => (
    (props.courses ?? []).map((course) => ({
        scope: 'course',
        label: course.title,
        courseId: course.courseId,
    }))
))

const currentUserInTop = computed(() => (
    currentUser.value
        ? leaders.value.some((leader) => leader.user_id === currentUser.value?.user_id)
        : false
))
const shouldShowCurrentUserRow = computed(() => Boolean(currentUser.value && !currentUserInTop.value))
const isEmpty = computed(() => !isLoading.value && !error.value && !leaders.value.length && !currentUser.value)
const currentUserRowBackground = computed(() => (
    resolvedTheme.value === 'dark' ? '#363640' : '#E8E8E8'
))

const percentFormatter = new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 1,
})
const topRankBackgrounds = computed<Record<number, string>>(() => (
    resolvedTheme.value === 'dark'
        ? {
            1: '#5A4514',
            2: '#535A66',
            3: '#6A432D',
        }
        : {
            1: '#F2CC72',
            2: '#DCE2EA',
            3: '#D9A06C',
        }
))

function isActiveFilter(filter: LeaderboardFilter) {
    if (filter.scope !== activeScope.value) return false
    if (filter.scope !== 'course') return true

    return filter.courseId === activeCourseId.value
}

function getFilterClass(filter: LeaderboardFilter) {
    if (!isActiveFilter(filter)) {
        return 'bg-transparent text-app-text hover:bg-profile-details-surface'
    }

    if (resolvedTheme.value === 'dark') {
        return 'bg-white text-black hover:bg-white'
    }

    return 'bg-primary-gradient text-white hover:opacity-95'
}

function getStudentName(student: LeaderboardEntry) {
    const fullName = [student.first_name, student.last_name]
        .filter((part) => part && part.trim())
        .join(' ')

    return fullName || student.username || `Пользователь #${student.user_id}`
}

function formatPercent(value: number) {
    return `${percentFormatter.format(value * 100)}%`
}

function formatTasks(student: LeaderboardEntry) {
    return `${student.completed_tasks} / ${student.total_tasks}`
}

function formatGroup(group?: string | null) {
    return group || '—'
}

function getStudentRowStyle(student: LeaderboardEntry) {
    const rankBackground = topRankBackgrounds.value[student.rank]
    if (rankBackground) return { backgroundColor: rankBackground }

    if (!currentUser.value || student.user_id !== currentUser.value.user_id) return undefined

    return { backgroundColor: currentUserRowBackground.value }
}

function isCurrentUser(student: LeaderboardEntry) {
    return currentUser.value?.user_id === student.user_id
}

function getErrorMessage(scope: LeaderboardScope, requestError: unknown) {
    if (scope === 'course' && requestError instanceof NotFoundError) {
        return 'Лидерборд по этому курсу недоступен'
    }

    return 'Не удалось загрузить лидерборд'
}

async function loadLeaderboard(scope: LeaderboardScope, courseId?: number | string) {
    isLoading.value = true
    error.value = null

    try {
        const response = await leaderboardService.getLeaderboard({ scope, courseId })
        leaders.value = response.leaders
        currentUser.value = response.current_user
    } catch (requestError) {
        leaders.value = []
        currentUser.value = null
        error.value = getErrorMessage(scope, requestError)
    } finally {
        isLoading.value = false
    }
}

function selectFilter(filter: LeaderboardFilter) {
    activeScope.value = filter.scope
    activeCourseId.value = filter.courseId ?? null
    loadLeaderboard(filter.scope, filter.courseId)
}

onMounted(() => {
    loadLeaderboard('all')
})
</script>

<template>
    <section class="rounded-[10px] border border-app-border bg-profile-card-gradient p-5 text-app-text sm:p-7">
        <h2 class="text-[22px] leading-none sm:text-[28px]">
            <span class="text-profile-prompt">&gt;_</span>
            Лидерборд
        </h2>

        <div class="mt-6 flex flex-wrap gap-3">
            <div class="inline-flex max-w-full overflow-x-auto rounded-[8px] border border-app-border">
                <button
                    v-for="filter in commonLeaderboardFilters"
                    :key="filter.scope"
                    type="button"
                    class="leaderboard-filter min-h-10 shrink-0 border-r border-app-border px-3 py-2 text-left text-[12px] last:border-r-0 sm:text-[14px]"
                    :class="getFilterClass(filter)"
                    @click="selectFilter(filter)"
                >
                    {{ filter.label }}
                </button>
            </div>

            <div
                v-if="courseLeaderboardFilters.length"
                class="inline-flex max-w-full overflow-x-auto rounded-[8px] border border-app-border"
            >
                <button
                    v-for="filter in courseLeaderboardFilters"
                    :key="filter.courseId"
                    type="button"
                    class="leaderboard-filter min-h-10 shrink-0 border-r border-app-border px-3 py-2 text-left text-[12px] last:border-r-0 sm:text-[14px]"
                    :class="getFilterClass(filter)"
                    @click="selectFilter(filter)"
                >
                    {{ filter.label }}
                </button>
            </div>
        </div>

        <p v-if="isLoading" class="mt-6 text-[15px]">
            <AppLoader text="Загрузка лидерборда" mode="inline" />
        </p>

        <p v-else-if="error" class="mt-6 text-[15px] text-danger">
            {{ error }}
        </p>

        <p v-else-if="isEmpty" class="mt-6 text-[15px] text-app-muted">
            Данные лидерборда пока отсутствуют
        </p>

        <template v-else>
            <div class="mt-6 overflow-x-auto border-t border-app-border">
                <table class="w-full min-w-[920px] border-collapse text-left">
                    <thead>
                        <tr class="border-b border-app-border text-[12px] text-app-text sm:text-[14px]">
                            <th class="w-[190px] px-4 py-3 font-normal">Место</th>
                            <th class="min-w-[220px] px-4 py-3 font-normal">Студент</th>
                            <th class="w-[150px] px-4 py-3 text-center font-normal">Группа</th>
                            <th class="w-[120px] px-4 py-3 font-normal">Задачи</th>
                            <th class="w-[120px] px-4 py-3 font-normal">Прогресс</th>
                            <th class="w-[120px] px-4 py-3 font-normal">Успех</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="student in leaders"
                            :key="`${activeScope}-${activeCourseId ?? 'all'}-${student.user_id}`"
                            class="border-b border-app-border text-[13px] sm:text-[15px]"
                            :style="getStudentRowStyle(student)"
                        >
                            <td class="px-4 py-3">{{ student.rank }}</td>
                            <td class="px-4 py-3">
                                {{ getStudentName(student) }}<template v-if="isCurrentUser(student)"> (Вы)</template>
                            </td>
                            <td class="whitespace-nowrap px-4 py-3 text-center">{{ formatGroup(student.group) }}</td>
                            <td class="px-4 py-3">{{ formatTasks(student) }}</td>
                            <td class="px-4 py-3">{{ formatPercent(student.completion_rate) }}</td>
                            <td class="px-4 py-3">{{ formatPercent(student.successful_attempts_rate) }}</td>
                        </tr>
                    </tbody>
                    <tfoot v-if="shouldShowCurrentUserRow && currentUser">
                        <tr class="text-[13px] sm:text-[15px]">
                            <td class="whitespace-nowrap px-4 py-3">Ваше место: {{ currentUser.rank }}</td>
                            <td class="px-4 py-3">{{ getStudentName(currentUser) }}</td>
                            <td class="whitespace-nowrap px-4 py-3 text-center">{{ formatGroup(currentUser.group) }}</td>
                            <td class="px-4 py-3">{{ formatTasks(currentUser) }}</td>
                            <td class="px-4 py-3">{{ formatPercent(currentUser.completion_rate) }}</td>
                            <td class="px-4 py-3">{{ formatPercent(currentUser.successful_attempts_rate) }}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </template>
    </section>
</template>

<style scoped>
.leaderboard-filter {
    transition-property: color, background-color, background-image, opacity;
}
</style>
