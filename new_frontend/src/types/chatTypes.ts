export type ChatFilter = 'all' | 'unread' | 'tasks' | 'courses'

export interface ChatTeacher {
    id: number | string
    username: string
    firstName: string
    lastName: string
    role: 'teacher'
    position?: string
    avatarUrl?: string
    isOnline?: boolean
}

export interface ChatContext {
    courseId?: number | string
    courseTitle?: string
    taskId?: number | string
    taskTitle?: string
    taskNumber?: number | string
    topicTitle?: string
}

export interface ChatMessage {
    id: number | string
    chatId: number | string
    authorId: number | string
    authorRole: 'student' | 'teacher'
    authorName: string
    content: string
    timestamp: string
    isOwn: boolean
}

export interface ChatItem {
    id: number | string
    teacher: ChatTeacher
    context: ChatContext
    title: string
    lastMessage: string
    lastMessageAt: string
    unreadCount: number
    category: 'task' | 'course'
    isWaiting?: boolean
    messages: ChatMessage[]
}
