<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import { chatService } from '@/services/chatService'
import type { ChatUser } from '@/types/chatTypes'
import { formatChatRole, getChatUserDisplayName } from '@/utils/chatFormatters'

const props = withDefaults(defineProps<{
    roomId: number | string
    addError?: string
    isAdding?: boolean
}>(), {
    addError: '',
    isAdding: false,
})

const emit = defineEmits<{
    close: []
    select: [user: ChatUser]
}>()

const searchQuery = ref('')
const moderators = ref<ChatUser[]>([])
const isLoading = ref(false)
const loadError = ref('')
const searchInputRef = ref<HTMLInputElement | null>(null)
let debounceTimeoutId: number | undefined
let loadRequestId = 0

function clearDebounce() {
    if (debounceTimeoutId !== undefined) {
        window.clearTimeout(debounceTimeoutId)
        debounceTimeoutId = undefined
    }
}

async function loadModerators(search = searchQuery.value) {
    const requestId = ++loadRequestId
    isLoading.value = true
    loadError.value = ''

    try {
        const loadedModerators = await chatService.getAvailableModerators(props.roomId, search)
        if (requestId !== loadRequestId) return
        moderators.value = loadedModerators
    } catch {
        if (requestId !== loadRequestId) return
        moderators.value = []
        loadError.value = 'Не удалось загрузить список модераторов'
    } finally {
        if (requestId === loadRequestId) {
            isLoading.value = false
        }
    }
}

function scheduleLoadModerators() {
    clearDebounce()
    debounceTimeoutId = window.setTimeout(() => {
        void loadModerators()
    }, 300)
}

function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && !props.isAdding) {
        emit('close')
    }
}

watch(searchQuery, scheduleLoadModerators)

watch(() => props.roomId, () => {
    clearDebounce()
    searchQuery.value = ''
    void loadModerators('')
})

onMounted(async () => {
    void loadModerators('')
    window.addEventListener('keydown', handleKeydown)
    await nextTick()
    searchInputRef.value?.focus()
})

onBeforeUnmount(() => {
    clearDebounce()
    loadRequestId += 1
    window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
    <Teleport to="body">
        <div
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6"
            role="presentation"
            @click.self="!isAdding && emit('close')"
        >
            <section
                class="flex max-h-[min(720px,calc(100dvh-3rem))] w-full max-w-[520px] flex-col overflow-hidden rounded-[10px] border border-chat-border bg-chat-panel text-chat-text shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-moderator-title"
            >
                <header class="shrink-0 border-b border-chat-border px-5 py-4">
                    <h2 id="add-moderator-title" class="text-[18px] font-medium leading-tight">
                        Добавить модератора
                    </h2>
                </header>

                <div class="shrink-0 border-b border-chat-border px-5 py-4">
                    <label class="block text-[13px] text-chat-text" for="moderator-search">
                        Поиск
                    </label>
                    <input
                        id="moderator-search"
                        ref="searchInputRef"
                        v-model="searchQuery"
                        type="search"
                        class="mt-2 h-11 w-full rounded-[7px] border border-chat-border bg-chat-surface px-3 text-[14px] text-chat-text outline-none placeholder:text-chat-placeholder focus:border-chat-border focus:ring-0"
                        placeholder="Имя, фамилия или username"
                    />
                </div>

                <div class="min-h-[220px] overflow-y-auto px-5 py-4">
                    <div v-if="isAdding" class="mb-3 flex justify-center py-2">
                        <AppLoader text="Добавляем модератора" mode="inline" text-class="text-chat-text" />
                    </div>

                    <p v-if="addError" class="mb-3 rounded-[8px] border border-chat-border bg-chat-surface px-4 py-3 text-[14px] text-chat-warning">
                        {{ addError }}
                    </p>

                    <div v-if="isLoading" class="flex min-h-[180px] items-center justify-center text-center">
                        <AppLoader text="Загрузка модераторов" mode="inline" text-class="text-chat-text" />
                    </div>

                    <p v-else-if="loadError" class="rounded-[8px] border border-chat-border bg-chat-surface px-4 py-3 text-[14px] text-chat-warning">
                        {{ loadError }}
                    </p>

                    <p v-else-if="!moderators.length" class="flex min-h-[180px] items-center justify-center text-center text-[14px] text-chat-text">
                        Подходящих модераторов не найдено
                    </p>

                    <div v-else class="space-y-2">
                        <button
                            v-for="moderator in moderators"
                            :key="moderator.id"
                            type="button"
                            class="flex w-full min-w-0 items-center justify-between gap-3 rounded-[8px] border border-chat-border bg-chat-surface px-4 py-3 text-left text-chat-text transition hover:bg-chat-surface-active disabled:cursor-not-allowed disabled:opacity-60"
                            :disabled="isAdding"
                            @click="emit('select', moderator)"
                        >
                            <span class="min-w-0">
                                <span class="block truncate text-[14px] font-medium">
                                    {{ getChatUserDisplayName(moderator) }}
                                </span>
                                <span class="block truncate text-[12px] text-chat-placeholder">
                                    @{{ moderator.username }}
                                </span>
                            </span>
                            <span class="shrink-0 rounded-[6px] border border-chat-border bg-chat-panel px-2 py-1 text-[12px]">
                                {{ formatChatRole(moderator.role) }}
                            </span>
                        </button>
                    </div>
                </div>

                <footer class="flex shrink-0 justify-end border-t border-chat-border px-5 py-4">
                    <button
                        type="button"
                        class="inline-flex h-10 items-center justify-center rounded-[7px] border border-chat-border bg-chat-action-button px-4 text-[14px] text-chat-text transition hover:bg-chat-surface-active disabled:cursor-not-allowed disabled:opacity-60"
                        :disabled="isAdding"
                        @click="emit('close')"
                    >
                        Отмена
                    </button>
                </footer>
            </section>
        </div>
    </Teleport>
</template>
