<script setup lang="ts">
import { ref, computed, watch, toRefs, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { highlight, languages } from 'prismjs'
import AppContainer from '@/components/layout/AppContainer.vue'
import { useTaskStore } from '@/stores/taskStore'
import { useCurrentTaskId } from '@/composables/currentTaskId'
import type { AttemptHistoryItem, AttemptResult } from '@/types/taskTypes'
import AppModal from '@/components/ui/AppModal.vue'
import AppButton from '@/components/ui/AppButton.vue'
import 'prismjs/components/prism-sql'


const taskStore = useTaskStore()
const { currentResult, attemptHistory } = storeToRefs(taskStore)
const { loadAttemptsHistory } = taskStore

const route = useRoute()
const courseId = Number(route.params.course_id)
const { currentTaskId } = toRefs(useCurrentTaskId(route))

const copyBtnAction = ref('')
const solutionOpen = ref(false)
const solutionMeta = reactive({
    title: '',
    text: '',
    html: ''
})

const statusMap = [
    { text: 'Ошибка', class: 'text-danger' },
    { text: 'Успешно', class: 'text-success-base' },
    { text: 'На проверке...', class: 'animate-pulse' } 
]

const attemptList = computed(() => {
    return attemptHistory.value.map(attempt => {
        const code = Number(attempt.status)
        const meta = statusMap[code] || { text: 'Неизвестно', class: 'text-text-main' }
        return { ...attempt, statusMeta: meta }
    })
})

const points = (success: boolean) => success ? 1 : 0

const openSolutionModal = (attempt: AttemptHistoryItem) => {
    solutionMeta.text = attempt.solution
    solutionMeta.html = highlight(attempt.solution, languages.sql!, 'sql')
    solutionMeta.title = `${attempt.task_title} попытка #${attempt.attempt_number}`
    solutionOpen.value = true
    copyBtnAction.value = 'Копировать'
}

const closeSolutionModal = () => {
    solutionOpen.value = false
}

const copySolution = async () => {
    await navigator.clipboard.writeText(solutionMeta.text)
    copyBtnAction.value = 'Текст скопирован!'
}

const handleLoadAttemptsHistory = async (taskId: number) => {
    try {
        await loadAttemptsHistory(courseId, taskId)
    } catch (err) {
        console.log(err)
    }
}

watch(currentResult, async (result: AttemptResult | null) => {
    if (result) 
        await handleLoadAttemptsHistory(currentTaskId.value)
})
</script>

<template>
<AppContainer>
    <table class="w-full border mb-8">
        <caption class="text-left pb-4">
            > SELECT * FROM attempt_history WHERE task_id={{ currentTaskId }};
        </caption>
        <thead class="bg-schema-header">
            <tr class="text-left">
                <th class="p-2">id</th>
                <th>Номер попытки</th>
                <th>Текст решения</th>
                <th>Дата и время</th>
                <th>Статус</th>
                <th>Баллы</th>
            </tr>
        </thead>
        <tr 
            v-for="attempt in attemptList" 
            :key="attempt.attempt_number"
            class="border-y font-light"
        > 
            <td class="p-2">#{{ attempt.id }}</td>
            <td>{{ attempt.attempt_number }}</td>
            <td>
                <span 
                    class="cursor-pointer hover:underline"
                    @click="() => openSolutionModal(attempt)"
                >
                    >>>
                </span>
            </td>
            <td>{{ attempt.date }}</td>
            <td :class="attempt.statusMeta.class">{{ attempt.statusMeta.text }}</td>
            <td>{{ points(attempt.is_success) }}</td>
        </tr>
    </table>
</AppContainer>
<AppModal 
    :open="solutionOpen"
    :title="solutionMeta.title"
    :close-on-backdrop="true"
    @close="closeSolutionModal"
>
    <div class="flex flex-col gap-4">
        <pre 
            class="border rounded-lg p-2" 
            style="white-space: pre-wrap;"
        ><code v-html="solutionMeta.html"></code></pre>
        <AppButton 
            variant="secondary" 
            size="sm" 
            class="self-end"
            @click="copySolution"
        >{{ copyBtnAction }}
        </AppButton>
    </div>
</AppModal>
</template>