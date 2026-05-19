import { type AxiosInstance } from 'axios'
import apiClient from '@/api/client'
import { 
    toExecState, 
    type SolutionAttempt, 
    type Task, 
    type TaskContext, 
    type TaskExecutionState, 
    type UserTaskResponse,
    type AttemptResult
} from '@/types/taskTypes'


class TaskService {
    constructor(public api: AxiosInstance) {}

    async getTaskById(taskId: number): Promise<Task> {
        const response = await this.api.get<Task>(`/api/tasks/${taskId}`)
        return response.data
    }

    async getTasksByCourse(courseId: number): Promise<TaskExecutionState[]> {
        const response = await this.api.get(`/api/individualroutetasks/${courseId}/`)
        if ("results" in response.data) {
            const taskList: UserTaskResponse[] = response.data.results as UserTaskResponse[]
            return taskList.map(element => toExecState(element))
        }
        
        return []
    }

    async sendTaskSolution(task: TaskContext): Promise<AttemptResult> {
        const payload: SolutionAttempt = { id: task.routeStepId, task_id: task.details.id, solution: task.solution, status: task.status }
        const response = await this.api.put<AttemptResult>("/api/student-course/do-task/", payload)
        return response.data
    }
}

const taskService = new TaskService(apiClient)
export default taskService