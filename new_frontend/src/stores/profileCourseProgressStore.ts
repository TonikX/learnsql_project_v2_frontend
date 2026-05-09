import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { profileCourseProgressService } from '@/services/profileCourseProgressService'
import type {
    CourseProgressCard,
    CourseProgressResponse,
    StudentCourse,
} from '@/types/profileCourseProgressTypes'

function toNumber(value?: number | null) {
    return typeof value === 'number' ? value : 0
}

function mapCourseProgress(
    userCourse: StudentCourse,
    response: CourseProgressResponse,
): CourseProgressCard {
    const completionRate = toNumber(response.overall.completion_rate)

    return {
        courseId: response.course.id,
        title: response.course.title || userCourse.course_title || 'Курс без названия',
        completedTasks: toNumber(response.overall.completed_tasks),
        totalTasks: toNumber(response.overall.total_tasks),
        pendingTasks: toNumber(response.overall.pending_tasks),
        completionPercent: Math.round(completionRate * 100),
        completionRate,
        isCompleted: completionRate >= 1,
    }
}

export const useProfileCourseProgressStore = defineStore('profileCourseProgress', () => {
    const courseProgressItems = ref<CourseProgressCard[]>([])
    const isCourseProgressLoading = ref(false)
    const courseProgressError = ref<string | null>(null)
    const hasPartialCourseProgressError = ref(false)

    const hasCourseProgressItems = computed(() => courseProgressItems.value.length > 0)

    async function loadCourseProgress() {
        isCourseProgressLoading.value = true
        courseProgressError.value = null
        hasPartialCourseProgressError.value = false

        try {
            const studentCourses = await profileCourseProgressService.getStudentCourses()

            if (!studentCourses.length) {
                courseProgressItems.value = []
                return
            }

            const results = await Promise.allSettled(
                studentCourses.map(async (userCourse) => {
                    const progress = await profileCourseProgressService.getCourseProgress(userCourse.course)
                    return mapCourseProgress(userCourse, progress)
                }),
            )

            courseProgressItems.value = results
                .filter((result): result is PromiseFulfilledResult<CourseProgressCard> => result.status === 'fulfilled')
                .map((result) => result.value)

            const failedCount = results.filter((result) => result.status === 'rejected').length
            hasPartialCourseProgressError.value = failedCount > 0 && courseProgressItems.value.length > 0

            if (failedCount === results.length) {
                courseProgressError.value = 'Не удалось загрузить прогресс курсов'
            }
        } catch {
            courseProgressItems.value = []
            courseProgressError.value = 'Не удалось загрузить прогресс курсов'
        } finally {
            isCourseProgressLoading.value = false
        }
    }

    function clearCourseProgress() {
        courseProgressItems.value = []
        courseProgressError.value = null
        hasPartialCourseProgressError.value = false
    }

    return {
        courseProgressItems,
        isCourseProgressLoading,
        courseProgressError,
        hasPartialCourseProgressError,
        hasCourseProgressItems,
        loadCourseProgress,
        clearCourseProgress,
    }
})
