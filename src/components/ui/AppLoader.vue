<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const props = withDefaults(defineProps<{
    text?: string
    mode?: 'fullscreen' | 'inline'
    textClass?: string
}>(), {
    text: 'Загрузка',
    mode: 'fullscreen',
    textClass: 'text-app-text',
})

let intervalId: number | undefined
let dotsCount = 1

const loaderText = ref('')

function renderLoader() {
    loaderText.value = `${props.text} ${'.'.repeat(dotsCount)}`
    dotsCount = dotsCount % 3 + 1
}

onMounted(() => {
    renderLoader()
    intervalId = window.setInterval(renderLoader, 250)
})

onUnmounted(() => {
    if (intervalId !== undefined) {
        window.clearInterval(intervalId)
    }
})
</script>

<template>
    <div v-if="mode === 'fullscreen'" :class="['fixed inset-0 z-50 flex items-center justify-center', textClass]">
        {{ loaderText }}
    </div>
    <span v-else :class="['inline-block min-w-[18ch]', textClass]">
        {{ loaderText }}
    </span>
</template>
