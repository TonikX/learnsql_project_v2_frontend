import { ref } from 'vue'
import { defineStore } from 'pinia'
import { profileStatisticsService } from '@/services/profileStatisticsService'
import type { StudentProfileResponse } from '@/types/profileStatisticsTypes'

export const useProfileStatisticsStore = defineStore('profileStatistics', () => {
    const profile = ref<StudentProfileResponse | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    async function loadCurrentProfile() {
        isLoading.value = true
        error.value = null

        try {
            profile.value = await profileStatisticsService.getCurrentStudentProfile([
                'personal',
                'themes',
            ])
        } catch (unknownError) {
            error.value = 'Не удалось загрузить профиль'
            throw unknownError
        } finally {
            isLoading.value = false
        }
    }

    function clearProfile() {
        profile.value = null
        error.value = null
    }

    return {
        profile,
        isLoading,
        error,
        loadCurrentProfile,
        clearProfile,
    }
})
