<script setup lang="ts">
import AppContainer from './AppContainer.vue'
import PublicNav from './PublicNav.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()
</script>

<template>
    <header class="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <AppContainer class="flex h-20 items-center justify-between">
        <RouterLink to="/" class="text-lg font-extrabold text-slate-900">
            LearnSQL
        </RouterLink>

        <PublicNav />

        <div class="flex items-center gap-2">
            <template v-if="auth.isAuth">
            <AppButton variant="secondary" to="/courses">Мои курсы</AppButton>
            </template>

            <template v-else>
            <AppButton variant="secondary" to="/login">Войти</AppButton>
            <AppButton to="/register">Начать бесплатно</AppButton>
            </template>
        </div>
        </AppContainer>
    </header>
</template>