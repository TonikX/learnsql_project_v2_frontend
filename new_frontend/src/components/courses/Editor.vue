<script setup lang="ts">
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { highlight, languages } from 'prismjs'
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'
import 'prismjs/components/prism-sql'

import { useTaskStore } from '@/stores/taskStore'
import { useThemeStore } from '@/stores/themeStore'
import type { Theme } from '@/types/theme'

const taskStore = useTaskStore()
const themeStore = useThemeStore()

const { currentTask } = storeToRefs(taskStore)
const { currentTheme } = storeToRefs(themeStore)

const lineCount = computed(() => {
    return currentTask.value?.solution?.split('\n').length || 1
})

const highlighter = (code: string) => {
    return highlight(code, languages.sql!, 'sql')
}

const prismThemesImport = {
    light: () => import('prismjs/themes/prism.css?url'),
    dark: () => import('prismjs/themes/prism-tomorrow.css?url'),
    system: () => import('prismjs/themes/prism.css?url')
}

const loadPrismTheme = async (theme: Theme) => {
    const oldLink = document.getElementById('prism-theme')
    if (oldLink) {
        oldLink.remove()
    }

    const themeModule = await prismThemesImport[theme]()
    const link = document.createElement('link')

    link.id = 'prism-theme'
    link.rel = 'stylesheet'
    link.href = themeModule.default

    document.head.appendChild(link)
}

watch(currentTheme, async (theme: Theme) => await loadPrismTheme(theme), { immediate: true })
</script>

<template>
<div class="min-h-[64dvh] flex flex-col rounded-lg border-2 border-course-grid-stroke bg-gradient-to-b from-editor-begin to-editor-end">
    <div class="border-b border-course-grid-stroke p-2">solution.sql</div>
    <div class="grow flex items-stretch">
        <div class="flex-none border-r border-course-grid-stroke p-2">
            <div v-for="line in lineCount" :key="line"> {{ line }} </div>
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