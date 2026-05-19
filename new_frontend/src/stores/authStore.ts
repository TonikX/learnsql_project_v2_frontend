import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { authService } from '@/services/authService'
import { useUserStore } from '@/stores/userStore'
import type { AccessTokenResponse, LoginRequest, RegisterRequest, RegisterResponse, SocialAuthProvider, TokenPair } from '@/types/userTypes'

const accessStorageKey = 'access_token'
const refreshStorageKey = 'refresh_token'

function getStoredToken(key: string): string | null {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem(key)
}

export const useAuthStore = defineStore('auth', () => {
    const accessToken = ref<string | null>(getStoredToken(accessStorageKey))
    const refreshToken = ref<string | null>(getStoredToken(refreshStorageKey))
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const isAuth = computed(() => !!accessToken.value)

    function setTokens(tokens: TokenPair | AccessTokenResponse) {
        accessToken.value = tokens.access

        if (typeof window !== 'undefined') {
            window.localStorage.setItem(accessStorageKey, tokens.access)
        }

        if ('refresh' in tokens) {
            refreshToken.value = tokens.refresh

            if (typeof window !== 'undefined') {
                window.localStorage.setItem(refreshStorageKey, tokens.refresh)
            }
        }
    }

    function clearTokens() {
        accessToken.value = null
        refreshToken.value = null

        if (typeof window !== 'undefined') {
            window.localStorage.removeItem(accessStorageKey)
            window.localStorage.removeItem(refreshStorageKey)
        }
    }

    function clearError() {
        error.value = null
    }

    async function login(payload: LoginRequest) {
        isLoading.value = true
        clearError()

        try {
            const tokens = await authService.login(payload)
            setTokens(tokens)
            return tokens
        } catch (unknownError) {
            error.value = 'Неверный логин или пароль'
            throw unknownError
        } finally {
            isLoading.value = false
        }
    }

    async function register(payload: RegisterRequest): Promise<RegisterResponse> {
        isLoading.value = true
        clearError()

        try {
            return await authService.register(payload)
        } catch (unknownError) {
            error.value = 'Не удалось зарегистрироваться. Проверьте данные и попробуйте ещё раз'
            throw unknownError
        } finally {
            isLoading.value = false
        }
    }

    async function socialLogin(provider: SocialAuthProvider, providerAccessToken: string) {
        isLoading.value = true
        clearError()

        try {
            const response = await authService.socialLogin({
                provider,
                access_token: providerAccessToken,
            })
            setTokens(response)

            if (response.user) {
                useUserStore().setUser(response.user)
            }

            return response
        } catch (unknownError) {
            error.value = 'Не удалось войти через выбранный сервис'
            throw unknownError
        } finally {
            isLoading.value = false
        }
    }

    async function refreshAccessToken() {
        if (!refreshToken.value) return null

        const token = await authService.refresh({ refresh: refreshToken.value })
        setTokens(token)
        return token
    }

    async function verifyToken() {
        if (!accessToken.value) return false

        await authService.verify({ token: accessToken.value })
        return true
    }

    function logout() {
        clearTokens()
        useUserStore().clearUser()
    }

    return {
        accessToken,
        refreshToken,
        isAuth,
        isLoading,
        error,
        login,
        register,
        socialLogin,
        refreshAccessToken,
        verifyToken,
        logout,
        setTokens,
        clearTokens,
        clearError,
    }
})
