export interface StudentGroupSummary {
    id: number | string
    title: string | null
    period: string | null
    university: string | number | null
}

export interface StudentSummary {
    id: number | string
    username: string
    first_name: string | null
    last_name: string | null
    email: string | null
    role: string | null
    group: StudentGroupSummary | null
}

export interface PersonalStatistics {
    total_courses: number | null
    completed_courses: number | null
    active_courses: number | null
    distinct_tasks_attempted: number | null
    solved_tasks: number | null
    total_attempts: number | null
    successful_attempts: number | null
    success_rate: number | null
    attempt_success_rate: number | null
    first_try_success_rate: number | null
    average_attempts_per_task: number | null
    active_days: number | null
    current_activity_streak_days: number | null
    last_activity_at: string | null
    started_learning_at: string | null
}

export interface ThemeStatisticsItem {
    theme_id: number | string
    theme_title: string
    attempts: number | null
    tasks_started: number | null
    tasks_solved: number | null
    success_rate: number | null
    average_attempts_per_task: number | null
    mastery_level: number | null
}

export interface ThemesStatistics {
    summary: unknown | null
    items: ThemeStatisticsItem[]
}

export interface GroupStatistics {
    [key: string]: unknown
}

export interface ProfileSections {
    personal?: PersonalStatistics | null
    group?: GroupStatistics | null
    themes?: ThemesStatistics | null
}

export interface StudentProfileResponse {
    student: StudentSummary
    sections: ProfileSections
}
