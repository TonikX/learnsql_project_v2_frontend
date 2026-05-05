<script setup lang="ts">
import AppContainer from '../components/layout/AppContainer.vue';
import { ref, watch, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useCoursesStore } from '@/stores/courseStore';
import { useTaskStore } from '@/stores/taskStore';
import { ConnectionError, NotFoundError } from '@/errors/network';

const route = useRoute()
const router = useRouter()

const courseStore = useCoursesStore()
const { getCourseData, clearCurrentCourse } = courseStore

const taskStore = useTaskStore()
const { currentTask } = storeToRefs(taskStore)
const { getCourseTasks, changeTask, loadCachedTask, clearCurrentTask, clearTasksList } = taskStore

const courseLoadingError = ref("")

const handleLoadCourseData = async (courseId: number) => {
    let courseLoaded = false

    // load course info itself
    try {
        await getCourseData(courseId)
        courseLoaded = true
    } catch (err) {
        if (err instanceof NotFoundError) 
            router.replace({ name: 'not_found' })

        if (err instanceof ConnectionError) {
            
        }

        console.log(err)
    }

    // skip task loading if course not loaded
    if (!courseLoaded) 
        return

    // load tasks list
    try {
        await getCourseTasks(courseId)
    } catch (err) {
        console.error(err)
    }

    // skip getting task from cache 
    if (route.params.task_id)
        return

    await loadCachedTask(courseId)
}

const handleChangeTask = async (taskId: number) => {
    const courseId = Number(route.params.course_id)

    if (Number.isNaN(courseId) || Number.isNaN(taskId))
        return

    console.log("TASK CHANGED TO", taskId)
    await changeTask(courseId, taskId)
}

// observe path parameter changes
watch(() => Number(route.params.course_id), handleLoadCourseData, { immediate: true })
watch(() => Number(route.params.task_id), handleChangeTask, { immediate: true })


onUnmounted(() => {
    clearCurrentTask()
    clearTasksList()
    clearCurrentCourse()
})
</script>

<template> 
    <!-- Course pages navigation -->
    <AppContainer class="py-12 flex items-center justify-between">
        <section class="flex justify-start gap-4">
            <RouterLink :to="{ name: 'details' }">[ Курс ]</RouterLink>
            <RouterLink :to="!currentTask ? '' : { name: 'schema', params: { task_id: currentTask.details.id } }">[ Схема ]</RouterLink>
            <RouterLink :to="!currentTask ? '' : { name: 'problem', params: { task_id: currentTask.details.id } }">[ Решение ]</RouterLink>
        </section>

        <p><< Список задач</p>
    </AppContainer>
    
    <!-- Page body -->
    <RouterView />
</template>