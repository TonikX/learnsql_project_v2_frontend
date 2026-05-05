import { type AxiosInstance } from 'axios'
import apiClient from '@/api/client'
import { toExecState, type Task, type TaskExecutionState, type UserTaskResponse } from '@/types/taskTypes'

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
}

const taskService = new TaskService(apiClient)
export default taskService