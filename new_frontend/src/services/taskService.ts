import { type AxiosInstance } from 'axios'
import apiClient from '@/api/client'
import type { Schema } from '@/types/schemaTypes'
import { 
    toExecState, 
    type SolutionAttempt, 
    type Task, 
    type TaskContext, 
    type TaskExecutionState, 
    type UserTaskResponse,
    type AsyncStatus,
    type AttemptHistory
} from '@/types/taskTypes'
import type { Comment, CreateComment, DeleteComment, Discussion } from '@/types/discussionTypes'


class TaskService {
    constructor(public api: AxiosInstance) {}

    async getTaskById(courseId: number, taskId: number): Promise<Task> {
        const response = await this.api.get<Task>(`/api/courses/${courseId}/tasks/${taskId}`)
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

    async getSchemaByTask(courseId: number, taskId: number): Promise<Schema> {
        const response = await this.api.get<Schema>(`/api/courses/${courseId}/tasks/${taskId}/schema/`)
        return response.data
    }

    async sendTaskSolution(task: TaskContext): Promise<AsyncStatus> {
        const payload: SolutionAttempt = { 
            id: task.routeStepId, 
            task_id: task.details.id, 
            solution: task.solution, 
            status: task.status 
        }
        const response = await this.api.put<AsyncStatus>("/api/student-course/do-task/", payload)
        return response.data
    }

    async checkSolutionResult(queueTaskId: string): Promise<AsyncStatus> {
        const response = await this.api.get<AsyncStatus>(`/api/student-course/task-submissions/${queueTaskId}`)
        return response.data
    }

    async getAttemptHistory(courseId: number, taskId: number): Promise<AttemptHistory> {
        const response = await this.api.get<AttemptHistory>(`/api/courses/${courseId}/tasks/${taskId}/attempts/`)
        return response.data
    }

    async getComments(courseId: number, taskId: number): Promise<Discussion> {
        const response = await this.api.get<Discussion>(`/api/courses/${courseId}/tasks/${taskId}/discussion/`)
        return response.data
    }

    async createComment(courseId: number, taskId: number, content: string, parentId?: number): Promise<Comment>  {
        const payload: CreateComment = { content: content }
        if (parentId) payload.parent_id = parentId

        const response = await this.api.post<Comment>(`/api/courses/${courseId}/tasks/${taskId}/discussion/`, payload)
        return response.data
    }

    async deleteComment(courseId: number, taskId: number, messageId: number): Promise<DeleteComment> {
        const response = await this.api.delete<DeleteComment>(
            `/api/courses/${courseId}/tasks/${taskId}/discussion/messages/${messageId}`
        )
        return response.data
    }
}

const taskService = new TaskService(apiClient)
export default taskService