import axios, {
    AxiosError,
    type AxiosInstance,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from 'axios'

import {
    BadRequestError,
    ConnectionError,
    NotFoundError,
    ServerError,
} from '@/errors/network'

const apiUrl: string = import.meta.env.VITE_BACKEND_API_URL ?? 'http://localhost:8000'

const publicEndpoints = new Set([
    '/api/token/',
    '/api/token/refresh/',
    '/api/token/verify/',
    '/api/register/',
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

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = typeof window === 'undefined'
            ? null
            : window.localStorage.getItem('access_token')

        if (token && !isPublicEndpoint(config.url)) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error: AxiosError) => Promise.reject(error),
)

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        const isNetworkError =
            !error.response ||
            error.code === 'ERR_NETWORK' ||
            error.message === 'Network Error'

        if (isNetworkError) {
            return Promise.reject(
                new ConnectionError('Не удалось подключиться к серверу. Проверьте соединение.'),
            )
        }

        const responseData = error.response?.data

        switch (error.response?.status) {
            case 400:
                return Promise.reject(
                    new BadRequestError(`Некорректный запрос: ${JSON.stringify(responseData)}`),
                )

            case 404:
                return Promise.reject(
                    new NotFoundError(`Ресурс не найден: ${JSON.stringify(responseData)}`),
                )

            case 500:
                return Promise.reject(
                    new ServerError('Ошибка сервера. Попробуйте позже.'),
                )

            default:
                return Promise.reject(error)
        }
    },
)

export default apiClient