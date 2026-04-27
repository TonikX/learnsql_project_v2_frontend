<script setup lang="ts">
import AppContainer from '@/components/layout/AppContainer.vue';
</script>

<template>
<AppContainer class="size-full flex flex-col justify-center items-center">
    <p class="text-3xl text-danger">404 Not Found</p>
    <RouterLink to="/" class="hover:underline">Вернуться на главную</RouterLink>
</AppContainer>
</template>