<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import AppIcon from '../ui/AppIcon.vue'
import { useAuthStore } from '@/stores/authStore'
import { useChatStore } from '@/stores/chatStore'
import { useThemeStore } from '@/stores/themeStore'
import type { ThemeMode } from '@/types/theme'
import { storeToRefs } from 'pinia'

const auth = useAuthStore()
const { isAuth } = storeToRefs(auth)
const chatStore = useChatStore()
const { isRoomsLoading: isChatsLoading, unreadRoomsCount } = storeToRefs(chatStore)
const themeStore = useThemeStore()
const { mode } = storeToRefs(themeStore)

const chatBadgePollingInterval = 30000
const isThemeMenuOpen = ref(false)
const themeMenuRef = ref<HTMLElement | null>(null)
let chatBadgeIntervalId: ReturnType<typeof window.setInterval> | null = null

const headerClass = computed(() => {
    return 'border-header bg-header text-header-text'
})

const linkClass = 'hover:bg-[var(--color-header-link-hover)] hover:text-[var(--color-header-link-hover-text)]'
const iconActionClass =
    'rounded-[4px] hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-header-text focus-visible:ring-offset-2 focus-visible:ring-offset-header'

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

async function loadChatBadge() {
    if (!isAuth.value || isChatsLoading.value) return
    await chatStore.loadRooms({ silent: true, silentError: true })
}

function startChatBadgePolling() {
    if (chatBadgeIntervalId !== null) return

    void loadChatBadge()
    chatBadgeIntervalId = window.setInterval(() => {
        if (document.visibilityState === 'visible') {
            void loadChatBadge()
        }
    }, chatBadgePollingInterval)
}

function stopChatBadgePolling() {
    if (chatBadgeIntervalId === null) return

    window.clearInterval(chatBadgeIntervalId)
    chatBadgeIntervalId = null
}

function handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
        void loadChatBadge()
    }
}

onMounted(() => {
    document.addEventListener('click', handleDocumentClick)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    if (isAuth.value) {
        startChatBadgePolling()
    }
})

watch(isAuth, (value) => {
    if (value) {
        startChatBadgePolling()
    } else {
        stopChatBadgePolling()
        chatStore.clearChatState()
    }
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleDocumentClick)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    stopChatBadgePolling()
})
</script>

<template>
    <header :class="['sticky top-0 z-40 border-b font-mono', headerClass]">
        <div class="mx-auto flex h-14 w-full items-center justify-between gap-1 px-2 py-0 sm:px-4 lg:px-6 min-[1280px]:max-w-[90%] min-[1280px]:px-8">
            <nav class="flex min-w-0 flex-1 flex-nowrap items-center gap-[3px] text-[9px] font-medium leading-none min-[360px]:text-[10px] sm:gap-2 sm:text-[14px] md:text-[15px] min-[1280px]:text-[20px]">
                <RouterLink to="/" :class="['shrink-0 transition-colors', linkClass]">
                    <span class="sm:hidden">[Learn SQL]</span>
                    <span class="hidden sm:inline">[ Learn SQL ]</span>
                </RouterLink>

                <RouterLink to="/courses/all" :class="['shrink-0 transition-colors', linkClass]">
                    <span class="sm:hidden">[Все курсы]</span>
                    <span class="hidden sm:inline">[ Все курсы ]</span>
                </RouterLink>

                <RouterLink v-if="isAuth" to="/courses/my" :class="['shrink-0 transition-colors', linkClass]">
                    <span class="sm:hidden">[Мои курсы]</span>
                    <span class="hidden sm:inline">[ Мои курсы ]</span>
                </RouterLink>
            </nav>

            <nav class="flex shrink-0 flex-nowrap items-center gap-1 text-[11px] font-medium leading-none min-[360px]:text-[12px] sm:gap-2 sm:text-[14px] md:text-[15px] min-[1280px]:text-[20px]">
                <div ref="themeMenuRef" class="relative">
                    <button
                        type="button"
                        class="flex h-6 w-6 items-center justify-center transition-opacity sm:h-8 sm:w-8 min-[1280px]:h-10 min-[1280px]:w-10"
                        :class="iconActionClass"
                        aria-label="Выбрать тему"
                        :aria-expanded="isThemeMenuOpen"
                        @click.stop="isThemeMenuOpen = !isThemeMenuOpen"
                    >
                        <AppIcon :name="currentThemeIcon" :size="20" class="sm:hidden" title="Тема приложения"/>
                        <AppIcon :name="currentThemeIcon" :size="30" class="hidden sm:block" title="Тема приложения"/>
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
                            <AppIcon :name="option.icon" :size="22" class="sm:hidden"/>
                            <AppIcon :name="option.icon" :size="34" class="hidden sm:block"/>
                            <span>{{ option.label }}</span>
                        </button>
                    </div>
                </div>

                <RouterLink v-if="isAuth" to="/chats" :class="['shrink-0 transition-colors', linkClass]">
                    <span class="inline-flex items-center gap-1 sm:hidden">
                        [Чаты<span v-if="unreadRoomsCount > 0" class="rounded-full bg-primary-action px-1.5 py-0.5 text-[9px] leading-none text-white">{{ unreadRoomsCount }}</span>]
                    </span>
                    <span class="hidden items-center gap-2 sm:inline-flex">
                        [ Чаты
                        <span v-if="unreadRoomsCount > 0" class="rounded-full bg-primary-action px-2 py-0.5 text-[11px] leading-none text-white">{{ unreadRoomsCount }}</span>
                        ]
                    </span>
                </RouterLink>

                <RouterLink to="/" :class="['hidden px-1 transition-colors min-[1280px]:inline', linkClass]">[ О сайте ]</RouterLink>

                <template v-if="isAuth">
                    <RouterLink
                        to="/profile"
                        :class="[
                            'flex h-6 w-6 items-center justify-center transition-opacity sm:h-8 sm:w-8 min-[1280px]:h-10 min-[1280px]:w-10',
                            iconActionClass,
                        ]"
                        aria-label="Профиль"
                    >
                        <AppIcon name="profile" :size="24" class="sm:hidden" title="Профиль"/>
                        <AppIcon name="profile" :size="32" class="hidden sm:block" title="Профиль"/>
                    </RouterLink>
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
