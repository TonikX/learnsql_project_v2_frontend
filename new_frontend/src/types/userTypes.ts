export interface TokenPair {
    access: string
    refresh: string
}

export type SocialAuthProvider = 'github' | 'yandex' | 'google-oauth2'

export interface LoginRequest {
    username: string
    password: string
}

export interface RefreshTokenRequest {
    refresh: string
}

export interface AccessTokenResponse {
    access: string
}

export interface VerifyTokenRequest {
    token: string
}

export interface SocialLoginRequest {
    provider: SocialAuthProvider
    access_token: string
}

export interface SocialCodeLoginRequest {
    provider: 'github'
    code: string
    redirect_uri: string
}

export interface SocialLoginResponse extends TokenPair {
    token?: string
    user?: User
}

export interface RegisterRequest {
    username: string
    email?: string
    password: string
    first_name?: string
    last_name?: string
    tel?: string
    group_number?: number | null
}

export interface RegisterResponse {
    id?: number
    username: string
    email?: string
    first_name?: string
    last_name?: string
    role?: string
    tel?: string
    group_number?: string | number | null
}

export interface User {
    id?: number
    username: string
    email?: string
    first_name?: string
    last_name?: string
    role?: string
    tel?: string
    group_number?: string | number | null
}

export interface StudentGroup {
    id: number
    title?: string
    name?: string
    period?: string
    university?: string | number | null
}

export interface StudentGroupQuery {
    period?: string
    university?: string | number
}

export interface ChoiceValue {
    id: number
    name: string
}

export type UniversityChoice = ChoiceValue

export interface PaginatedResponse<T> {
    count: number
    next: string | null
    previous: string | null
    results: T[]
}
