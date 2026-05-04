<script setup lang="ts">
import AppContainer from '@/components/layout/AppContainer.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { ref } from 'vue'
import type { CreateUserData } from '@/types/userTypes'

const form = ref<CreateUserData>({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    studyGroup: '',
    isu: '',
    password: '',
    passwordRepeat: '',
})

function submit() {
    alert('Регистрация (заглушка)')
}
</script>

<template>
    <AppContainer as="section" class="py-16">
        <div class="mx-auto max-w-md">
            <AppCard padding="lg">
                <h1 class="text-2xl font-extrabold text-app-text">Регистрация</h1>
                <p class="mt-2 text-sm font-semibold text-app-muted">
                    Создайте аккаунт и начните обучение.
                </p>

                <div class="mt-6 space-y-4">
                    <AppInput v-model="form.username" label="Username" placeholder="learnsql_user" />
                    <AppInput v-model="form.firstName" label="Имя" placeholder="Иван" />
                    <AppInput v-model="form.lastName" label="Фамилия" placeholder="Иванов" />
                    <AppInput v-model="form.email" label="Email" type="email" placeholder="user@learnsql.ru" />
                    <AppInput v-model="form.studyGroup" label="Учебная группа" placeholder="M3200" />
                    <AppInput v-model="form.isu" label="ISU" placeholder="123456" />
                    <AppInput v-model="form.password" label="Пароль" type="password" placeholder="••••••••" />
                    <AppInput v-model="form.passwordRepeat" label="Повторите пароль" type="password" placeholder="••••••••" />

                    <AppButton class="w-full" @click="submit">Создать аккаунт</AppButton>
                </div>

                <div class="mt-6 text-sm font-semibold text-app-muted">
                    Уже есть аккаунт?
                    <RouterLink to="/login" class="text-primary-action hover:underline">
                        Войти
                    </RouterLink>
                </div>
            </AppCard>
        </div>
    </AppContainer>
</template>
