<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { highlight, languages } from 'prismjs'
import { PrismEditor } from 'vue-prism-editor'
import { useTaskStore } from '@/stores/taskStore'
import AppIcon from '@/components/ui/AppIcon.vue'
import 'vue-prism-editor/dist/prismeditor.min.css'
import 'prismjs/components/prism-sql'


const taskStore = useTaskStore()
const { currentTask } = storeToRefs(taskStore)

const lineCount = computed(() => {
    return currentTask.value?.solution?.split('\n').length || 1
})

const highlighter = (code: string) => {
    return highlight(code, languages.sql!, 'sql')
}

const clearSolution = () => {
    if (currentTask.value)
        currentTask.value.solution = ''
}
</script>

<template>
<div class="min-h-[64dvh] flex flex-col rounded-lg border-2 border-course-grid-stroke bg-gradient-to-b from-editor-begin to-editor-end">
    <div class="border-b border-course-grid-stroke p-2 flex justify-between">
        <span>solution.sql</span>
        <AppIcon 
            name="bin" 
            color="fill-text-secondary cursor-pointer" 
            title="Очистить"
            @click="clearSolution"
        ></AppIcon>
    </div>
    <div class="grow flex items-stretch">
        <div class="flex-none border-r border-course-grid-stroke p-2">
            <div v-for="line in lineCount" :key="line" class="font-extralight"> {{ line }} </div>
        </div>
        <prism-editor
            class="grow p-2"
            v-model="currentTask!.solution"
            :highlight="highlighter"
            placeholder="Здесь напишите решение..."
        />
    </div>
</div>
</template>

<style>
.prism-editor__textarea:focus {
    outline: none;
}
</style>