<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'
import AppContainer from '@/components/layout/AppContainer.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import { extractApiErrorMessage, getApiErrorStatus } from '@/errors/network'
import feedbackService from '@/services/feedbackService'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const subject = ref('')
const message = ref('')
const validationError = ref('')
const submitError = ref('')
const successMessage = ref('')
const isSubmitting = ref(false)

const isSubmitDisabled = computed(() => (
    isSubmitting.value ||
    !subject.value.trim() ||
    !message.value.trim()
))

const loginRedirect = '/login?redirect=/feedback'

function validateForm() {
    if (!subject.value.trim() || !message.value.trim()) {
        validationError.value = 'Заполните тему и текст сообщения'
        return false
    }

    validationError.value = ''
    return true
}

function getFeedbackErrorMessage(error: unknown) {
    if (getApiErrorStatus(error) === 401) {
        return 'Для отправки обращения нужно войти в аккаунт'
    }

    return extractApiErrorMessage(error, 'Не удалось отправить сообщение. Попробуйте позже')
}

async function submitFeedback() {
    submitError.value = ''
    successMessage.value = ''

    if (!validateForm()) return

    isSubmitting.value = true
    try {
        await feedbackService.sendFeedback({
            subject: subject.value.trim(),
            message: message.value.trim(),
        })
        subject.value = ''
        message.value = ''
        successMessage.value = 'Сообщение отправлено'
    } catch (error) {
        submitError.value = getFeedbackErrorMessage(error)
    } finally {
        isSubmitting.value = false
    }
}

watch([subject, message], () => {
    validationError.value = ''
    submitError.value = ''
    successMessage.value = ''
})
</script>

<template>
    <main class="min-h-full bg-page py-10 font-mono text-app-text sm:py-14">
        <AppContainer class="space-y-8">
            <header class="max-w-4xl space-y-3">
                <h1 class="text-[30px] font-bold leading-tight sm:text-[40px]">
                    &gt;_ Обратная связь
                </h1>
                <p class="max-w-3xl text-[15px] leading-7 text-app-text sm:text-[17px]">
                    Для улучшения качества сервиса вы можете отправить нам пожелания и рекомендации.
                </p>
            </header>

            <section
                v-if="!authStore.isAuth"
                class="max-w-3xl rounded-[8px] border border-app-border bg-card p-5 shadow-card sm:p-6"
            >
                <h2 class="text-[20px] font-bold leading-snug">
                    Требуется вход в аккаунт
                </h2>
                <p class="mt-3 text-[15px] leading-7 text-app-muted sm:text-[17px]">
                    Отправка обращения доступна авторизованным пользователям. После входа вы сможете вернуться к форме обратной связи.
                </p>
                <AppButton :to="loginRedirect" class="mt-6">
                    Войти
                </AppButton>
            </section>

            <form
                v-else
                class="max-w-3xl rounded-[8px] border border-app-border bg-card p-5 shadow-card sm:p-6"
                @submit.prevent="submitFeedback"
            >
                <div class="space-y-5">
                    <label class="block">
                        <span class="mb-2 block text-[15px] font-bold">Тема</span>
                        <input
                            v-model="subject"
                            type="text"
                            maxlength="300"
                            class="w-full rounded-[8px] border border-app-border bg-auth-input px-4 py-3 text-[15px] text-app-text outline-none transition focus:border-primary-action"
                            placeholder="Например: вопрос по заданию"
                            autocomplete="off"
                            :disabled="isSubmitting"
                        />
                    </label>

                    <label class="block">
                        <span class="mb-2 block text-[15px] font-bold">Сообщение</span>
                        <textarea
                            v-model="message"
                            rows="7"
                            class="w-full resize-y rounded-[8px] border border-app-border bg-auth-input px-4 py-3 text-[15px] text-app-text outline-none transition focus:border-primary-action"
                            placeholder="Опишите вопрос или предложение"
                            :disabled="isSubmitting"
                        ></textarea>
                    </label>
                </div>

                <p v-if="validationError" class="mt-4 text-[14px] text-danger">
                    {{ validationError }}
                </p>
                <p v-if="submitError" class="mt-4 text-[14px] text-danger">
                    {{ submitError }}
                </p>
                <p v-if="successMessage" class="mt-4 text-[14px] text-status-success-text">
                    {{ successMessage }}
                </p>

                <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <AppButton type="submit" :disabled="isSubmitDisabled" :loading="isSubmitting">
                        <AppLoader
                            v-if="isSubmitting"
                            text="Отправка"
                            mode="inline"
                            text-class="text-white"
                        />
                        <span v-else>Отправить</span>
                    </AppButton>

                    <RouterLink
                        to="/faq"
                        class="text-[14px] text-app-text transition hover:underline"
                    >
                        Перейти к FAQ
                    </RouterLink>
                </div>
            </form>
        </AppContainer>
    </main>
</template>
