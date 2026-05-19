<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
    text: {
        type: String,
        default: "Загрузка",
    }
})

let intervalId: number
let dotsCount: number = 1

const loaderText = ref("")

const renderLoader = () => {
    loaderText.value = props.text + " " + ".".repeat(dotsCount)
    dotsCount = (dotsCount) % 3 + 1
}

onMounted(() => {
    intervalId = setInterval(renderLoader, 250)
})

onUnmounted(() => {
    clearInterval(intervalId)
})

</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center z-50">
        {{ loaderText }}
    </div>
</template>