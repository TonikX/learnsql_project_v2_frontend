import apiClient from '@/api/client'
import type {
    ChangePasswordPayload,
    CurrentUserProfile,
    UpdateCurrentUserProfilePayload,
} from '@/types/userTypes'

export const userService = {
    async getCurrentUserProfile(): Promise<CurrentUserProfile> {
        const response = await apiClient.get<CurrentUserProfile>('/api/users/me/')
        return response.data
    },

    async updateCurrentUserProfile(payload: UpdateCurrentUserProfilePayload): Promise<CurrentUserProfile> {
        const response = await apiClient.patch<CurrentUserProfile>('/api/users/me/', payload)
        return response.data
    },

    async changeCurrentUserPassword(payload: ChangePasswordPayload): Promise<void> {
        await apiClient.post('/api/users/me/change-password/', payload)
    },
}
