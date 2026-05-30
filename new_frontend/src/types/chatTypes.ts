export type ChatFilter = 'all' | 'unread'

export interface PaginatedResponse<T> {
    count: number
    next: string | null
    previous: string | null
    results: T[]
}

export interface ChatRoomsResponse extends PaginatedResponse<ChatRoom> {
    unread_rooms_count?: number
}

export interface ChatUser {
    id: number | string
    username: string
    first_name?: string | null
    last_name?: string | null
    firstName?: string | null
    lastName?: string | null
    full_name?: string | null
    fullName?: string | null
    name?: string | null
    role?: string | null
    group?: {
        id?: number | string
        title?: string | null
        university?: string | number | null
    } | null
    main_admin?: boolean | null
}

export interface ChatAdministrator {
    id: number | string
    user: ChatUser
    main_admin: boolean
    can_add_user?: boolean
    can_set_chat?: boolean
    can_delete_user?: boolean
}

export interface ChatTheme {
    id: number
    title: string
}

export interface ChatTaskDetail {
    id: number
    title: string
    number: string | null
    theme: ChatTheme | null
}

export interface ChatCourse {
    id: number
    title: string
}

export interface ChatMessage {
    id: number | string
    room: number | string
    author: ChatUser
    content: string
    timestamp: string
    isOwn: boolean
    deliveryStatus?: 'failed'
    clientTempId?: string
    createdAt?: string
    error?: string
}

export interface ChatRoom {
    id: number | string
    name: string
    task_detail?: ChatTaskDetail | null
    tasks_detail?: ChatTaskDetail[] | null
    course: ChatCourse | null
    teacher: ChatUser | null
    student?: ChatUser | null
    creator?: number | string | ChatUser | null
    moderators?: ChatUser[] | null
    administrators?: ChatAdministrator[] | null
    subscribers: ChatUser[]
    last_message: Omit<ChatMessage, 'isOwn'> | null
    last_message_at: string | null
    unread_count: number
    is_archive: boolean
    created_at?: string
    updated_at?: string
}

export interface CreateRoomPayload {
    course: number | string
}

export interface ChatMessageQueryParams {
    page?: number
    page_size?: number
}

export interface ChatReadResponse {
    id: number
    unread_count: number
}

export interface WebSocketIncomingMessage {
    command: 'new_message' | 'messages' | 'error' | string
    message?: Omit<ChatMessage, 'isOwn'>
    messages?: Array<Omit<ChatMessage, 'isOwn'>>
    error?: string
}

export interface WebSocketOutgoingMessage {
    command: 'new_message' | 'fetch_messages'
    message?: string
}

export interface ChatContext {
    courseId?: number | string
    courseTitle?: string
}

export interface ChatItem {
    id: number | string
    room: ChatRoom
    context: ChatContext
    title: string
    lastMessage: string
    lastMessageAuthorName?: string | null
    isLastMessageOwn: boolean
    lastMessageAt: string
    unreadCount: number
    participants: ChatUser[]
    messages: ChatMessage[]
}
