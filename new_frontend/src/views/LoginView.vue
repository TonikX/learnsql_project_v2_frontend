<script setup lang="ts">
import { ref } from 'vue'
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

function getRedirectTo() {
    const redirectTo = typeof route.query.redirect === 'string' ? route.query.redirect : null

    return redirectTo?.startsWith('/') && !redirectTo.startsWith('//')
        ? redirectTo
        : '/'
}

async function submit() {
    formError.value = ''
    socialError.value = ''

    if (!login.value || !password.value) {
        formError.value = 'Введите логин и пароль'
        return
    }

    try {
        await authStore.login({
            username: login.value,
            password: password.value,
        })

        await router.push(getRedirectTo())
    } catch {
        formError.value = authStore.error ?? 'Не удалось войти. Попробуйте ещё раз'
    }
}

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
</script>

<template>
    <AuthPageShell variant="login">
        <AuthSqlCard title="Вход в LearnSQL" command="SELECT users FROM learnsql;">
            <form @submit.prevent="submit">
                <div class="overflow-hidden rounded-[10px] border border-auth-border bg-auth-table">
                    <div class="grid border-b border-auth-border sm:grid-cols-[260px_minmax(0,1fr)]">
                        <div class="px-4 py-3 text-[15px] text-app-text sm:border-r sm:border-auth-border sm:px-6 sm:py-4 sm:text-[17px]">Поле</div>
                        <div class="px-4 py-3 text-[15px] text-app-text sm:px-6 sm:py-4 sm:text-[17px]">Значение</div>
                    </div>

                    <AuthFieldRow label="Почта" db-type="VARCHAR">
                        <AuthTextInput v-model="login" autocomplete="username" />
                    </AuthFieldRow>

                    <AuthFieldRow label="Пароль" db-type="TEXT">
                        <AuthTextInput v-model="password" type="password" autocomplete="current-password" />
                    </AuthFieldRow>

                    <AuthFieldRow label="Статус" db-type="TEXT">
                        <span class="rounded-[11px] border border-auth-border bg-auth-input px-5 py-2 text-[17px] text-app-text">
                            ready_to_login
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
