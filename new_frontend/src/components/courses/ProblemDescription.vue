<script setup lang="ts">
import { toRefs } from 'vue'
import { useRoute } from 'vue-router'
import TaskSwitch from '../ui/TaskSwitch.vue'
import TaskDifficulty from '../ui/TaskDifficulty.vue'
import { useCurrentTaskId } from '@/composables/currentTaskId'


const props = defineProps<{
    title: string,
    description: string,
    difficulty: number,
    path: 'schema' | 'problem'
}>()

const route = useRoute()
const taskIdData = toRefs(useCurrentTaskId(route))
const { nextTaskId, prevTaskId } = taskIdData
</script>

<template>
<div class="p-4 rounded-lg border-2 border-course-grid-stroke bg-gradient-to-b from-task-begin to-task-end">
    <div class="flex justify-between">
        <h1>{{ title }}</h1>
        <div class="flex gap-2">
            <RouterLink v-if="prevTaskId > 0" :to="{ name: path, params: { task_id: prevTaskId }}">
                <TaskSwitch><</TaskSwitch>
            </RouterLink>
            <RouterLink v-if="nextTaskId > 0" :to="{ name: path, params: { task_id: nextTaskId }}">
                <TaskSwitch>></TaskSwitch>
            </RouterLink>
        </div>
    </div>
    
    <br>
    <p class="text-sm">{{ description }}</p>

    <br>
    <p>Сложность: <TaskDifficulty :difficulty="difficulty"></TaskDifficulty></p>
</div>
</template>