<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import AppContainer from '@/components/layout/AppContainer.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import ProfileCoursesProgressPanel from '@/components/profile/ProfileCoursesProgressPanel.vue'
import ProfileDetailsStats from '@/components/profile/ProfileDetailsStats.vue'
import ProfileHeaderCard from '@/components/profile/ProfileHeaderCard.vue'
import ProfileStatCard from '@/components/profile/ProfileStatCard.vue'
import ProfileThemeResultsPanel from '@/components/profile/ProfileThemeResultsPanel.vue'
import { useAuthStore } from '@/stores/authStore'
import { useProfileCourseProgressStore } from '@/stores/profileCourseProgressStore'
import { useProfileStatisticsStore } from '@/stores/profileStatisticsStore'
import {
    formatNumber,
    formatPercent,
    formatStreakDays,
} from '@/utils/profileFormatters'

const authStore = useAuthStore()
const profileStore = useProfileStatisticsStore()
const courseProgressStore = useProfileCourseProgressStore()
const { profile, isLoading, error } = storeToRefs(profileStore)
const {
    courseProgressItems,
    isCourseProgressLoading,
    courseProgressError,
    hasPartialCourseProgressError,
} = storeToRefs(courseProgressStore)

const personal = computed(() => profile.value?.sections.personal ?? null)
const themeResults = computed(() => profile.value?.sections.themes ?? null)
const isStudentProfile = computed(() => profile.value?.student?.role === 'student')

const stats = computed(() => [
    {
        icon: 'profile-completed-courses',
        label: 'Пройдено курсов',
        value: formatNumber(personal.value?.completed_courses),
        iconBoxClass: 'bg-profile-stat-blue-bg',
        iconClass: 'text-profile-stat-blue-text',
    },
    {
        icon: 'code',
        label: 'Решено задач',
        value: formatNumber(personal.value?.solved_tasks),
        iconBoxClass: 'bg-profile-stat-green-bg',
        iconClass: 'text-profile-stat-green-text',
    },
    {
        icon: 'profile-success-rate',
        label: 'Процент успеха',
        value: formatPercent(personal.value?.success_rate),
        iconBoxClass: 'bg-profile-stat-purple-bg',
        iconClass: 'text-profile-stat-purple-text',
    },
    {
        icon: 'profile-streak',
        label: 'Активная серия',
        value: formatStreakDays(personal.value?.current_activity_streak_days),
        iconBoxClass: 'bg-profile-stat-orange-bg',
        iconClass: 'text-profile-stat-orange-text',
    },
])

const detailsLeftRows = computed(() => [
    { label: 'Всего курсов', value: formatNumber(personal.value?.total_courses) },
    { label: 'Активные курсы', value: formatNumber(personal.value?.active_courses) },
    { label: 'Начато задач', value: formatNumber(personal.value?.distinct_tasks_attempted) },
    { label: 'Всего попыток', value: formatNumber(personal.value?.total_attempts) },
])

const detailsRightRows = computed(() => [
    { label: 'Успешных попыток', value: formatNumber(personal.value?.successful_attempts) },
    { label: 'Процент успешных попыток', value: formatPercent(personal.value?.attempt_success_rate) },
    { label: 'Решено с первой попытки', value: formatPercent(personal.value?.first_try_success_rate) },
    { label: 'Дни активности', value: formatNumber(personal.value?.active_days) },
])

async function loadProfile() {
    try {
        await profileStore.loadCurrentProfile()
        return true
    } catch {
        return false
    }
}

async function loadProfilePage() {
    const isProfileLoaded = await loadProfile()

    if (!isProfileLoaded) {
        courseProgressStore.clearCourseProgress()
        return
    }

    if (isStudentProfile.value) {
        await courseProgressStore.loadCourseProgress()
        return
    }

    courseProgressStore.clearCourseProgress()
}

function logout() {
    authStore.logout()
    window.location.replace('/login')
}

function editProfile() {
}

onMounted(() => {
    loadProfilePage()
})
</script>

<template>
    <main class="bg-page py-8 font-mono text-app-text sm:py-12">
        <AppContainer as="section">
            <div class="mx-auto max-w-[1762px]">
                <div class="mb-5 flex items-center justify-between gap-4 border-b border-app-border px-0 pb-6 sm:mb-6 sm:pb-7">
                    <p class="min-w-0 overflow-hidden whitespace-nowrap text-[10px] leading-none min-[390px]:text-[11px] sm:text-[20px]">
                        <span class="text-profile-prompt">&gt;_</span>
                        SELECT * FROM users WHERE id = current_user;
                    </p>
                    <span class="hidden w-fit shrink-0 rounded-[8px] border border-app-border px-3 py-1 text-[13px] text-app-text sm:inline-flex">
                        [ профиль ]
                    </span>
                </div>

                <div v-if="isLoading" class="rounded-[10px] border border-app-border bg-profile-card-gradient px-6 py-12 text-center">
                    <AppLoader text="Загрузка профиля" mode="inline" />
                </div>

                <div v-else-if="error" class="rounded-[10px] border border-app-border bg-profile-card-gradient px-6 py-12 text-center text-danger">
                    {{ error }}
                </div>

                <div v-else-if="profile" class="space-y-8 xl:space-y-10">
                    <ProfileHeaderCard
                        :student="profile.student"
                        :personal="personal"
                        @logout="logout"
                        @edit="editProfile"
                    />

                    <template v-if="isStudentProfile">
                        <div class="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-10">
                            <ProfileStatCard
                                v-for="stat in stats"
                                :key="stat.label"
                                :icon="stat.icon"
                                :label="stat.label"
                                :value="stat.value"
                                :icon-box-class="stat.iconBoxClass"
                                :icon-class="stat.iconClass"
                            />
                        </div>

                        <ProfileCoursesProgressPanel
                            :items="courseProgressItems"
                            :is-loading="isCourseProgressLoading"
                            :error="courseProgressError"
                            :has-partial-error="hasPartialCourseProgressError"
                        />

                        <ProfileThemeResultsPanel :themes="themeResults" />

                        <ProfileDetailsStats
                            :left-rows="detailsLeftRows"
                            :right-rows="detailsRightRows"
                        />
                    </template>
                </div>
            </div>
        </AppContainer>
    </main>
</template>
