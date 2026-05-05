import apiClient from '@/api/client'
import type { PaginatedResponse, StudentGroup, StudentGroupQuery } from '@/types/userTypes'

export const studentGroupService = {
    async getStudentGroups(params?: StudentGroupQuery): Promise<StudentGroup[] | PaginatedResponse<StudentGroup>> {
        const response = await apiClient.get<StudentGroup[] | PaginatedResponse<StudentGroup>>('/api/student-groups/', {
            params,
        })
        return response.data
    },

    async getChoiceValues(field: string): Promise<unknown> {
        const response = await apiClient.get('/api/student-groups/get_choise_values/', {
            params: { field },
        })
        return response.data
    },
}
