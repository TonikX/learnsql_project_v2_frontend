<script setup lang="ts">
import { dia, shapes } from 'jointjs'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/taskStore'
import AppContainer from '../layout/AppContainer.vue'

const taskStore = useTaskStore()
const { currentTask } = storeToRefs(taskStore)

</script>

<template>
<AppContainer>
    <p v-html="currentTask?.details.database_description" class="text-sm"></p>
</AppContainer>
</template>