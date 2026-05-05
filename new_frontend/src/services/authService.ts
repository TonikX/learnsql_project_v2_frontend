import apiClient from '@/api/client'
import type {
    AccessTokenResponse,
    LoginRequest,
    RefreshTokenRequest,
    RegisterRequest,
    RegisterResponse,
    TokenPair,
    VerifyTokenRequest,
} from '@/types/userTypes'

export const authService = {
    async login(payload: LoginRequest): Promise<TokenPair> {
        const response = await apiClient.post<TokenPair>('/api/token/', payload)
        return response.data
    },

    async refresh(payload: RefreshTokenRequest): Promise<AccessTokenResponse> {
        const response = await apiClient.post<AccessTokenResponse>('/api/token/refresh/', payload)
        return response.data
    },

    async verify(payload: VerifyTokenRequest): Promise<void> {
        await apiClient.post('/api/token/verify/', payload)
    },

    async register(payload: RegisterRequest): Promise<RegisterResponse> {
        const response = await apiClient.post<RegisterResponse>('/api/register/', payload)
        return response.data
    },
}
