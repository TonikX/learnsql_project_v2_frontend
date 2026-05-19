<template>
<component class="flex items-center gap-1">
    <svg :style="{ width: size, height: size }" :class="color">
        <use :href="`/assets/sprite.svg#${name}-icon`"></use>
    </svg>
    <slot />
</component>
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
    color: {
        type: String,
        default: "fill-text-main"
    }
})

// const { negative } = toRefs(props)
// const fillClass = computed(() => {
//     return negative.value ? 'fill-text-neg text-text-neg' : 'fill-current'
// })
</script>
