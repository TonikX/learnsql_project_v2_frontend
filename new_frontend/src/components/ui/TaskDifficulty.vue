<script setup lang="ts">
import { computed, toRefs } from 'vue';

const props = defineProps({
    difficulty: {
        type: Number,
        default: 0,
    },
})

const { difficulty } = toRefs(props)
const colorMap = ['text-task-easy', 'text-task-medium', 'text-task-hard']

const diff3 = computed(() => ~~((difficulty.value - 1) * 3 / 5) + 1)

const diffText = computed(() => {
    return ['● '.repeat(diff3.value), '● '.repeat(3 - diff3.value)]
})

const diffColor = computed(() => {
    return colorMap[diff3.value - 1]
})
</script>

<template>
<span :class="diffColor">{{diffText[0]}}</span>
<span class="text-task-neutral">{{ diffText[1] }}</span>
</template>