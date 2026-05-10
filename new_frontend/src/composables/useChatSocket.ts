import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import type { WebSocketIncomingMessage, WebSocketOutgoingMessage } from '@/types/chatTypes'

type ChatSocketStatus = 'idle' | 'connecting' | 'connected' | 'closed' | 'error'

interface ChatSocketOptions {
    onNewMessage?: (payload: WebSocketIncomingMessage) => void | Promise<void>
    onError?: (message: string) => void
}

const accessStorageKey = 'access_token'
const normalCloseCode = 1000
const unauthorizedCloseCode = 4401
const forbiddenCloseCode = 4403

function getBackendUrl(): string {
    return import.meta.env.VITE_BACKEND_API_URL ?? 'http://localhost:8000'
}

function buildSocketUrl(roomId: number | string, token: string): string {
    const baseUrl = new URL(getBackendUrl())
    baseUrl.protocol = baseUrl.protocol === 'https:' ? 'wss:' : 'ws:'
    baseUrl.pathname = `/ws/chat/${roomId}/`
    baseUrl.search = `token=${encodeURIComponent(token)}`
    return baseUrl.toString()
}

function getStoredAccessToken(): string | null {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem(accessStorageKey)
}

export function useChatSocket(options: ChatSocketOptions = {}) {
    const socket = ref<WebSocket | null>(null)
    const status = ref<ChatSocketStatus>('idle')
    const error = ref<string | null>(null)
    const activeRoomId = ref<number | string | null>(null)
    const reconnectAttempts = ref(0)
    const didRefreshForCurrentRoom = ref(false)

    const isConnected = computed(() => status.value === 'connected')

    function closeSocket(code = normalCloseCode) {
        if (socket.value) {
            socket.value.close(code)
            socket.value = null
        }

        if (code === normalCloseCode) {
            status.value = 'closed'
        }
    }

    async function connect(roomId: number | string) {
        closeSocket()
        activeRoomId.value = roomId
        reconnectAttempts.value = 0
        didRefreshForCurrentRoom.value = false
        await openSocket(roomId)
    }

    async function openSocket(roomId: number | string) {
        const token = getStoredAccessToken()

        if (!token) {
            status.value = 'error'
            error.value = 'Сессия истекла, войдите снова'
            options.onError?.(error.value)
            return
        }

        status.value = 'connecting'
        error.value = null

        const nextSocket = new WebSocket(buildSocketUrl(roomId, token))
        socket.value = nextSocket

        nextSocket.onopen = () => {
            status.value = 'connected'
            reconnectAttempts.value = 0
        }

        nextSocket.onmessage = (event) => {
            const payload = parseSocketMessage(event.data)
            if (!payload) return

            if (payload.command === 'new_message') {
                void options.onNewMessage?.(payload)
                return
            }

            if (payload.command === 'error') {
                error.value = payload.error ?? 'Не удалось отправить сообщение'
                options.onError?.(error.value)
            }
        }

        nextSocket.onerror = () => {
            status.value = 'error'
            error.value = 'Не удалось подключиться к чату'
            options.onError?.(error.value)
        }

        nextSocket.onclose = (event) => {
            const isCurrentSocket = socket.value === nextSocket
            if (isCurrentSocket) socket.value = null

            if (event.code === normalCloseCode) {
                if (isCurrentSocket) status.value = 'closed'
                return
            }

            if (!isCurrentSocket) return

            void handleUnexpectedClose(roomId, event.code)
        }
    }

    async function handleUnexpectedClose(roomId: number | string, code: number) {
        if (code === forbiddenCloseCode) {
            status.value = 'error'
            error.value = 'Нет доступа к этому чату'
            options.onError?.(error.value)
            return
        }

        if (code === unauthorizedCloseCode) {
            const refreshed = await refreshTokenOnce()
            if (refreshed) {
                await openSocket(roomId)
                return
            }

            status.value = 'error'
            error.value = 'Сессия истекла, войдите снова'
            options.onError?.(error.value)
            return
        }

        if (reconnectAttempts.value >= 3 || activeRoomId.value !== roomId) {
            status.value = 'error'
            error.value = 'Соединение с чатом потеряно'
            options.onError?.(error.value)
            return
        }

        reconnectAttempts.value += 1
        window.setTimeout(() => {
            if (activeRoomId.value === roomId) {
                void openSocket(roomId)
            }
        }, reconnectAttempts.value * 1000)
    }

    async function refreshTokenOnce(): Promise<boolean> {
        if (didRefreshForCurrentRoom.value) return false
        didRefreshForCurrentRoom.value = true

        try {
            const token = await useAuthStore().refreshAccessToken()
            return !!token?.access
        } catch {
            useAuthStore().logout()
            return false
        }
    }

    function sendMessage(content: string): boolean {
        if (!socket.value || socket.value.readyState !== WebSocket.OPEN) {
            error.value = 'Чат ещё подключается'
            options.onError?.(error.value)
            return false
        }

        const payload: WebSocketOutgoingMessage = {
            command: 'new_message',
            message: content,
        }

        socket.value.send(JSON.stringify(payload))
        return true
    }

    function disconnect() {
        activeRoomId.value = null
        closeSocket()
    }

    return {
        status,
        error,
        isConnected,
        connect,
        disconnect,
        sendMessage,
    }
}

function parseSocketMessage(value: string): WebSocketIncomingMessage | null {
    try {
        return JSON.parse(value) as WebSocketIncomingMessage
    } catch {
        return null
    }
}
