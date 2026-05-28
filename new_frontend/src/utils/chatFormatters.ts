import type { ChatRoom, ChatUser } from '@/types/chatTypes'

export function getChatUserDisplayName(user: ChatUser | null | undefined): string {
    if (!user) return 'Участник'

    const directFullName = (user.full_name ?? user.fullName ?? user.name)?.trim()
    if (directFullName) return directFullName

    const fullName = [user.first_name ?? user.firstName, user.last_name ?? user.lastName]
        .map((namePart) => namePart?.trim())
        .filter(Boolean)
        .join(' ')

    return fullName || user.username.trim() || 'Участник'
}

export function getChatUserInitials(user: ChatUser | null | undefined): string {
    if (!user) return '??'

    const displayName = getChatUserDisplayName(user)
    if (displayName && displayName !== user.username) {
        return displayName
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0])
            .join('')
            .toUpperCase()
    }

    const firstNameInitial = (user.first_name ?? user.firstName)?.[0] ?? ''
    const lastNameInitial = (user.last_name ?? user.lastName)?.[0] ?? ''
    const initials = `${firstNameInitial}${lastNameInitial}`.trim()

    return (initials || user.username.slice(0, 2) || '??').toUpperCase()
}

export function formatChatRole(role?: string | null): string {
    if (role === 'teacher') return 'Преподаватель'
    if (role === 'student') return 'Студент'
    if (role === 'moderator') return 'Модератор'
    if (role === 'admin' || role === 'staff') return 'Администратор'
    return role || 'Участник'
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

export function buildChatTitle(room: ChatRoom): string {
    return room.course?.title || room.name
}
