import { useTaskStore } from "@/stores/taskStore"
import { storeToRefs } from "pinia"
import { computed, toRefs } from "vue"
import type { RouteLocationNormalizedLoadedGeneric } from "vue-router"

const taskStore = useTaskStore()
const { getNextTaskId, getPrevTaskId, getCachedTaskId } = taskStore
const { tasksList } = storeToRefs(taskStore)

export const useCurrentTaskId = (route: RouteLocationNormalizedLoadedGeneric) => {
    const courseId = Number(route.params.course_id)
    const id = computed(() => Number(route.params.task_id ?? getCachedTaskId(courseId)))

    return { 
        currentTaskId: id,
        nextTaskId: computed(() => getNextTaskId(id.value)),
        prevTaskId: computed(() => getPrevTaskId(id.value))
    }
}

export const useCurrentTaskSeqNum = (route: RouteLocationNormalizedLoadedGeneric) => {
    const taskIdData = toRefs(useCurrentTaskId(route))
    const { currentTaskId } = taskIdData
    return computed(() => {
        const task = tasksList.value.find(task => task.taskId === currentTaskId.value)
        return task !== undefined ? task.seqNum : -1
    })
} 
