export interface CourseProgressResponse {
    course: {
        id: number | string
        title?: string | null
    }
    overall: {
        total_tasks?: number | null
        completed_tasks?: number | null
        pending_tasks?: number | null
        completion_rate?: number | null
    }
}

export interface CourseProgressCard {
    courseId: number | string
    title: string
    completedTasks: number
    totalTasks: number
    pendingTasks: number
    completionPercent: number
    completionRate: number
    isCompleted: boolean
}
