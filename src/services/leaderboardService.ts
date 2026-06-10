import apiClient from '@/api/client'
import type { LeaderboardQueryParams, LeaderboardResponse } from '@/types/leaderboardTypes'

class LeaderboardService {
    async getLeaderboard(params: LeaderboardQueryParams): Promise<LeaderboardResponse> {
        const queryParams: Record<string, number | string> = {
            scope: params.scope,
        }

        if (params.scope === 'course' && params.courseId !== undefined) {
            queryParams.course_id = params.courseId
        }

        const response = await apiClient.get<LeaderboardResponse>('/api/rating-leaderboard/', {
            params: queryParams,
        })

        return response.data
    }
}

const leaderboardService = new LeaderboardService()

export default leaderboardService
