<script setup lang="ts">
import { onUnmounted, ref, watch, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/taskStore'
import AppContainer from '../layout/AppContainer.vue'
import AppLoader from '../ui/AppLoader.vue'
import ProblemLayout from '../layout/ProblemLayout.vue'
import ProblemDescription from './ProblemDescription.vue'
import { useCurrentTaskId } from '@/composables/currentTaskId'
import { useSchemaStore } from '@/stores/schemaStrore'


const route = useRoute()
const courseId = Number(route.params.course_id)

const taskIdData = toRefs(useCurrentTaskId(route))
const { currentTaskId } = taskIdData

const taskStore = useTaskStore()
const { currentTask, taskLoading } = storeToRefs(taskStore)

const schemaStore = useSchemaStore()
const {
    getPaper,
    getScale,
    setScale,
    loadDbSchema, 
    initGraph, 
    waitPaper, 
    restoreOrRender, 
    clearGraphState, 
    saveGraphState,
    setLastTaskId,
    isTaskChanged
} = schemaStore

const canvas = ref<HTMLDivElement | null>(null)

let dragging = false
let lastX = 0
let lastY = 0

const handleSchemaLoading = async (taskId: number) => {
    try {
        await loadDbSchema(courseId, taskId)
    } catch (err) {
        console.error(err)
    }
}

const handleWheel = (e: WheelEvent) => {
    e.preventDefault()
    const paper = getPaper()

    if (!paper)
        return
    
    let scale = getScale()
    const canvas = e.currentTarget as HTMLDivElement
    const oldScale = scale

    scale *= e.deltaY > 0 ? 0.9 : 1.1

    scale = Math.max(
        0.5,
        Math.min(3, scale)
    )

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const { tx, ty } = paper.translate()

    const coef = scale / oldScale
    const newTx = x - (x - tx) * coef
    const newTy = y - (y - ty) * coef

    paper.scale(scale)
    setScale(scale)

    paper.translate(newTx, newTy)
}

const handleStartDragging = (e: MouseEvent) => {
    if (e.button === 0)
        return

    dragging = true
    lastX = e.clientX
    lastY = e.clientY
}

const handleStopDragging = (_: MouseEvent) => dragging = false

const handleMouseMove = (e: MouseEvent) => {
    const paper = getPaper()

    if (!dragging || !paper)
        return

    const dx = e.clientX - lastX
    const dy = e.clientY - lastY

    lastX = e.clientX
    lastY = e.clientY

    const translate = paper.translate()
    paper.translate(
        translate.tx + dx,
        translate.ty + dy
    )
}

watch(currentTaskId, async (taskId) => {
    if (!taskId)
        return

    await waitPaper()

    // clear only if task changed
    if (isTaskChanged(taskId)) {
        console.log(`Task changed, clear graph`)
        clearGraphState()
    }

    await handleSchemaLoading(taskId)
    restoreOrRender()
    setLastTaskId(taskId)
}, { 
    immediate: true 
})

watch(canvas, (elem) => {
    if (!elem) 
        return 
    
    initGraph(elem)
    elem.addEventListener("wheel", handleWheel)
    elem.addEventListener("mousedown", handleStartDragging)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleStopDragging)
}, { 
    immediate: true 
})

onUnmounted(() => {
    saveGraphState()
    window.removeEventListener("mousemove", handleMouseMove)
    window.removeEventListener("mouseup", handleStopDragging)
})
</script>

<template>
<AppContainer>
    <AppLoader v-if="taskLoading" text="Загрузка задания"/>
    <ProblemLayout v-if="!taskLoading && currentTask">
        <template #content>
            <div
                ref="canvas"
                class="w-full rounded-md border-2 border-course-grid-stroke bg-gradient-to-b from-schema-bg-begin to-schema-bg-end overflow-hidden" >
            </div>
        </template>
        <template #description>
            <ProblemDescription
                :title="`${currentTask.details.title} #${currentTask.details.id}`"
                :description="currentTask.details.task_text"
                :difficulty="currentTask.details.difficulty"
                path="schema"
            />
        </template>
    </ProblemLayout>
</AppContainer>
</template>
