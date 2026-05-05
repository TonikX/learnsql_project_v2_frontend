export interface TaskExecutionState {
    taskId: number
    status: string
    courseId: number
    solution: string
}

interface TaskInSet {
    task: number
}

export interface UserTaskResponse {
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
    solution: string
}

export function toExecState(response: UserTaskResponse): TaskExecutionState {
    return { 
        taskId: response.task_in_set.task,
        status: response.status,  
        courseId: response.user_course,
        solution: response.solution
    }
}
