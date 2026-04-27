export type Theme = "light" | "dark" | "system"

const themeSet = new Set(["light", "dark", "system"])
export const isTheme = (s: string) => themeSet.has(s) 