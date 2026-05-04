<script setup lang="ts">
import AppContainer from '@/components/layout/AppContainer.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'

const auth = useAuthStore()
const userStore = useUserStore()

const username = ref('')
const password = ref('')

function submit() {
    auth.setToken('mock-token')
    userStore.setMockUser()
}
</script>

<template>
    <AppContainer as="section" class="py-16">
        <div class="mx-auto max-w-md">
            <AppCard padding="lg">
                <h1 class="text-2xl font-extrabold text-app-text">Вход</h1>
                <p class="mt-2 text-sm font-semibold text-app-muted">
                    Войдите, чтобы продолжить обучение.
                </p>

                <div class="mt-6 space-y-4">
                    <AppInput v-model="username" label="Логин или Email" placeholder="user@learnsql.ru" />
                    <AppInput v-model="password" label="Пароль" type="password" placeholder="••••••••" />
                    <AppButton class="w-full" @click="submit">Войти</AppButton>
                </div>

                <div class="mt-6 text-sm font-semibold text-app-muted">
                    Нет аккаунта?
                    <RouterLink to="/register" class="text-primary-action hover:underline">
                        Регистрация
                    </RouterLink>
                </div>
            </AppCard>
        </div>
    </AppContainer>
</template>
