<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthFieldRow from '@/components/auth/AuthFieldRow.vue'
import AuthPageShell from '@/components/auth/AuthPageShell.vue'
import AuthSqlCard from '@/components/auth/AuthSqlCard.vue'
import AuthSocialLogin from '@/components/auth/AuthSocialLogin.vue'
import AuthSubmitArea from '@/components/auth/AuthSubmitArea.vue'
import AuthTextInput from '@/components/auth/AuthTextInput.vue'
import {
    getGitHubAccessToken,
    getGoogleAccessToken,
    getSocialAuthErrorMessage,
    saveSocialRedirect,
    startYandexAccessTokenFlow,
} from '@/services/socialOAuthService'
import { useAuthStore } from '@/stores/authStore'
import type { SocialAuthProvider } from '@/types/userTypes'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const login = ref('')
const password = ref('')
const formError = ref('')
const socialError = ref('')
const socialLoadingProvider = ref<SocialAuthProvider | null>(null)
const formRef = ref<HTMLFormElement | null>(null)
let autofillSyncFrameId: number | undefined
let autofillSyncTimeoutId: number | undefined
const interactionSyncOptions: AddEventListenerOptions = { capture: true, passive: true }

const loginStatus = computed(() => {
    if (authStore.isLoading) return 'checking_credentials'
    if (authStore.loginErrorStatus === 'connection') return 'connection_error'
    if (authStore.loginErrorStatus === 'server') return 'server_error'
    if (authStore.loginErrorStatus === 'validation') return 'waiting_for_input'
    if (authStore.loginErrorStatus) return 'auth_failed'
    if (!login.value.trim() || !password.value) return 'waiting_for_input'
    return 'ready_to_login'
})

function getRedirectTo() {
    const redirectTo = typeof route.query.redirect === 'string' ? route.query.redirect : null

    return redirectTo?.startsWith('/') && !redirectTo.startsWith('//')
        ? redirectTo
        : '/'
}

function syncAutofilledCredentials() {
    const usernameInput = formRef.value?.querySelector<HTMLInputElement>('input[name="username"], input[autocomplete="username"]')
    const passwordInput = formRef.value?.querySelector<HTMLInputElement>('input[name="password"], input[autocomplete="current-password"]')

    if (!login.value && usernameInput?.value) {
        login.value = usernameInput.value
    }
    if (!password.value && passwordInput?.value) {
        password.value = passwordInput.value
    }
}

function clearAutofillSyncTimers() {
    if (autofillSyncFrameId !== undefined) {
        window.cancelAnimationFrame(autofillSyncFrameId)
        autofillSyncFrameId = undefined
    }

    if (autofillSyncTimeoutId !== undefined) {
        window.clearTimeout(autofillSyncTimeoutId)
        autofillSyncTimeoutId = undefined
    }
}

async function scheduleAutofillSync() {
    clearAutofillSyncTimers()
    await nextTick()
    syncAutofilledCredentials()
    autofillSyncFrameId = window.requestAnimationFrame(syncAutofilledCredentials)
    autofillSyncTimeoutId = window.setTimeout(syncAutofilledCredentials, 500)
}

function handlePageShow() {
    void scheduleAutofillSync()
}

function handleCredentialFormEvent() {
    syncAutofilledCredentials()
}

function handleCredentialInteraction() {
    syncAutofilledCredentials()
}

async function submit() {
    syncAutofilledCredentials()
    formError.value = ''
    socialError.value = ''

    if (!login.value.trim() || !password.value) {
        formError.value = 'Введите логин и пароль'
        return
    }

    try {
        await authStore.login({
            username: login.value.trim(),
            password: password.value,
        })

        await router.push(getRedirectTo())
    } catch {
        formError.value = authStore.error ?? 'Не удалось войти. Попробуйте ещё раз'
    }
}

watch([login, password], () => {
    if (formError.value) {
        formError.value = ''
    }
    if (authStore.loginErrorStatus) {
        authStore.clearError()
    }
})

async function handleSocialLogin(provider: SocialAuthProvider) {
    socialError.value = ''
    formError.value = ''
    socialLoadingProvider.value = provider
    let isRedirectingToProvider = false

    try {
        if (provider === 'github') {
            getGitHubAccessToken()
            return
        }

        if (provider === 'yandex') {
            saveSocialRedirect(getRedirectTo())
            startYandexAccessTokenFlow()
            isRedirectingToProvider = true
            return
        }

        const providerAccessToken = await getGoogleAccessToken()
        await authStore.socialLogin(provider, providerAccessToken)
        await router.push(getRedirectTo())
    } catch (unknownError) {
        socialError.value = getSocialAuthErrorMessage(provider, unknownError)
    } finally {
        if (!isRedirectingToProvider) {
            socialLoadingProvider.value = null
        }
    }
}

onMounted(() => {
    void scheduleAutofillSync()
    window.addEventListener('pageshow', handlePageShow)
    window.addEventListener('pointerdown', handleCredentialInteraction, interactionSyncOptions)
    window.addEventListener('keydown', handleCredentialInteraction, interactionSyncOptions)
    formRef.value?.addEventListener('focusin', handleCredentialFormEvent)
    formRef.value?.addEventListener('input', handleCredentialFormEvent)
    formRef.value?.addEventListener('change', handleCredentialFormEvent)
})

onBeforeUnmount(() => {
    window.removeEventListener('pageshow', handlePageShow)
    window.removeEventListener('pointerdown', handleCredentialInteraction, interactionSyncOptions)
    window.removeEventListener('keydown', handleCredentialInteraction, interactionSyncOptions)
    formRef.value?.removeEventListener('focusin', handleCredentialFormEvent)
    formRef.value?.removeEventListener('input', handleCredentialFormEvent)
    formRef.value?.removeEventListener('change', handleCredentialFormEvent)
    clearAutofillSyncTimers()
})
</script>

<template>
    <AuthPageShell variant="login">
        <AuthSqlCard title="Вход в LearnSQL" command="SELECT users FROM learnsql;">
            <form ref="formRef" @submit.prevent="submit">
                <div class="overflow-hidden rounded-[10px] border border-auth-border bg-auth-table">
                    <div class="hidden border-b border-auth-border min-[768px]:grid min-[768px]:grid-cols-[260px_minmax(0,1fr)]">
                        <div class="px-4 py-3 text-[15px] text-app-text sm:border-r sm:border-auth-border sm:px-6 sm:py-4 sm:text-[17px]">Поле</div>
                        <div class="px-4 py-3 text-[15px] text-app-text sm:px-6 sm:py-4 sm:text-[17px]">Значение</div>
                    </div>

                    <AuthFieldRow label="Логин" db-type="VARCHAR">
                        <AuthTextInput v-model="login" name="username" autocomplete="username" />
                    </AuthFieldRow>

                    <AuthFieldRow label="Пароль" db-type="TEXT">
                        <AuthTextInput v-model="password" name="password" type="password" autocomplete="current-password" />
                    </AuthFieldRow>

                    <AuthFieldRow label="Статус" db-type="TEXT">
                        <span class="w-full max-w-full break-words rounded-[11px] border border-auth-border bg-auth-input px-4 py-2 text-[14px] leading-snug text-app-text min-[768px]:w-auto min-[768px]:px-5 min-[768px]:text-[16px] min-[1280px]:whitespace-nowrap min-[1280px]:text-[17px]">
                            {{ loginStatus }}
                        </span>
                    </AuthFieldRow>
                </div>

                <AuthSubmitArea
                    action="SELECT"
                    button-type="submit"
                    :loading="authStore.isLoading"
                    :error="formError"
                    link-prefix="Нет аккаунта?"
                    link-text="регистрация"
                    link-to="/register"
                    hint=""
                />

                <AuthSocialLogin
                    :error="socialError"
                    :loading-provider="socialLoadingProvider"
                    @select="handleSocialLogin"
                />
            </form>
        </AuthSqlCard>
    </AuthPageShell>
</template>
