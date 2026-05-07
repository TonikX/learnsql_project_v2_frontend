<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import AppContainer from './AppContainer.vue'
import AppIcon from '../ui/AppIcon.vue'
import { useAuthStore } from '@/stores/authStore'
import { useThemeStore } from '@/stores/themeStore'
import type { ThemeMode } from '@/types/theme'
import { storeToRefs } from 'pinia'

const auth = useAuthStore()
const { isAuth } = storeToRefs(auth)
const themeStore = useThemeStore()
const { mode } = storeToRefs(themeStore)

const isThemeMenuOpen = ref(false)
const themeMenuRef = ref<HTMLElement | null>(null)

const headerClass = computed(() => {
    return 'border-[var(--color-header)] bg-[var(--color-header)] text-[var(--color-header-text)]'
})

const linkClass = 'hover:bg-[var(--color-header-link-hover)] hover:text-[var(--color-header-link-hover-text)]'

const currentThemeIcon = computed(() => {
    if (mode.value === 'system') return 'system'
    return mode.value === 'dark' ? 'moon' : 'sun'
})

const themeOptions: Array<{
    mode: ThemeMode
    label: string
    icon: 'sun' | 'moon' | 'system'
}> = [
    { mode: 'light', label: 'Светлая тема', icon: 'sun' },
    { mode: 'dark', label: 'Тёмная тема', icon: 'moon' },
    { mode: 'system', label: 'Вариант по умолчанию', icon: 'system' },
]

function selectTheme(value: ThemeMode) {
    themeStore.setThemeMode(value)
    isThemeMenuOpen.value = false
}

function handleDocumentClick(event: MouseEvent) {
    if (!themeMenuRef.value?.contains(event.target as Node)) {
        isThemeMenuOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleDocumentClick)
})
</script>

<template>
    <header :class="['sticky top-0 z-40 border-b font-mono', headerClass]">
        <div class="mx-auto flex min-h-[48px] w-full items-center justify-between gap-1 px-2 py-0 sm:px-4 lg:max-w-[90%] lg:px-8">
            <nav class="flex min-w-0 flex-1 flex-nowrap items-center gap-[3px] text-[10px] font-medium leading-none sm:gap-2 sm:text-[16px] lg:text-[20px]">
                <RouterLink to="/" :class="['shrink-0 transition-colors', linkClass]">
                    <span class="sm:hidden">[Learn SQL]</span>
                    <span class="hidden sm:inline">[ Learn SQL ]</span>
                </RouterLink>

                <RouterLink to="/courses" :class="['shrink-0 transition-colors', linkClass]">
                    <span class="sm:hidden">[Все курсы]</span>
                    <span class="hidden sm:inline">[ Все курсы ]</span>
                </RouterLink>

                <RouterLink v-if="isAuth" to="/courses" :class="['shrink-0 transition-colors', linkClass]">
                    <span class="sm:hidden">[Мои курсы]</span>
                    <span class="hidden sm:inline">[ Мои курсы ]</span>
                </RouterLink>

                <RouterLink v-if="isAuth" to="/chats" :class="['shrink-0 transition-colors', linkClass]">
                    <span class="sm:hidden">[Чаты]</span>
                    <span class="hidden sm:inline">[ Чаты ]</span>
                </RouterLink>
            </nav>

            <nav class="flex shrink-0 flex-nowrap items-center gap-1 text-[12px] font-medium leading-none sm:gap-2 sm:text-[16px] lg:text-[20px]">
                <div ref="themeMenuRef" class="relative">
                    <button
                        type="button"
                        class="flex h-6 w-6 items-center justify-center transition-colors sm:h-9 sm:w-9 lg:h-10 lg:w-10"
                        :class="linkClass"
                        aria-label="Выбрать тему"
                        :aria-expanded="isThemeMenuOpen"
                        @click.stop="isThemeMenuOpen = !isThemeMenuOpen"
                    >
                        <AppIcon :name="currentThemeIcon" :size="20" class="sm:hidden" />
                        <AppIcon :name="currentThemeIcon" :size="30" class="hidden sm:block" />
                    </button>

                    <div
                        v-if="isThemeMenuOpen"
                        class="absolute right-0 top-[32px] w-[220px] rounded-[5px] border border-[var(--color-theme-menu-border)] bg-[var(--color-theme-menu)] py-2 text-white shadow-card sm:top-[44px] sm:w-[320px] sm:py-3 lg:top-[47px]"
                    >
                        <button
                            v-for="option in themeOptions"
                            :key="option.mode"
                            type="button"
                            class="flex w-full items-center gap-3 px-4 py-2 text-left text-[13px] transition hover:bg-white/10 sm:gap-4 sm:px-6 sm:py-3 sm:text-[17px]"
                            :class="mode === option.mode ? 'text-white' : 'text-[#E2E2E7]'"
                            @click="selectTheme(option.mode)"
                        >
                            <AppIcon :name="option.icon" :size="22" class="sm:hidden" />
                            <AppIcon :name="option.icon" :size="34" class="hidden sm:block" />
                            <span>{{ option.label }}</span>
                        </button>
                    </div>
                </div>

                <RouterLink to="/" :class="['hidden px-1 transition-colors md:inline', linkClass]">[ Помощь ]</RouterLink>
                <RouterLink to="/" :class="['hidden px-1 transition-colors md:inline', linkClass]">[ О сайте ]</RouterLink>

                <template v-if="isAuth">
                    <AppIcon name="profile" :size="24" negative class="sm:hidden" />
                    <AppIcon name="profile" :size="32" negative class="hidden sm:block" />
                </template>

                <template v-else>
                    <RouterLink to="/login" :class="['shrink-0 transition-colors', linkClass]">
                        <span class="sm:hidden">[Войти]</span>
                        <span class="hidden sm:inline">[ Войти --&gt; ]</span>
                    </RouterLink>
                </template>
            </nav>
        </div>
    </header>
</template>
