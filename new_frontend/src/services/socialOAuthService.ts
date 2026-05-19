import type { SocialAuthProvider } from '@/types/userTypes'

const googleScriptSrc = 'https://accounts.google.com/gsi/client'
const yandexAuthorizeUrl = 'https://oauth.yandex.ru/authorize'
const yandexStateKey = 'learnsql_yandex_oauth_state'
const socialRedirectKey = 'learnsql_social_auth_redirect'

const providerErrors: Record<SocialAuthProvider, string> = {
    github: 'Не удалось войти через GitHub',
    yandex: 'Не удалось войти через Яндекс',
    'google-oauth2': 'Не удалось войти через Google',
}

const knownOAuthErrors = new Set([
    'Сервис входа временно недоступен',
    'Не удалось получить токен провайдера',
    'Backend ожидает access_token провайдера, но текущий OAuth-flow вернул code',
    'Не удалось подтвердить OAuth-сессию',
    'Вход через GitHub пока недоступен',
])

function isSafeLocalPath(path: string | null): path is string {
    return Boolean(path && path.startsWith('/') && !path.startsWith('//'))
}

type GoogleTokenResponse = {
    access_token?: string
    error?: string
}

type GoogleTokenClient = {
    requestAccessToken: (options?: { prompt?: string }) => void
}

type GoogleTokenClientConfig = {
    client_id: string
    scope: string
    callback: (response: GoogleTokenResponse) => void
}

declare global {
    interface Window {
        google?: {
            accounts?: {
                oauth2?: {
                    initTokenClient: (config: GoogleTokenClientConfig) => GoogleTokenClient
                }
            }
        }
    }
}

function randomState() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function loadScript(src: string) {
    return new Promise<void>((resolve, reject) => {
        const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)
        if (existingScript) {
            resolve()
            return
        }

        const script = document.createElement('script')
        script.src = src
        script.async = true
        script.defer = true
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('Сервис входа временно недоступен'))
        document.head.appendChild(script)
    })
}

export function saveSocialRedirect(path: string) {
    window.sessionStorage.setItem(socialRedirectKey, isSafeLocalPath(path) ? path : '/')
}

export function consumeSocialRedirect() {
    const path = window.sessionStorage.getItem(socialRedirectKey)
    window.sessionStorage.removeItem(socialRedirectKey)

    return isSafeLocalPath(path) ? path : '/'
}

export function getSocialAuthErrorMessage(provider: SocialAuthProvider, unknownError: unknown) {
    if (unknownError instanceof Error && knownOAuthErrors.has(unknownError.message)) {
        return unknownError.message
    }

    return providerErrors[provider]
}

export async function getGoogleAccessToken() {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    if (!clientId) {
        throw new Error('Сервис входа временно недоступен')
    }

    await loadScript(googleScriptSrc)

    return new Promise<string>((resolve, reject) => {
        const tokenClient = window.google?.accounts?.oauth2?.initTokenClient({
            client_id: clientId,
            scope: 'openid email profile',
            callback: (response) => {
                if (response.access_token) {
                    resolve(response.access_token)
                    return
                }

                reject(new Error(response.error || 'Не удалось получить токен провайдера'))
            },
        })

        if (!tokenClient) {
            reject(new Error('Сервис входа временно недоступен'))
            return
        }

        tokenClient.requestAccessToken({ prompt: 'consent' })
    })
}

export function startYandexAccessTokenFlow() {
    const clientId = import.meta.env.VITE_YANDEX_CLIENT_ID
    if (!clientId) {
        throw new Error('Сервис входа временно недоступен')
    }

    const redirectUri = import.meta.env.VITE_YANDEX_REDIRECT_URI || `${window.location.origin}/auth/callback/yandex`
    const state = randomState()
    window.sessionStorage.setItem(yandexStateKey, state)

    const params = new URLSearchParams({
        response_type: 'token',
        client_id: clientId,
        redirect_uri: redirectUri,
        state,
    })

    window.location.href = `${yandexAuthorizeUrl}?${params.toString()}`
}

export function parseYandexAccessToken(hash: string) {
    const params = new URLSearchParams(hash.replace(/^#/, ''))
    const accessToken = params.get('access_token')
    const error = params.get('error')
    const state = params.get('state')
    const expectedState = window.sessionStorage.getItem(yandexStateKey)
    window.sessionStorage.removeItem(yandexStateKey)

    if (error) {
        throw new Error('Не удалось получить токен провайдера')
    }

    if (!accessToken) {
        throw new Error('Backend ожидает access_token провайдера, но текущий OAuth-flow вернул code')
    }

    if (!state || state !== expectedState) {
        throw new Error('Не удалось подтвердить OAuth-сессию')
    }

    return accessToken
}

export function getGitHubAccessToken() {
    throw new Error('Вход через GitHub пока недоступен')
}
