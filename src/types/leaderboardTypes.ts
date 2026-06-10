export type LeaderboardScope = 'all' | 'group' | 'course'

export interface LeaderboardEntry {
    rank: number
    user_id: number
    username: string
    first_name?: string | null
    last_name?: string | null
    group?: string | null
    rating: number
    completed_tasks: number
    total_tasks: number
    completion_rate: number
    successful_attempts_rate: number
    is_in_top_20?: boolean
}

export interface LeaderboardResponse {
    scope: Record<string, unknown>
    leaders: LeaderboardEntry[]
    current_user: LeaderboardEntry | null
}

export interface LeaderboardQueryParams {
    scope: LeaderboardScope
    courseId?: number | string
}
