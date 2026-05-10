import type { ChatRoom, ChatTaskDetail, ChatUser } from '@/types/chatTypes'

export function getChatUserDisplayName(user: ChatUser | null | undefined): string {
    if (!user) return 'Преподаватель'

    const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ').trim()
    return fullName || user.username
}

export function getChatUserInitials(user: ChatUser | null | undefined): string {
    if (!user) return '??'

    const firstNameInitial = user.first_name?.[0] ?? ''
    const lastNameInitial = user.last_name?.[0] ?? ''
    const initials = `${firstNameInitial}${lastNameInitial}`.trim()

    return (initials || user.username.slice(0, 2) || '??').toUpperCase()
}

export function formatChatRole(role?: string): string {
    if (role === 'teacher') return 'Преподаватель'
    if (role === 'student') return 'Студент'
    if (role === 'admin' || role === 'staff') return 'Администратор'
    return role || 'Преподаватель'
}

export function formatChatTime(value: string | null | undefined): string {
    if (!value) return ''

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value

    const now = new Date()
    const sameDay = date.toDateString() === now.toDateString()

    if (sameDay) {
        return new Intl.DateTimeFormat('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(date)
    }

    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    }).format(date)
}

export function formatChatPreview(content?: string | null): string {
    if (!content) return ''

    return content
        .replace(/```[a-zA-Z0-9_-]*\s*/g, '')
        .replace(/```/g, '')
        .replace(/\s+/g, ' ')
        .trim()
}

export function formatTaskTitle(task: ChatTaskDetail | null): string {
    if (!task) return 'Обсуждение курса'
    if (task.number) return `Задача #${task.number}`
    return task.title || `Задача #${task.id}`
}

export function buildChatTitle(room: ChatRoom): string {
    const courseTitle = room.course?.title
    const taskTitle = formatTaskTitle(room.task_detail)

    if (courseTitle && room.task_detail) return `${courseTitle} / ${taskTitle}`
    if (courseTitle) return courseTitle
    return room.name
}
