import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'

const apiUrl: string = import.meta.env.BACKEND_API_URL ?? 'localhost:8000'

const apiClient: AxiosInstance = axios.create({
    baseURL: apiUrl
})

// добавляем токен к запросу
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

export default apiClient
