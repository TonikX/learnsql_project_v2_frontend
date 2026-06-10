import apiClient from '@/api/client'
import type { StudentProfileResponse } from '@/types/profileStatisticsTypes'

export const profileStatisticsService = {
    async getCurrentStudentProfile(sections?: string[]): Promise<StudentProfileResponse> {
        const response = await apiClient.get<StudentProfileResponse>('/api/student-profile/', {
            params: sections?.length ? { sections: sections.join(',') } : undefined,
        })

        return response.data
    },
}
