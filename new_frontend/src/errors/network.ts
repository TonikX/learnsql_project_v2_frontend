export class NotFoundError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'NotFoundError'
    }
}

export class BadRequestError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'BadRequestError'
    }
}

export class ServerError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ServerError'
    }
}

export class ConnectionError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ConnectionError'
    }
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function stringifyErrorValue(value: unknown): string | null {
    if (typeof value === 'string') return value.trim() || null
    if (typeof value === 'number' || typeof value === 'boolean') return String(value)
    if (Array.isArray(value)) {
        return value
            .map(stringifyErrorValue)
            .filter((message): message is string => Boolean(message))
            .join(', ') || null
    }
    return null
}

function extractFromResponseData(data: unknown): string | null {
    const directMessage = stringifyErrorValue(data)
    if (directMessage) return directMessage
    if (!isRecord(data)) return null

    for (const key of ['error', 'detail', 'message', 'non_field_errors']) {
        const message = stringifyErrorValue(data[key])
        if (message) return message
    }

    const fieldMessages = Object.entries(data)
        .filter(([key]) => key !== 'code')
        .map(([key, value]) => {
            const message = stringifyErrorValue(value)
            return message ? `${key}: ${message}` : null
        })
        .filter((message): message is string => Boolean(message))

    return fieldMessages.join('; ') || null
}

export function extractApiErrorMessage(error: unknown, fallbackMessage: string): string {
    if (error instanceof ConnectionError) return 'Не удалось подключиться к серверу. Проверьте интернет и попробуйте позже'

    if (isRecord(error)) {
        const response = error.response
        if (isRecord(response)) {
            const message = extractFromResponseData(response.data)
            if (message) return message
        }
    }

    if (error instanceof Error && error.message && error.message !== '[object Object]') {
        return error.message
    }

    return fallbackMessage
}

export function getApiErrorStatus(error: unknown): number | null {
    if (!isRecord(error) || !isRecord(error.response)) return null
    return typeof error.response.status === 'number' ? error.response.status : null
}
