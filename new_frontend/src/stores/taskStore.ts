import { defineStore } from "pinia"
import { ref, watch } from "vue"
import { type TaskContext, type TaskExecutionState, type AttemptResult, type AsyncStatus, type AttemptHistoryItem, type AttemptHistory } from "@/types/taskTypes"
import taskService from "@/services/taskService"
import { doAfterAsync } from "@/utils/asyncSleep"
import type { Comment, DeleteComment, Discussion } from "@/types/discussionTypes"
import { loaderFactory } from "@/utils/loadersFactory"


export const useTaskStore = defineStore("tasks", () => {
    const tasksList = ref<TaskExecutionState[]>([])
    const currentTask = ref<TaskContext | null>(null)
    const currentResult = ref<AttemptResult | null>(null)
    const currentDiscussion = ref<Discussion | null>(null)
    const attemptHistory = ref<AttemptHistoryItem[]>([])

    const taskLoading = ref(false)
    const commentLoading = ref(false)
    const resultLoading = ref(false)

    const getCachedTaskId = (courseId: number) => {
        return Number(localStorage.getItem(courseId.toString()) ?? tasksList.value[0]?.taskId ?? null)
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

        clearAttemptHistory()
        const newTask = await taskService.getTaskById(courseId, taskId)
        const taskState = getCachedTaskState(taskId)

        currentTask.value = { 
            details: newTask,
            status: taskState?.status ?? '0',
            solution: taskState?.solution ?? '', 
            routeStepId: taskState?.routeStepId ?? null 
        }
        
        saveTaskId(courseId, taskId)
        await loadAttemptsHistory(courseId, taskId)
    }

    const getCourseTasks = async (courseId: number) => {
        if (tasksList.value.length > 0) {
            console.log("Skip tasks loading, use cached value")
            return
        }

        const tasks: TaskExecutionState[] = await taskService.getTasksByCourse(courseId)
        tasksList.value = tasks
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
        const taskIdAtSubmission = currentTask.value.details.id 
        const attemptsCountPrev = attemptHistory.value.at(-1)?.attempt_number ?? 0

        attemptHistory.value.push({
            id: null,
            task: taskIdAtSubmission,
            task_title: currentTask.value.details.title,
            attempt_number: attemptsCountPrev + 1,
            solution: currentTask.value.solution,
            date: 'now',
            status: '2', // pending...
            is_success: false
        })
        
        let delay: number // ms
        let status: AsyncStatus = await taskService.sendTaskSolution(currentTask.value)
        const taskId = status.task_id

        const MAX_REQUESTS = 5
        for (let attempt = 1; attempt <= MAX_REQUESTS; attempt++) {
            delay = attempt * 1000
            status = await doAfterAsync(delay, () => taskService.checkSolutionResult(taskId))
            if (status.ready && status.result) 
                break
        }

        if (!status.ready || !status.result) {
            console.log("Couldn't receive submission result")
            return
        }

        if (currentTask.value.details.id !== taskIdAtSubmission) {
            console.log("task changed during submission, results won't be shown")
            return
        }

        currentResult.value = status.result
    }

    const loadAttemptsHistory = async (courseId: number, taskId: number) => {
        const loaded: AttemptHistory = await taskService.getAttemptHistory(courseId, taskId)
        attemptHistory.value = loaded.results
    }

    const addComment = async (courseId: number, taskId: number, content: string) => {
        if (!currentDiscussion.value)
            return

        const comment: Comment = await taskService.createComment(courseId, taskId, content)
        currentDiscussion.value.messages.push(comment)
        currentDiscussion.value.messages_count++
    }

    const removeComment = async (courseId: number, taskId: number, commentId: number) => {
        if (!currentDiscussion.value)
            return

        const removeStatus: DeleteComment = await taskService.deleteComment(courseId, taskId, commentId)
        if (removeStatus.deleted) {
            currentDiscussion.value.messages = currentDiscussion.value.messages.filter(comment => comment.id !== commentId)
            currentDiscussion.value.messages_count--
        }
    }

    const loadDiscussion = async (courseId: number, taskId: number,) => {
        currentDiscussion.value = await taskService.getComments(courseId, taskId)
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

    const toggleTaskLoading = async (func: (...params: any) => Promise<any>, ...params: any) => {
        await loaderFactory(func, taskLoading, ...params)()
    }

    const toggleResultLoading = async (func: (...params: any) => Promise<any>, ...params: any) => {
        await loaderFactory(func, resultLoading, ...params)()
    }

    const toggleCommentLoading = async (func: (...params: any) => Promise<any>, ...params: any) => {
        await loaderFactory(func, commentLoading, ...params)()
    }

    const clearCurrentResult = () => currentResult.value = null
    const clearCurrentTask = () => currentTask.value = null
    const clearCurrentDiscussion = () => currentDiscussion.value = null
    const clearTasksList = () => tasksList.value = []
    const clearAttemptHistory = () => attemptHistory.value = []

    return {
        tasksList,
        currentTask,
        currentResult,
        currentDiscussion,
        attemptHistory,
        taskLoading,
        resultLoading,
        commentLoading,
        changeTask,
        getCourseTasks,
        getCachedTaskId,
        clearCurrentTask,
        clearCurrentDiscussion,
        clearAttemptHistory,
        clearTasksList,
        saveSolution,
        getNextTaskId,
        getPrevTaskId,
        doTaskAttempt,
        loadAttemptsHistory,
        addComment,
        removeComment,
        loadDiscussion,
        toggleTaskLoading,
        toggleResultLoading,
        toggleCommentLoading
    }
})
