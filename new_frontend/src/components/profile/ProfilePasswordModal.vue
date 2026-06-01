<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import type { ChangePasswordPayload } from '@/types/userTypes'

const props = defineProps<{
    open: boolean
    isSubmitting?: boolean
    error?: string
}>()

const emit = defineEmits<{
    close: []
    submit: [payload: ChangePasswordPayload]
}>()

const form = reactive({
    currentPassword: '',
    newPassword: '',
    repeatPassword: '',
})
const localError = ref('')
const isLocalSubmitting = ref(false)
const isSubmitLocked = computed(() => props.isSubmitting || isLocalSubmitting.value)

const inputClass = 'h-12 w-full rounded-[8px] border border-auth-border bg-auth-input px-4 text-[16px] text-app-text outline-none transition focus:border-primary-action'

function clearForm() {
    form.currentPassword = ''
    form.newPassword = ''
    form.repeatPassword = ''
    localError.value = ''
}

function close() {
    if (isSubmitLocked.value) return

    clearForm()
    emit('close')
}

function submit() {
    if (isSubmitLocked.value) return

    localError.value = ''

    if (!form.currentPassword) {
        localError.value = 'Введите текущий пароль'
        return
    }

    if (!form.newPassword) {
        localError.value = 'Введите новый пароль'
        return
    }

    if (!form.repeatPassword) {
        localError.value = 'Повторите новый пароль'
        return
    }

    if (form.newPassword !== form.repeatPassword) {
        localError.value = 'Новые пароли не совпадают'
        return
    }

    if (form.currentPassword === form.newPassword) {
        localError.value = 'Новый пароль должен отличаться от текущего'
        return
    }

    isLocalSubmitting.value = true

    emit('submit', {
        current_password: form.currentPassword,
        new_password: form.newPassword,
    })
}

watch(() => props.open, (isOpen) => {
    if (!isOpen) {
        isLocalSubmitting.value = false
        clearForm()
    }
})

watch(() => props.isSubmitting, (isSubmitting) => {
    if (!isSubmitting) {
        isLocalSubmitting.value = false
    }
})
</script>

<template>
    <teleport to="body">
        <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <button
                type="button"
                class="absolute inset-0 bg-black/50"
                aria-label="Закрыть окно смены пароля"
                :disabled="isSubmitLocked"
                @click="close"
            />

            <section class="relative max-h-[calc(100dvh-2rem)] w-full max-w-[520px] overflow-y-auto rounded-[10px] border border-app-border bg-profile-card-gradient p-6 text-app-text shadow-[0_18px_50px_rgba(0,0,0,0.18)] md:p-8">
                <div class="flex items-start justify-between gap-4">
                    <h2 class="text-[24px] font-bold leading-tight">Изменить пароль</h2>
                    <button
                        type="button"
                        class="rounded-[4px] px-2 text-[22px] leading-none text-app-text transition hover:opacity-70"
                        aria-label="Закрыть"
                        :disabled="isSubmitLocked"
                        @click="close"
                    >
                        ×
                    </button>
                </div>

                <form class="mt-6 space-y-5" @submit.prevent="submit">
                    <label class="block">
                        <span class="mb-2 block text-[15px] text-app-text">Текущий пароль</span>
                        <input
                            v-model="form.currentPassword"
                            :class="inputClass"
                            type="password"
                            autocomplete="current-password"
                        >
                    </label>

                    <label class="block">
                        <span class="mb-2 block text-[15px] text-app-text">Новый пароль</span>
                        <input
                            v-model="form.newPassword"
                            :class="inputClass"
                            type="password"
                            autocomplete="new-password"
                        >
                    </label>

                    <label class="block">
                        <span class="mb-2 block text-[15px] text-app-text">Повторите новый пароль</span>
                        <input
                            v-model="form.repeatPassword"
                            :class="inputClass"
                            type="password"
                            autocomplete="new-password"
                        >
                    </label>

                    <p v-if="localError || error" class="text-[14px] leading-relaxed text-danger">
                        {{ localError || error }}
                    </p>

                    <div class="flex justify-end pt-2">
                        <button
                            type="submit"
                            class="h-12 w-full rounded-[8px] bg-primary-gradient px-6 text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                            :disabled="isSubmitLocked"
                        >
                            <AppLoader v-if="isSubmitLocked" text="Сохранение" mode="inline" text-class="text-white" />
                            <span v-else>Сохранить</span>
                        </button>
                    </div>
                </form>
            </section>
        </div>
    </teleport>
</template>
