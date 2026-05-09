import type { PersonalStatistics, StudentSummary } from '@/types/profileStatisticsTypes'

function toDate(value?: string | null) {
    if (!value) return null

    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? null : date
}

function pad(value: number) {
    return String(value).padStart(2, '0')
}

export function formatPercent(value?: number | null) {
    if (typeof value !== 'number') return '0%'
    return `${Math.round(value * 100)}%`
}

export function formatNumber(value?: number | null, fractionDigits = 0) {
    if (typeof value !== 'number') return '0'
    return value.toLocaleString('ru-RU', {
        maximumFractionDigits: fractionDigits,
        minimumFractionDigits: fractionDigits,
    })
}

export function formatDate(value?: string | null) {
    const date = toDate(value)
    if (!date) return ''

    return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`
}

export function formatDateTime(value?: string | null) {
    const date = toDate(value)
    if (!date) return 'Активности пока нет'

    const now = new Date()
    const isToday =
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()

    const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`
    if (isToday) return `сегодня, ${time}`

    return `${formatDate(value)}, ${time}`
}

export function getDisplayName(student?: StudentSummary | null) {
    if (!student) return ''

    const fullName = [student.first_name, student.last_name].filter(Boolean).join(' ')
    return fullName || student.username
}

export function getInitials(student?: StudentSummary | null) {
    if (!student) return 'LS'

    const initials = [student.first_name, student.last_name]
        .filter(Boolean)
        .map((part) => part?.slice(0, 1).toUpperCase())
        .join('')

    return initials || student.username.slice(0, 2).toUpperCase()
}

export function formatRole(role?: string | null) {
    const roleMap: Record<string, string> = {
        student: 'Студент',
        teacher: 'Преподаватель',
        admin: 'Администратор',
        staff: 'Администратор',
    }

    return role ? (roleMap[role] ?? role) : ''
}

export function formatStreakDays(value?: number | null) {
    const days = value ?? 0
    const mod10 = days % 10
    const mod100 = days % 100

    if (mod10 === 1 && mod100 !== 11) return `${days} день`
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${days} дня`
    return `${days} дней`
}

export function getProfileStatusLine(personal?: PersonalStatistics | null) {
    const activity = personal?.last_activity_at
        ? `Последняя активность: ${formatDateTime(personal.last_activity_at)}`
        : 'Активности пока нет'
    const parts = [activity]
    const startedAt = formatDate(personal?.started_learning_at)

    if (startedAt) {
        parts.push(`Учится с ${startedAt}`)
    }

    return parts.join(' • ')
}
