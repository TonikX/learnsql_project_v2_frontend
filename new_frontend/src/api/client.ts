import { BadRequestError, NotFoundError, ServerError, ConnectionError } from '@/errors/network'
import axios, { AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import router from '@/router'

const apiUrl: string = import.meta.env.BACKEND_API_URL ?? 'http://localhost:8000'

const apiClient: AxiosInstance = axios.create({
    baseURL: apiUrl
})

// add access token to request
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('access_token')
        console.log("SET access token:", token)

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error: AxiosError) => Promise.reject(error)
)

// handle response errors
apiClient.interceptors.response.use(
    (response: AxiosResponse) => { return response },
    (error: AxiosError) => {
        const isNetworkError = !error.response || error.code === "ERR_NETWORK" || error.message === "Network Error"

        if (isNetworkError) 
            return Promise.reject(new ConnectionError(`Connection lost: ${error.request}`))

        const response = error.response?.data

        switch (error.response?.status) {
        case 401:
            router.replace({ name: 'login' })
            break
        case 400:
            return Promise.reject(new BadRequestError(`Bad request: ${response}`)) 
        case 404:
            return Promise.reject(new NotFoundError(`Resourse not found: ${response}`))
        case 500:
            return Promise.reject(new ServerError(`Server error: ${response}`))
        }

        return Promise.reject(error)
    }
)

export default apiClient
