<script setup lang="ts">
import { computed, toRefs } from 'vue';

const props = defineProps({
    difficulty: {
        type: Number,
        default: 0,
    },
    negative: {
        type: Boolean,
        default: false,
    }
})

const { difficulty, negative } = toRefs(props)
const colorMap = ['text-task-easy', 'text-task-medium', 'text-task-hard']
const colorMapNeg = ['text-task-easy-neg', 'text-task-medium-neg', 'text-task-hard-neg']

const diff3 = computed(() => ~~((difficulty.value - 1) * 3 / 5) + 1)

const diffText = computed(() => {
    return ['● '.repeat(diff3.value), '● '.repeat(3 - diff3.value)]
})

const diffColor = computed(() => {
    const index = diff3.value - 1
    return negative.value ? colorMapNeg[index] : colorMap[index]
})
</script>

<template>
<span :class="diffColor">{{diffText[0]}}</span>
<span :class="negative ? 'text-task-neutral-neg' : 'text-task-neutral'">{{ diffText[1] }}</span>
</template>