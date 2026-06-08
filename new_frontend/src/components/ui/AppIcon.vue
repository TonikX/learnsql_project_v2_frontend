<template>
<component class="flex items-center gap-1" :aria-label="ariaLabelText">
    <svg :style="{ width: size, height: size }" :class="color">
        <title>{{ title }}</title>
        <use :href="`/assets/sprite.svg#${name}-icon`"></use>
    </svg>
    <slot />
</component>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

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
        default: "fill-current"
    },
    title: {
        type: String,
        default: ""
    }
})

const slots = useSlots()
const hasSlot = computed(() => !!slots.default)
const ariaLabelText = computed(() => hasSlot.value ? undefined : props.title)
</script>
