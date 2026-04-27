import { isTheme, type Theme } from '@/types/theme'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore("theme", () => {
    const storageKey = "THEME"
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const getFromStorage = (): Theme => {
        const saved = localStorage.getItem(storageKey) ?? "light"
        if (isTheme(saved)) return saved as Theme

        return "light"
    }

    const saveToStorage = (s: string) => {
        if (!isTheme(s)) return

        localStorage.setItem(storageKey, s)
    }

    const currentTheme = ref<Theme>(getFromStorage())

    mediaQuery.addEventListener("change", (event: MediaQueryListEvent) => {
        currentTheme.value = event.matches ? "dark" : "light"
        saveToStorage(currentTheme.value)
    })

    return { currentTheme }
})
