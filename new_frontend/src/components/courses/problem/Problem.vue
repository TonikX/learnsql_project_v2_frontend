<script setup lang="ts">
import { computed, watch, ref, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'
import AppContainer from '@/components/layout/AppContainer.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import Editor from './Editor.vue'
import ResultsTable from './ResultsTable.vue'
import ProblemDescription from '../ProblemDescription.vue'
import ProblemLayout from '@/components/layout/ProblemLayout.vue'
import { useCurrentTaskId } from '@/composables/currentTaskId.ts'
import Discussion from './Discussion.vue'
import { useChatStore } from '@/stores/chatStore.ts'


const taskStore = useTaskStore()
const { currentTask, taskLoading, currentResult, resultLoading, currentDiscussion } = storeToRefs(taskStore)
const { doTaskAttempt, loadDiscussion, toggleResultLoading } = taskStore

const chatStore = useChatStore()
const { createRoom } = chatStore

const route = useRoute()
const router = useRouter()
const courseId = Number(route.params.course_id)

const taskIdData = toRefs(useCurrentTaskId(route))
const { currentTaskId } = taskIdData

const timestamp = ref('')
const discussionComponent = ref<InstanceType<typeof Discussion> | null>(null)
const formatter = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
})

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

const scrollToDiscussion = () => {
    if (discussionComponent.value)
        discussionComponent.value.scrollToInput()
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

const handleLoadDiscussion = async (taskId: number) => {
    try {
        await loadDiscussion(courseId, taskId)
    } catch (err) {
        console.log(err)
    }
}

const handleAskQuestion = async () => {
    try {
        const chatRoom = await createRoom(courseId)
        router.push({ name: "chats", query: { room: chatRoom.id }})
    } catch (err) {
        console.log(err)
    }
}

watch(currentTaskId, async (taskId: number) => {
    await handleLoadDiscussion(taskId)
}, { immediate: true })
</script>

<template>
<AppContainer>
    <AppLoader v-if="taskLoading" text="Загрузка задания"/>
    <template v-if="!taskLoading && currentTask">
        <ProblemLayout class="flex items-start gap-8">
            <template #content>
                <!-- code editor -->
                <Editor />

               <div class="flex flex-col gap-4 md:flex-row md:justify-between">
                    <div class="flex flex-col gap-2 sm:flex-row sm:gap-4">
                        <AppButton @click="scrollToDiscussion">
                            <AppIcon name="communication">
                                Обсуждение ({{ currentDiscussion?.messages_count ?? 0 }})
                            </AppIcon>
                        </AppButton>
                        <AppButton 
                            variant="secondary"
                            :to="{ name: 'history', params: { task_id: $route.params.task_id } }"
                        >
                            История
                        </AppButton>
                    </div>

                    <div class="flex flex-col gap-2 sm:flex-row sm:gap-4">
                        <AppButton variant="secondary" @click="handleAskQuestion">
                            Задать вопрос
                        </AppButton>

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
            </template>

            <template #description>
                <ProblemDescription
                    :title="`${currentTask.details.title} #${currentTask.details.id}`"
                    :description="currentTask.details.task_text"
                    :difficulty="currentTask.details.difficulty"
                    path="problem"
                />
            </template>
        </ProblemLayout>

        <Discussion 
            v-if="currentDiscussion" 
            :discussion="currentDiscussion"
            ref="discussionComponent"
        />
    </template>
</AppContainer>
</template>