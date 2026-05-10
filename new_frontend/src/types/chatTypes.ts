export type ChatFilter = 'all' | 'unread' | 'tasks' | 'courses'

export interface PaginatedResponse<T> {
    count: number
    next: string | null
    previous: string | null
    results: T[]
}

export interface ChatUser {
    id: number
    username: string
    first_name: string
    last_name: string
    role: string
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
}

export interface ChatRoom {
    id: number
    name: string
    task_detail: ChatTaskDetail | null
    course: ChatCourse | null
    teacher: ChatUser | null
    subscribers: ChatUser[]
    last_message: Omit<ChatMessage, 'isOwn'> | null
    last_message_at: string | null
    unread_count: number
    is_archive: boolean
    created_at?: string
    updated_at?: string
}

export interface CreateRoomPayload {
    name: string
    task?: number | string
    subscribers?: Array<number | string> | string
    is_room?: boolean
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
    message?: {
        author: string
        content: string
        timestamp: string
    }
    messages?: Array<{
        author: string
        content: string
        timestamp: string
    }>
    error?: string
}

export interface WebSocketOutgoingMessage {
    command: 'new_message' | 'fetch_messages'
    message?: string
}

export interface ChatTeacher {
    id: number | string
    username: string
    firstName: string
    lastName: string
    role: string
    position?: string
}

export interface ChatContext {
    courseId?: number | string
    courseTitle?: string
    taskId?: number | string
    taskTitle?: string
    taskNumber?: number | string
    topicTitle?: string
}

export interface ChatItem {
    id: number | string
    room: ChatRoom
    teacher: ChatTeacher
    context: ChatContext
    title: string
    lastMessage: string
    lastMessageAt: string
    unreadCount: number
    category: 'task' | 'course'
    messages: ChatMessage[]
}
