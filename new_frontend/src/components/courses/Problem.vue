<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/taskStore'
import AppContainer from '../layout/AppContainer.vue'

const taskStore = useTaskStore()
const { currentTask } = storeToRefs(taskStore)
</script>

<template>
<AppContainer>
    <h1>{{ currentTask?.details.title }}</h1>
    <p>{{ currentTask?.details.task_text }}</p>
</AppContainer>
</template>