import apiClient from '@/api/client'
import type {
    ChatAdministrator,
    ChatMessage,
    ChatMessageQueryParams,
    ChatReadResponse,
    ChatRoom,
    ChatRoomsResponse,
    ChatUser,
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
    async getRooms(): Promise<ChatRoomsResponse> {
        const response = await apiClient.get<ChatRoomsResponse>('/chat/api/rooms/', {
            params: {
                page_size: 100,
                page: 1,
            },
        })
        return response.data
    },

    async getTeacherRooms(): Promise<ChatRoomsResponse> {
        const response = await apiClient.get<ChatRoomsResponse>('/chat/api/rooms/teacher/', {
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

    async addModerator(roomId: number | string, userId: number | string): Promise<ChatAdministrator[]> {
        const response = await apiClient.post<ChatAdministrator[]>(`/chat/api/rooms/${roomId}/moderators/`, {
            user: userId,
        })
        return response.data
    },

    async deleteModerator(roomId: number | string, userId: number | string): Promise<ChatAdministrator[]> {
        const response = await apiClient.delete<ChatAdministrator[]>(
            `/chat/api/rooms/${roomId}/moderators/${userId}/`,
        )
        return response.data
    },

    async getAvailableModerators(roomId: number | string, search = ''): Promise<ChatUser[]> {
        const normalizedSearch = search.trim()
        const response = await apiClient.get<ChatUser[]>(`/chat/api/rooms/${roomId}/available-moderators/`, {
            params: normalizedSearch ? { search: normalizedSearch } : undefined,
        })
        return response.data
    },

    async createRoom(payload: CreateRoomPayload): Promise<ChatRoom> {
        const response = await apiClient.post<ChatRoom>('/chat/api/rooms/', payload)
        return response.data
    },
}
