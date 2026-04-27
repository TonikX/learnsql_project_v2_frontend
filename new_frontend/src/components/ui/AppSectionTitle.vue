<script setup lang="ts">
import IconTitle from './IconTitle.vue';

const props = withDefaults(defineProps<{
    title: string
    subtitle?: string
    icon?: string
    align?: 'left' | 'center'
}>(), {
    align: 'left',
})

</script>

<template>
<div>
    <IconTitle 
        :title="title" 
        :subtitle="subtitle"
        :icon="icon"
        :align="align"
    >
    </IconTitle>
        
    <slot /> 
</div>
</template>