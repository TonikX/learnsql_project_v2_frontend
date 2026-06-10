<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLoader from '@/components/ui/AppLoader.vue'
import {
    consumeSocialRedirect,
    getGitHubRedirectUri,
    getSocialAuthErrorMessage,
    parseGitHubCodeCallback,
    parseYandexAccessToken,
} from '@/services/socialOAuthService'
import { useAuthStore } from '@/stores/authStore'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const error = ref('')

onMounted(async () => {
    const provider = route.params.provider === 'github' ? 'github' : 'yandex'

    try {
        if (route.params.provider === 'github') {
            const callbackSearch = window.location.search
            window.history.replaceState(null, document.title, window.location.pathname)

            const code = parseGitHubCodeCallback(callbackSearch)
            await authStore.socialCodeLogin('github', code, getGitHubRedirectUri())
            await router.replace(consumeSocialRedirect())
            return
        }

        if (route.params.provider !== 'yandex') {
            throw new Error('Сервис входа временно недоступен')
        }

        const callbackHash = window.location.hash
        window.history.replaceState(
            null,
            document.title,
            window.location.pathname + window.location.search,
        )

        const providerAccessToken = parseYandexAccessToken(callbackHash)
        await authStore.socialLogin('yandex', providerAccessToken)
        await router.replace(consumeSocialRedirect())
    } catch (unknownError) {
        error.value = getSocialAuthErrorMessage(provider, unknownError)
    }
})
</script>

<template>
    <main class="flex min-h-[60vh] items-center justify-center bg-page px-4 py-12 font-mono text-app-text">
        <section class="w-full max-w-[520px] rounded-[10px] border border-auth-border bg-auth-surface-gradient p-8 text-center">
            <h1 class="text-[24px]">Вход через внешний сервис</h1>
            <p v-if="!error" class="mt-4 text-[16px] text-app-text">
                <AppLoader text="Завершаем авторизацию" mode="inline" />
            </p>
            <div v-else>
                <p class="mt-4 rounded-[10px] border border-auth-border bg-auth-input px-4 py-3 text-[15px] text-danger">
                    {{ error }}
                </p>
                <RouterLink class="mt-6 inline-flex text-primary-action hover:underline" to="/login">
                    Вернуться ко входу
                </RouterLink>
            </div>
        </section>
    </main>
</template>
