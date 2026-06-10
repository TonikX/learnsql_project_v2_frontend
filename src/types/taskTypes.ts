export interface TaskExecutionState {
    routeStepId: number | null
    taskId: number
    title: string
    difficulty: number
    status: string
    courseId: number
    solution: string
}

interface TaskInSet {
    task: number
    title: string
    difficulty: number
}

export interface UserTaskResponse {
    id: number
    status: string
    user_course: number
    task_in_set: TaskInSet
    solution: string
}

export interface Task {
    id: number
    title: string
    database_image: string
    database_description: string
    task_text: string
    difficulty: number 
}

export interface TaskContext {
    details: Task
    status: string
    solution: string
    routeStepId: number | null
}

export interface SolutionAttempt {
    id: number | null // route step id
    task_id: number
    status: string
    solution: string
}

export interface AsyncStatus {
    task_id: string
    status: string
    ready?: boolean
    result?: AttemptResult
    error?: string
}

export interface AttemptResult {
    status: string
    message?: string
    ref_result?: Array<any> | boolean
    student_result?: Array<any> | string
}

export interface AttemptHistoryItem {
    id: number | null
    task: number
    task_title: string
    attempt_number: number
    solution: string
    date: string
    status: string
    is_success: boolean
}

export interface AttemptHistory {
    results: AttemptHistoryItem[]
}

export function toExecState(response: UserTaskResponse): TaskExecutionState {
    return { 
        routeStepId: response.id,
        taskId: response.task_in_set.task,
        title: response.task_in_set.title,
        difficulty: response.task_in_set.difficulty,
        status: response.status,  
        courseId: response.user_course,
        solution: response.solution
    }
}
