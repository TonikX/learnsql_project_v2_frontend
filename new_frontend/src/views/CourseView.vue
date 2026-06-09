<script setup lang="ts">
import AppContainer from '../components/layout/AppContainer.vue'
import { ref, onUnmounted, computed, watch, onMounted, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCoursesStore } from '@/stores/courseStore'
import { useTaskStore } from '@/stores/taskStore'
import { ConnectionError, NotFoundError } from '@/errors/network'
import BaseError from '@/components/errors/BaseError.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import TaskSideBar from '@/components/courses/TaskSideBar.vue'
import { useCurrentTaskId } from '@/composables/currentTaskId.ts'


const route = useRoute()
const router = useRouter()
const courseId = Number(route.params.course_id)

const taskIdData = toRefs(useCurrentTaskId(route))
const { currentTaskId } = taskIdData

const courseStore = useCoursesStore()
const { courseLoading } = storeToRefs(courseStore)
const { loadCurrentCourse, clearCurrentCourse, clearMaterials, toggleCourseLoading } = courseStore

const taskStore = useTaskStore()
const { taskLoading } = storeToRefs(taskStore)
const { 
    getCourseTasks, 
    clearCurrentTask, 
    clearTasksList, 
    toggleTaskLoading, 
    changeTask, 
    saveSolution 
} = taskStore

const sideBarOpen = ref(false)
const errorMsg = ref('')
const isNavigationReady = computed(() => !taskLoading.value && currentTaskId.value !== 0)
const baseNavLinkStyle = 'hover:bg-course-card-begin'

const toggleSidebar = () => { sideBarOpen.value = !sideBarOpen.value }

const handleLoadCourse = async (courseId: number) => {
    // load course info itself
    try {
        await loadCurrentCourse(courseId)
        await getCourseTasks(courseId)
        await toggleTaskLoading(handleChangeTask, currentTaskId.value)
    } catch (err) {
        if (err instanceof NotFoundError) 
            router.replace({ name: 'not_found' })

        if (err instanceof ConnectionError) {
            errorMsg.value = "Ошибка подключения. Попробуйте еще раз"
        }

        console.log(err)
    }
}

const handleChangeTask = async (taskId: number) => {
    const courseId = Number(route.params.course_id)

    if (Number.isNaN(courseId) || Number.isNaN(taskId))
        return

    saveSolution()
    await changeTask(courseId, taskId)
}

watch(
    () => Number(route.params.task_id),
    async (taskId: number) => await toggleTaskLoading(handleChangeTask, taskId)
)

onMounted(async () => await toggleCourseLoading(handleLoadCourse, courseId))
onUnmounted(() => {
    clearCurrentTask()
    clearTasksList()
    clearMaterials()
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
            <RouterLink :to="{ name: 'details' }" v-slot="{ isActive }"> 
                <span :class="[baseNavLinkStyle, isActive ? 'text-text-main' : 'text-text-secondary']">[ Курс ]</span> 
            </RouterLink>
            <RouterLink :to="isNavigationReady ? { name: 'schema', params: { task_id: currentTaskId } } : ''" v-slot="{ isActive }">
                <span :class="[baseNavLinkStyle, isActive ? 'text-text-main' : 'text-text-secondary']">[ Схема ]</span>
            </RouterLink>
            <RouterLink :to="isNavigationReady ? { name: 'problem', params: { task_id: currentTaskId } } : ''" v-slot="{ isActive }">
                <span :class="[baseNavLinkStyle, isActive ? 'text-text-main' : 'text-text-secondary']">[ Решение ]</span>
            </RouterLink>
        </section>

        <p class="cursor-pointer flex items-center gap-2" @click="toggleSidebar">
            <span class="text-lg md:text-normal"><<</span>
            <span class="hidden md:block">Список задач</span>
        </p>
        <TaskSideBar @close-side-bar="toggleSidebar" :is-open="sideBarOpen"/>
    </AppContainer>

    <!-- Page body -->
    <RouterView class="mb-10"/>
</template>
</template>