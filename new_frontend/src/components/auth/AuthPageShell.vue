<script setup lang="ts">
import AppContainer from '@/components/layout/AppContainer.vue'
import AuthInfoPanel from './AuthInfoPanel.vue'

defineProps<{
    variant: 'login' | 'register'
}>()
</script>

<template>
    <AppContainer as="section" class="py-6 sm:py-14 lg:py-[68px]">
        <div class="mx-auto grid max-w-[1600px] items-start gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1180px)_360px] xl:gap-16">
            <slot />
            <AuthInfoPanel :variant="variant" class="hidden lg:block" />
        </div>
    </AppContainer>
</template>
