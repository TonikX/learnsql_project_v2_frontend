<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/taskStore'
import AppContainer from '../layout/AppContainer.vue'
import AppLoader from '../ui/AppLoader.vue'
import AppButton from '../ui/AppButton.vue'
import AppIcon from '../ui/AppIcon.vue'
import Editor from './Editor.vue'
import TaskSwitch from '../ui/TaskSwitch.vue'
import TaskDifficulty from '../ui/TaskDifficulty.vue'
import ResultsTable from './ResultsTable.vue'


const route = useRoute()
const taskStore = useTaskStore()

const { currentTask, taskLoading, currentResult, resultLoading } = storeToRefs(taskStore)
const { 
    changeTask, 
    toggleTaskLoading, 
    getNextTaskId, 
    getPrevTaskId, 
    doTaskAttempt, 
    saveSolution,
    toggleResultLoading
} = taskStore

const timestamp = ref('')
const formatter = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
})

const currTaskId = computed(() => {
    return currentTask.value?.details.id ? Number(currentTask.value?.details.id) : -1
})

const nextTaskId = computed(() => getNextTaskId(currTaskId.value))
const prevTaskId = computed(() => getPrevTaskId(currTaskId.value))

const completed = computed(() => currentResult.value?.status === "ok")
const summary = computed(() => {
    return { 
        color: completed.value ? "text-success-base" : "text-danger",
        text: completed.value ? "Решение засчитано!" : currentResult.value?.message ? currentResult.value.message : "Решение неверно!"
    }
})

const queryData = computed(() => {
    if (!(currentResult.value?.student_result instanceof Array)) 
        return null

    const query = currentResult.value.student_result[1][1] ?? []
    return query.length > 0 ? query : null
})

const rowCount = computed(() => queryData.value.length ? Number(queryData.value.length) : 0)
const columnCount = computed(() => queryData.value[0] ? queryData.value[0].length : 0) 

const handleChangeTask = async (taskId: number) => {
    const courseId = Number(route.params.course_id)

    if (Number.isNaN(courseId))
        return

    saveSolution()
    await changeTask(courseId, taskId)
}

const handleSolutionAttempt = async () => {
    if (!currentTask.value) return
    const now = new Date()

    try {
        await toggleResultLoading(doTaskAttempt)
        currentTask.value.status = completed.value ? '1' : '0'
        timestamp.value = formatter.format(now).replace(',', '')
    } catch (err) {
        console.error(err)
    }
}

watch(
    () => Number(route.params.task_id),
    async (taskId: number) => await toggleTaskLoading(handleChangeTask, taskId)
)
</script>

<template>
<AppContainer>
    <AppLoader v-if="taskLoading" text="Загрузка задания"/>
    <div class="flex items-start gap-8" v-if="!taskLoading && currentTask">
        <div class="basis-3/4 flex flex-col gap-8">
            <!-- code editor -->
            <Editor />

            <div class="flex justify-between">
                <div class="flex justify-start gap-4">
                    <AppButton><AppIcon name="communication">Обсуждение (1)</AppIcon></AppButton>
                    <AppButton variant="secondary">История</AppButton>
                </div>
                
                <div class="flex justify-end gap-4">
                    <AppButton variant="secondary" @click="() => currentTask!.solution = ''">Очистить</AppButton>
                    <AppButton 
                        variant="success" 
                        @click="handleSolutionAttempt" 
                        :loading="resultLoading"
                        :disabled="currentTask!.solution === ''"
                    >
                        Отправить ▶
                    </AppButton>
                </div>
            </div>

            <div v-if="currentResult" class="flex flex-col gap-4">
                <p class="flex justify-between">
                    <span :class="[summary.color, 'basis-4/5']">{{ summary.text }}</span>
                    <span class="text-sm text-right basis-1/5">-- баллы: {{ completed ? 1 : 0 }} из 1 --</span>
                </p>

                <template v-if="queryData">
                    <p class="text-sm">*** {{ rowCount }} строк(-и) получено - 0.256s {{ timestamp }}</p>
                    <ResultsTable :results="queryData" :columns="columnCount" />
                </template>
            </div>
        </div>

        <!-- problem description block -->
        <div class="basis-1/4 p-4 rounded-lg border-2 border-course-grid-stroke bg-gradient-to-b from-task-begin to-task-end">
            <div class="flex justify-between">
                <h1>{{ currentTask.details.title }} #{{ currentTask.details.id }}</h1>
                <div class="flex gap-2">
                    <RouterLink v-if="prevTaskId > 0" :to="{ name: 'problem', params: { task_id: prevTaskId }}">
                        <TaskSwitch><</TaskSwitch>
                    </RouterLink>
                    <RouterLink v-if="nextTaskId > 0" :to="{ name: 'problem', params: { task_id: nextTaskId }}">
                        <TaskSwitch>></TaskSwitch>
                    </RouterLink>
                </div>
            </div>
            
            <br>
            <p class="text-sm">{{ currentTask.details.task_text }}</p>

            <br>
            <p>Сложность: <TaskDifficulty :difficulty="currentTask.details.difficulty"></TaskDifficulty></p>
        </div> 
    </div>
</AppContainer>
</template>