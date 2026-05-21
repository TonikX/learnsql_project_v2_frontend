<script setup lang="ts">
import { dia, shapes } from 'jointjs'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/taskStore'
import AppContainer from '../layout/AppContainer.vue'
import AppLoader from '../ui/AppLoader.vue'

const taskStore = useTaskStore()
const { currentTask, taskLoading } = storeToRefs(taskStore)

</script>

<template>
<AppContainer>
    <AppLoader v-if="taskLoading" text="Загрузка задания"/>
    <template v-if="!taskLoading && currentTask">
        <p v-html="currentTask.details.database_description" class="text-sm"></p>
    </template>
</AppContainer>
</template>