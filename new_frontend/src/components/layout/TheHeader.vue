<script setup lang="ts">
import AppContainer from './AppContainer.vue'
import AppIcon from '../ui/AppIcon.vue'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'

const auth = useAuthStore()
const { isAuth } = storeToRefs(auth)

const negative_hover = "hover:text-text-main hover:bg-bg"
const btn_group = "flex items-center gap-2 text-lg text-text-neg font-medium"
</script>

<template>
    <header class="sticky top-0 z-40 border-slate-200 bg-bg-header">
        <AppContainer class="flex h-14 items-center justify-between">
            <div :class="btn_group">
                <RouterLink to="/" :class="negative_hover">[ LearnSQL ]</RouterLink>
                <RouterLink to="/courses" :class="negative_hover">[ Все курсы ]</RouterLink>
                <RouterLink v-if="isAuth" to="/courses">[ Мои курсы ]</RouterLink>
            </div>

            <div :class="btn_group">
                <RouterLink to="/" :class="negative_hover">[ Помощь ]</RouterLink>
                <RouterLink to="/" :class="negative_hover">[ О сайте ]</RouterLink>
                <template v-if="!isAuth"> 
                    <AppIcon name="profile" :size="32" color="fill-text-neg"></AppIcon>
                </template>
                <template v-else>
                    <RouterLink to="/login" :class="negative_hover">[ Войти -> ]</RouterLink> 
                </template>
            </div>
        </AppContainer>
    </header>
</template>
