<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{
    text: string
}>()

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
    <span class="inline-block min-w-[18ch] text-chat-text">
        {{ loaderText }}
    </span>
</template>
