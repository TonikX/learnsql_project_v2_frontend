import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { isTheme, type ResolvedTheme, type Theme, type ThemeMode } from '@/types/theme'
import { loadPrismTheme } from '@/utils/prismTheme'

const storageKey = 'learnsqlThemeMode'

export const useThemeStore = defineStore('theme', () => {
    const mode = ref<ThemeMode>('system')
    const systemTheme = ref<ResolvedTheme>('light')
    const isInitialized = ref(false)

    let mediaQuery: MediaQueryList | null = null

    const resolvedTheme = computed<ResolvedTheme>(() => {
        return mode.value === 'system' ? systemTheme.value : mode.value
    })

    const currentTheme = resolvedTheme

    function getStoredMode(): ThemeMode {
        if (typeof window === 'undefined') return 'system'

        const savedMode = window.localStorage.getItem(storageKey)
        if (isTheme(savedMode)) return savedMode

        return 'system'
    }

    function saveThemeMode(value: ThemeMode) {
        if (typeof window === 'undefined') return

        window.localStorage.setItem(storageKey, value)
    }

    function applyTheme() {
        if (typeof document === 'undefined') return

        document.documentElement.dataset.theme = resolvedTheme.value
        document.documentElement.dataset.themeMode = mode.value
        document.documentElement.style.colorScheme = resolvedTheme.value
    }

    function setThemeMode(value: ThemeMode) {
        mode.value = value
        saveThemeMode(value)
        applyTheme()
    }

    function handleSystemThemeChange(event: MediaQueryListEvent) {
        systemTheme.value = event.matches ? 'dark' : 'light'
        if (mode.value === 'system') {
            applyTheme()
        }
    }

    function initThemeMode() {
        if (isInitialized.value || typeof window === 'undefined') 
            return

        mode.value = getStoredMode()

        mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        systemTheme.value = mediaQuery.matches ? 'dark' : 'light'
        mediaQuery.addEventListener('change', handleSystemThemeChange)

        applyTheme()
        isInitialized.value = true
    }

    watch(currentTheme, async (theme: Theme) => await loadPrismTheme(theme), { immediate: true })

    return {
        mode,
        systemTheme,
        resolvedTheme,
        currentTheme,
        initThemeMode,
        setThemeMode,
    }
})
