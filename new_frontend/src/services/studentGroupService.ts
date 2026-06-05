import apiClient from '@/api/client'
import type { ChoiceValue, PaginatedResponse, StudentGroup, StudentGroupQuery } from '@/types/userTypes'

export const studentGroupService = {
    async getStudentGroups(params?: StudentGroupQuery): Promise<StudentGroup[] | PaginatedResponse<StudentGroup>> {
        const response = await apiClient.get<StudentGroup[] | PaginatedResponse<StudentGroup>>('/api/student-groups/', {
            params,
        })
        return response.data
    },

    async getChoiceValues<T extends ChoiceValue = ChoiceValue>(field: string): Promise<T[]> {
        const response = await apiClient.get<T[]>('/api/student-groups/get_choise_values/', {
            params: { field },
        })
        return response.data
    },
}
