import { defineStore } from "pinia"
import { ref, watch } from "vue"
import { type TaskContext, type TaskExecutionState, type AttemptResult } from "@/types/taskTypes"
import taskService from "@/services/taskService"
import { sleep } from "@/utils/Sleep"


export const useTaskStore = defineStore("tasks", () => {
    const currentTask = ref<TaskContext | null>(null)
    const taskLoading = ref(false)
    const tasksList = ref<TaskExecutionState[]>([])
    const currentResult = ref<AttemptResult | null>(null)
    const resultLoading = ref(false)

    const getCachedTaskId = (courseId: number) => {
        return Number(localStorage.getItem(courseId.toString()))
    }

    const saveTaskId = (courseId: number, taskId: number) => {
        localStorage.setItem(courseId.toString(), taskId.toString())
    }

    const getCachedTaskState = (taskId: number) => {
        for (const state of tasksList.value) {
            if (state.taskId === taskId) 
                return state
        }

        return null
    }

    const saveSolution = () => {
        if (!currentTask.value) return

        for (const state of tasksList.value) {
            if (state.taskId === currentTask.value.details.id) {
                state.solution = currentTask.value.solution
                return
            }  
        }
    }

    const changeTask = async (courseId: number, taskId: number) => {
        if (currentTask.value && currentTask.value.details.id === taskId)
            return

        const newTask = await taskService.getTaskById(taskId)
        const taskState = getCachedTaskState(taskId)

        currentTask.value = { 
            details: newTask,
            status: taskState?.status ?? '0',
            solution: taskState?.solution ?? '', 
            routeStepId: taskState?.routeStepId ?? null 
        }
        
        saveTaskId(courseId, taskId)
    }

    const getCourseTasks = async (courseId: number) => {
        if (tasksList.value.length > 0) {
            console.log("Skip tasks loading, use cached value")
            return
        }

        const tasks: TaskExecutionState[] = await taskService.getTasksByCourse(courseId)
        tasksList.value = tasks

        console.log(`COURSE ${courseId} TASKS:`, tasks)
    }

    const getCachedTask = async (courseId: number) => {
        if (currentTask.value) return

        let taskId = getCachedTaskId(courseId)
            
        // fallback: take first task 
        if (!taskId) {
            if (tasksList.value.length === 0)
                return

            taskId = tasksList.value[0]!.taskId
        }

        await changeTask(courseId, taskId)
    }

    const getNextTaskId = (taskId: number) => {
        for (let i = 0; i < tasksList.value.length - 1; i++) {
            if (tasksList.value[i]?.taskId === taskId) 
                return Number(tasksList.value[i + 1]?.taskId)
        }

        return -1
    }

    const getPrevTaskId = (taskId: number) => {
        for (let i = tasksList.value.length; i > 0; i--) {
            if (tasksList.value[i]?.taskId === taskId)
                return Number(tasksList.value[i - 1]?.taskId)
        }

        return -1
    }

    const doTaskAttempt = async () => {
        if (!currentTask.value)
            return null

        clearCurrentResult()
        currentResult.value = await taskService.sendTaskSolution(currentTask.value)
    }

    watch(() => currentTask.value?.status, (newStatus: string | undefined) => {
        if (newStatus === undefined) return

        for (const state of tasksList.value) {
            if (state.taskId === currentTask.value!.details.id && state.status === '0') {
                state.status = newStatus
                return
            }  
        }
    })

    watch(currentTask, (task: TaskContext | null) => {
        // check if task already done
        if (task && task.status !== '0') {
            currentResult.value = { status: "ok" }
            return
        }

        clearCurrentResult() 
    })

    const toggleTaskLoading = async (func: (...params: any) => Promise<void>, ...params: any) => {
        taskLoading.value = true
        await func(...params)
        await sleep(1000)
        taskLoading.value = false
    }

    const toggleResultLoading = async (func: (...params: any) => Promise<any>, ...params: any) => {
        resultLoading.value = true
        try { await func(...params) } 
        catch (err) { throw err }
        finally { resultLoading.value = false } 
    }

    const clearCurrentResult = () => { currentResult.value = null }
    const clearCurrentTask = () => { currentTask.value = null }
    const clearTasksList = () => { tasksList.value = [] }

    return {
        currentTask,
        tasksList,
        taskLoading,
        currentResult,
        resultLoading,
        changeTask,
        getCourseTasks,
        getCachedTask,
        clearCurrentTask,
        clearTasksList,
        saveSolution,
        getNextTaskId,
        getPrevTaskId,
        doTaskAttempt,
        toggleTaskLoading,
        toggleResultLoading
    }
}) 