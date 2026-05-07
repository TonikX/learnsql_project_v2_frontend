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
        <AppContainer class="flex h-[60px] items-center justify-between">
            <nav class="flex items-center gap-2 text-[20px] font-medium leading-none">
                <RouterLink to="/" :class="['px-1 transition-colors', linkClass]">[ Learn SQL ]</RouterLink>
                <RouterLink to="/courses" :class="['px-1 transition-colors', linkClass]">[ Все курсы ]</RouterLink>
                <RouterLink v-if="isAuth" to="/courses" :class="['px-1 transition-colors', linkClass]">[ Мои курсы ]</RouterLink>
                <RouterLink v-if="isAuth" to="/chats" :class="['px-1 transition-colors', linkClass]">[ Чаты ]</RouterLink>
            </nav>

            <nav class="flex items-center gap-2 text-[20px] font-medium leading-none">
                <div ref="themeMenuRef" class="relative">
                    <button
                        type="button"
                        class="flex h-10 w-10 items-center justify-center transition-colors"
                        :class="linkClass"
                        aria-label="Выбрать тему"
                        :aria-expanded="isThemeMenuOpen"
                        @click.stop="isThemeMenuOpen = !isThemeMenuOpen"
                    >
                        <AppIcon :name="currentThemeIcon" :size="30" />
                    </button>

                    <div
                        v-if="isThemeMenuOpen"
                        class="absolute right-0 top-[47px] w-[320px] rounded-[5px] border border-[var(--color-theme-menu-border)] bg-[var(--color-theme-menu)] py-3 text-white shadow-card"
                    >
                        <button
                            v-for="option in themeOptions"
                            :key="option.mode"
                            type="button"
                            class="flex w-full items-center gap-4 px-6 py-3 text-left text-[17px] transition hover:bg-white/10"
                            :class="mode === option.mode ? 'text-white' : 'text-[#E2E2E7]'"
                            @click="selectTheme(option.mode)"
                        >
                            <AppIcon :name="option.icon" :size="34" />
                            <span>{{ option.label }}</span>
                        </button>
                    </div>
                </div>

                <RouterLink to="/" :class="['px-1 transition-colors', linkClass]">[ Помощь ]</RouterLink>
                <RouterLink to="/" :class="['px-1 transition-colors', linkClass]">[ О сайте ]</RouterLink>

                <template v-if="isAuth">
                    <AppIcon name="profile" :size="32" negative />
                </template>
                <template v-else>
                    <RouterLink to="/login" :class="['px-1 transition-colors', linkClass]">[ Войти --&gt; ]</RouterLink>
                </template>
            </nav>
        </AppContainer>
    </header>
</template>
