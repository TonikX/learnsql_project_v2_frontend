import { defineStore } from "pinia"
import { ref } from "vue"
import { type TaskContext, type TaskExecutionState } from "@/types/taskTypes"
import taskService from "@/services/taskService"

export const useTaskStore = defineStore("tasks", () => {
    const currentTask = ref<TaskContext | null>(null)

    const tasksList = ref<TaskExecutionState[]>([])

    const getCachedTaskId = (courseId: number) => {
        return Number(localStorage.getItem(courseId.toString()))
    }

    const saveTaskId = (courseId: number, taskId: number) => {
        localStorage.setItem(courseId.toString(), taskId.toString())
    }

    const getCachedSolution = (taskId: number) => {
        for (const state of tasksList.value) {
            if (state.taskId === taskId) 
                return state.solution
        }

        return ""
    }

    const changeTask = async (courseId: number, taskId: number) => {
        if (currentTask.value && currentTask.value.details.id === taskId)
            return

        const newTask = await taskService.getTaskById(taskId)
        currentTask.value = { details: newTask, solution: getCachedSolution(taskId) }
        saveTaskId(courseId, taskId)
    }

    const getCourseTasks = async (courseId: number) => {
        const tasks: TaskExecutionState[] = await taskService.getTasksByCourse(courseId)
        tasksList.value = tasks

        console.log(`COURSE ${courseId} TASKS:`, tasks)
        return tasks
    }

    const loadCachedTask = async (courseId: number) => {
        if (currentTask.value) return

        let taskId = getCachedTaskId(courseId)
            
        // fallback: take first task 
        if (!taskId) {
            if (tasksList.value.length === 0)
                return

            taskId = tasksList.value[0]!.taskId
        }

        const task = await taskService.getTaskById(taskId)
        saveTaskId(courseId, taskId)
        console.log("LOAD CACHED TASK", taskId)
        currentTask.value = { details: task, solution: getCachedSolution(taskId) }
    }

    const clearCurrentTask = () => { currentTask.value = null }
    const clearTasksList = () => { tasksList.value = [] }

    return {
        currentTask,
        changeTask,
        getCourseTasks,
        loadCachedTask,
        clearCurrentTask,
        clearTasksList,
    }
}) 