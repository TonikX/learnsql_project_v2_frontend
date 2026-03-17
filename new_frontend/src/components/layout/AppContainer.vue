<script setup lang="ts">
const props = withDefaults(defineProps<{ as?: string }>(), { as: 'div' })
</script>

<template>
    <component :is="as" class="app-container">
        <slot />
    </component>
</template>