<script setup lang="ts">
import AppContainer from '../components/layout/AppContainer.vue'
import { ref, onUnmounted, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCoursesStore } from '@/stores/courseStore'
import { useTaskStore } from '@/stores/taskStore'
import { ConnectionError, NotFoundError } from '@/errors/network'
import BaseError from '@/components/errors/BaseError.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import TaskSideBar from '@/components/courses/TaskSideBar.vue'


const route = useRoute()
const router = useRouter()

const courseStore = useCoursesStore()
const { courseLoading } = storeToRefs(courseStore)
const { getCourseData, clearCurrentCourse, toggleCourseLoading } = courseStore

const taskStore = useTaskStore()
const { currentTask, taskLoading } = storeToRefs(taskStore)
const { getCourseTasks, getCachedTask, clearCurrentTask, clearTasksList } = taskStore

const sideBarOpen = ref(false)
const errorMsg = ref('')
const currentTaskId = computed(() => currentTask.value?.details.id)
const isNavigationReady = computed(() => !taskLoading.value && !!currentTaskId.value)

const toggleSidebar = () => { sideBarOpen.value = !sideBarOpen.value }

const handleLoadCourseData = async (courseId: number) => {
    let courseLoadedSuccessfully = false

    // load course info itself
    try {
        await getCourseData(courseId)
        courseLoadedSuccessfully = true
    } catch (err) {
        if (err instanceof NotFoundError) 
            router.replace({ name: 'not_found' })

        if (err instanceof ConnectionError) {
            errorMsg.value = "Ошибка подключения. Попробуйте еще раз"
        }

        console.log(err)
    }

    return courseLoadedSuccessfully
}

const handleLoadTaskList = async (courseId: number) => {
    try {
        await getCourseTasks(courseId)
    } catch (err) {
        console.error(err)
    }
}

onMounted(async () => {
    const courseId = Number(route.params.course_id)

    const courseLoaded = await toggleCourseLoading(handleLoadCourseData, courseId) as Boolean
    if (courseLoaded) {
        await handleLoadTaskList(courseId)
        await getCachedTask(courseId)
    }
})

onUnmounted(() => {
    clearCurrentTask()
    clearTasksList()
    clearCurrentCourse()
})
</script>

<template>
<AppLoader v-if="courseLoading" text="Загрузка курса"/>

<!-- Show error if appears -->
<BaseError 
    v-if="!courseLoading && errorMsg"
    :description="errorMsg" 
    action="Перезагрузить страницу"
    :link="route.fullPath">
</BaseError>

<!-- Course pages navigation -->
<template v-if="!courseLoading && !errorMsg">
    <AppContainer class="py-8 flex items-center justify-between">
        <section class="flex justify-start gap-4">
            <RouterLink :to="{ name: 'details' }">[ Курс ]</RouterLink>
            <RouterLink 
                :to="isNavigationReady ? { name: 'schema', params: { task_id: currentTaskId } } : ''"
                :class="isNavigationReady? '' : 'cursor-progress text-gray-500'"
                >[ Схема ]
            </RouterLink>
            <RouterLink 
                :to="isNavigationReady ? { name: 'problem', params: { task_id: currentTaskId } } : ''"
                :class="isNavigationReady? '' : 'cursor-progress text-gray-500'"
                >[ Решение ]
            </RouterLink>
        </section>

        <p class="cursor-pointer" @click="toggleSidebar"><< Список задач</p>
        <TaskSideBar @close-side-bar="toggleSidebar" :is-open="sideBarOpen"/>
    </AppContainer>

    <!-- Page body -->
    <RouterView />
</template>
</template>