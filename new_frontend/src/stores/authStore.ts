import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { BadRequestError, ConnectionError, ServerError, extractApiErrorMessage, getApiErrorStatus } from '@/errors/network'
import { authService } from '@/services/authService'
import { useUserStore } from '@/stores/userStore'
import type { AccessTokenResponse, LoginRequest, RegisterRequest, RegisterResponse, SocialAuthProvider, TokenPair } from '@/types/userTypes'
import { isPhoneBackendErrorMessage, phoneValidationErrorMessage } from '@/utils/phoneValidation'

const accessStorageKey = 'access_token'
const refreshStorageKey = 'refresh_token'
type LoginErrorStatus = 'auth' | 'validation' | 'connection' | 'server' | 'unknown'

function getStoredToken(key: string): string | null {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem(key)
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null
}

function isNetworkAuthError(error: unknown): boolean {
    if (!isRecord(error)) return false
    if ('response' in error && error.response) return false

    const code = typeof error.code === 'string' ? error.code : ''
    const message = error instanceof Error
        ? error.message
        : typeof error.message === 'string'
            ? error.message
            : ''

    return code === 'ERR_NETWORK' ||
        code === 'ECONNABORTED' ||
        message === 'Network Error' ||
        message.toLowerCase().includes('timeout') ||
        Boolean(error.request)
}

function getLoginErrorDetails(error: unknown): { status: LoginErrorStatus; message: string } {
    if (error instanceof ConnectionError || isNetworkAuthError(error)) {
        return { status: 'connection', message: 'Сервис временно недоступен. Попробуйте позже' }
    }

    if (error instanceof ServerError) {
        return { status: 'server', message: 'Ошибка сервера, попробуйте позже' }
    }

    if (error instanceof BadRequestError) {
        return { status: 'validation', message: 'Заполните логин и пароль' }
    }

    const status = getApiErrorStatus(error)

    if (status === 401) {
        return { status: 'auth', message: 'Неверный логин или пароль' }
    }

    if (status === 400) {
        return { status: 'validation', message: 'Заполните логин и пароль' }
    }

    if (typeof status === 'number' && status >= 500) {
        return { status: 'server', message: 'Ошибка сервера, попробуйте позже' }
    }

    return { status: 'unknown', message: 'Произошла ошибка авторизации' }
}

function stripRegisterFieldPrefix(message: string): string {
    const firstMessage = message.split(';')[0] ?? ''
    return firstMessage.replace(/^(username|email|password|group_number|tel|first_name|last_name):\s*/i, '').trim()
}

function getRegisterValidationMessage(error: unknown): string {
    const message = extractApiErrorMessage(error, 'Проверьте данные регистрации')
    const normalizedMessage = message.toLowerCase()
    const messageWithoutField = stripRegisterFieldPrefix(message)

    if (isPhoneBackendErrorMessage(message)) {
        return phoneValidationErrorMessage
    }

    if (normalizedMessage.includes('username') && (
        normalizedMessage.includes('already exists') ||
        normalizedMessage.includes('unique') ||
        normalizedMessage.includes('уже существует')
    )) {
        return 'Пользователь с таким логином уже существует'
    }

    if (normalizedMessage.includes('email') && (
        normalizedMessage.includes('already exists') ||
        normalizedMessage.includes('unique') ||
        normalizedMessage.includes('уже существует')
    )) {
        return 'Пользователь с такой почтой уже существует'
    }

    if (normalizedMessage.includes('email') && (
        normalizedMessage.includes('valid') ||
        normalizedMessage.includes('коррект')
    )) {
        return 'Введите корректную почту'
    }

    if (normalizedMessage.includes('group_number') || normalizedMessage.includes('invalid pk')) {
        return 'Выберите корректную группу'
    }

    if (normalizedMessage.startsWith('username:')) {
        return messageWithoutField || 'Проверьте логин'
    }

    if (normalizedMessage.startsWith('email:')) {
        return messageWithoutField || 'Проверьте почту'
    }

    if (normalizedMessage.startsWith('password:')) {
        return messageWithoutField || 'Проверьте пароль'
    }

    if (normalizedMessage.startsWith('group_number:')) {
        return messageWithoutField || 'Выберите корректную группу'
    }

    if (/^(tel|first_name|last_name):/i.test(message)) {
        return messageWithoutField || 'Проверьте данные регистрации'
    }

    return message
}

function getRegisterErrorMessage(error: unknown): string {
    if (error instanceof ConnectionError || isNetworkAuthError(error)) {
        return 'Сервис временно недоступен. Попробуйте позже'
    }

    if (error instanceof ServerError) {
        return 'Ошибка сервера, попробуйте позже'
    }

    if (error instanceof BadRequestError) {
        return getRegisterValidationMessage(error)
    }

    const status = getApiErrorStatus(error)

    if (status === 400) {
        return getRegisterValidationMessage(error)
    }

    if (typeof status === 'number' && status >= 500) {
        return 'Ошибка сервера, попробуйте позже'
    }

    return 'Не удалось зарегистрироваться'
}

export const useAuthStore = defineStore('auth', () => {
    const accessToken = ref<string | null>(getStoredToken(accessStorageKey))
    const refreshToken = ref<string | null>(getStoredToken(refreshStorageKey))
    const isLoading = ref(false)
    const error = ref<string | null>(null)
    const loginErrorStatus = ref<LoginErrorStatus | null>(null)

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
        loginErrorStatus.value = null
    }

    async function login(payload: LoginRequest) {
        isLoading.value = true
        clearError()

        try {
            const tokens = await authService.login(payload)
            setTokens(tokens)
            return tokens
        } catch (unknownError) {
            const loginError = getLoginErrorDetails(unknownError)
            error.value = loginError.message
            loginErrorStatus.value = loginError.status
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
            error.value = getRegisterErrorMessage(unknownError)
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

    async function socialCodeLogin(provider: 'github', code: string, redirectUri: string) {
        isLoading.value = true
        clearError()

        try {
            const response = await authService.socialCodeLogin({
                provider,
                code,
                redirect_uri: redirectUri,
            })
            setTokens(response)

            if (response.user) {
                useUserStore().setUser(response.user)
            }

            return response
        } catch (unknownError) {
            error.value = 'Не удалось войти через GitHub'
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
        loginErrorStatus,
        login,
        register,
        socialLogin,
        socialCodeLogin,
        refreshAccessToken,
        verifyToken,
        logout,
        setTokens,
        clearTokens,
        clearError,
    }
})
