export const phoneValidationErrorMessage = 'Введите корректный номер телефона'

export function normalizePhoneForValidation(phone: string): string {
    return phone.trim().replace(/[\s\-()]/g, '')
}

export function isOptionalPhoneValid(phone: string): boolean {
    const trimmedPhone = phone.trim()

    if (!trimmedPhone) return true
    if (!/^\+?[\d\s\-()]+$/.test(trimmedPhone)) return false

    const normalizedPhone = normalizePhoneForValidation(trimmedPhone)
    const digits = normalizedPhone.startsWith('+')
        ? normalizedPhone.slice(1)
        : normalizedPhone

    return /^\d{7,15}$/.test(digits)
}

export function isPhoneBackendErrorMessage(message: string): boolean {
    return /(^|;\s*)tel\s*:/i.test(message.trim())
}
