<template>
    <svg :style="{ width: size, height: size }" class="fill-text-neg">
        <use :href="`/assets/sprite.svg#${name}-icon`"></use>
    </svg>
</template>

<script setup lang="ts">
defineProps({
    name: {
        type: String,
        required: true
    },
    size: {
        type: [String, Number],
        default: '24px'
    },
})
</script>