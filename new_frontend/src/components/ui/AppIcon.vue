<template>
    <svg :style="{ width: size, height: size }" :class="fillClass">
        <use :href="`/assets/sprite.svg#${name}-icon`"></use>
    </svg>
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    size: {
        type: [String, Number],
        default: '24px'
    },
    negative: {
        type: Boolean,
        default: false
    }
})

const { negative } = toRefs(props)
const fillClass = computed(() => {
    return negative.value ? 'fill-text-neg text-text-neg' : 'fill-current'
})
</script>
