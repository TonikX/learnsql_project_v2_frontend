import { BadRequestError, ConnectionError, NotFoundError, ServerError, extractApiErrorMessage } from '@/errors/network'
import axios, { AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import router from '@/router'

const apiUrl: string = import.meta.env.VITE_BACKEND_API_URL ?? 'http://localhost:8000'
const accessStorageKey = 'access_token'
const refreshStorageKey = 'refresh_token'

type RetriableRequestConfig = InternalAxiosRequestConfig & {
    _retry?: boolean
}

const publicEndpoints = new Set([
    '/api/token/',
    '/api/token/refresh/',
    '/api/token/verify/',
    '/api/register/',
    '/api/social_auth_v2/token/',
    '/api/social_auth_v2/code/',
    '/api/student-groups/',
    '/api/student-groups/get_choise_values/',
])

function isPublicEndpoint(url?: string): boolean {
    if (!url) return false

    try {
        const path = url.startsWith('http')
            ? new URL(url).pathname
            : (url.split('?')[0] ?? '')

        return publicEndpoints.has(path)
    } catch {
        return false
    }
}

const apiClient: AxiosInstance = axios.create({
    baseURL: apiUrl,
})

const refreshClient: AxiosInstance = axios.create({
    baseURL: apiUrl,
})

let refreshPromise: Promise<string> | null = null

function getStoredToken(key: string): string | null {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem(key)
}

function setStoredAccessToken(token: string) {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(accessStorageKey, token)
    }
}

async function syncAuthStoreAccessToken(token: string) {
    const { useAuthStore } = await import('@/stores/authStore')
    useAuthStore().setTokens({ access: token })
}

async function logoutAfterRefreshFailure() {
    const { useAuthStore } = await import('@/stores/authStore')
    useAuthStore().logout()

    if (typeof window === 'undefined') return

    const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`
    const redirect = currentPath && currentPath !== '/login'
        ? `?redirect=${encodeURIComponent(currentPath)}`
        : ''

    window.location.assign(`/login${redirect}`)
}

async function refreshAccessToken(): Promise<string> {
    if (!refreshPromise) {
        refreshPromise = (async () => {
            const refresh = getStoredToken(refreshStorageKey)
            if (!refresh) {
                throw new Error('Missing refresh token')
            }

            const response = await refreshClient.post<{ access: string }>('/api/token/refresh/', {
                refresh,
            })

            setStoredAccessToken(response.data.access)
            await syncAuthStoreAccessToken(response.data.access)
            return response.data.access
        })().finally(() => {
            refreshPromise = null
        })
    }

    return refreshPromise
}

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getStoredToken(accessStorageKey)

        if (token && !isPublicEndpoint(config.url)) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error: AxiosError) => Promise.reject(error),
)

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const isNetworkError =
            !error.response ||
            error.code === 'ERR_NETWORK' ||
            error.message === 'Network Error'

        if (isNetworkError) {
            return Promise.reject(new ConnectionError('Сервис временно недоступен. Попробуйте позже'))
        }

        const originalRequest = error.config as RetriableRequestConfig | undefined
        const shouldRefresh =
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !isPublicEndpoint(originalRequest.url)

        if (shouldRefresh) {
            originalRequest._retry = true

            try {
                const access = await refreshAccessToken()
                originalRequest.headers.Authorization = `Bearer ${access}`
                return apiClient(originalRequest)
            } catch (refreshError) {
                await logoutAfterRefreshFailure()
                return Promise.reject(refreshError)
            }
        }

        const responseMessage = extractApiErrorMessage(error, 'Не удалось выполнить запрос')

        switch (error.response?.status) {
        case 400:
            return Promise.reject(new BadRequestError(responseMessage))
        case 404:
            return Promise.reject(new NotFoundError(responseMessage))
        case 500:
            return Promise.reject(new ServerError(responseMessage))
        default:
            return Promise.reject(error)
        }
    },
)

export default apiClient
