export type Theme = 'light' | 'dark' | 'system'
export type ThemeMode = Theme
export type ResolvedTheme = 'light' | 'dark'

export const isTheme = (value: string | null): value is Theme => {
    return value === 'light' || value === 'dark' || value === 'system'
}
