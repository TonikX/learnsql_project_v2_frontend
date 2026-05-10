import apiClient from '@/api/client'
import type {
    ChatMessage,
    ChatMessageQueryParams,
    ChatReadResponse,
    ChatRoom,
    CreateRoomPayload,
    PaginatedResponse,
} from '@/types/chatTypes'

function buildQueryParams(params?: ChatMessageQueryParams) {
    return {
        page_size: params?.page_size ?? 50,
        page: params?.page ?? 1,
    }
}

export const chatService = {
    async getRooms(): Promise<PaginatedResponse<ChatRoom>> {
        const response = await apiClient.get<PaginatedResponse<ChatRoom>>('/chat/api/rooms/', {
            params: {
                page_size: 100,
                page: 1,
            },
        })
        return response.data
    },

    async getRoomMessages(
        roomId: number | string,
        params?: ChatMessageQueryParams,
    ): Promise<PaginatedResponse<Omit<ChatMessage, 'isOwn'>>> {
        const response = await apiClient.get<PaginatedResponse<Omit<ChatMessage, 'isOwn'>>>(
            `/chat/api/rooms/${roomId}/messages/`,
            { params: buildQueryParams(params) },
        )
        return response.data
    },

    async markRoomAsRead(roomId: number | string): Promise<ChatReadResponse> {
        const response = await apiClient.post<ChatReadResponse>(`/chat/api/rooms/${roomId}/read/`)
        return response.data
    },

    async createRoom(payload: CreateRoomPayload): Promise<ChatRoom> {
        const response = await apiClient.post<ChatRoom>('/chat/api/rooms/', payload)
        return response.data
    },
}
