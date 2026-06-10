<script setup lang="ts">
import AppContainer from '@/components/layout/AppContainer.vue'

const props = defineProps({
    link: {
        type: String,
        default: '/',
    },
    description: {
        type: String
    },
    action: {
        type: String
    }
})
</script>

<template>
<AppContainer class="size-full flex flex-col justify-center items-center">
    <p class="text-3xl text-danger">{{ props.description }}</p>
    <a :href="props.link" class="hover:underline">{{ props.action }}</a>
</AppContainer>
</template>