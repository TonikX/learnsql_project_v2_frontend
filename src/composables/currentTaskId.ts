import { useTaskStore } from "@/stores/taskStore"
import { computed } from "vue"
import type { RouteLocationNormalizedLoadedGeneric } from "vue-router"

const taskStore = useTaskStore()
const { getNextTaskId, getPrevTaskId, getCachedTaskId } = taskStore

export const useCurrentTaskId = (route: RouteLocationNormalizedLoadedGeneric) => {
    const courseId = Number(route.params.course_id)
    const id = computed(() => Number(route.params.task_id ?? getCachedTaskId(courseId)))

    return { 
        currentTaskId: id,
        nextTaskId: computed(() => getNextTaskId(id.value)),
        prevTaskId: computed(() => getPrevTaskId(id.value))
    }
}
