<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import ChatPanel from '@/components/chats/ChatPanel.vue'
import ChatSidebar from '@/components/chats/ChatSidebar.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import { useChatStore } from '@/stores/chatStore'

const route = useRoute()
const router = useRouter()
const chatStore = useChatStore()
const {
    activeChat,
    activeChatId,
    canUseCourseFilter,
    courseFilter,
    courseOptions,
    error,
    filter,
    filteredChats,
    hasLoadedRooms,
    isMessagesLoading,
    isSending,
    isLoading,
    roomsError,
    searchQuery,
} = storeToRefs(chatStore)

const isMobileChatOpen = ref(false)
const isSyncingRoomFromQuery = ref(false)

const chatLayoutGridClass = 'lg:grid-cols-[360px_minmax(0,1fr)] xl:grid-cols-[380px_minmax(0,1fr)] 2xl:grid-cols-[420px_minmax(0,1fr)]'
const chatSidebarResponsiveClass = 'w-full max-w-[460px] md:max-w-[620px] lg:max-w-none'
const shouldShowRoomsLoading = computed(() => isLoading.value || (!hasLoadedRooms.value && !roomsError.value))
const chatPageTitle = computed(() => canUseCourseFilter.value ? 'Чаты со студентами' : 'Чаты с преподавателями')

const routeRoomId = computed(() => {
    const value = route.query.room
    return typeof value === 'string' && value ? value : null
})

function hasRoom(roomId: string) {
    return chatStore.rooms.some((room) => String(room.id) === roomId)
}

async function syncRoomFromQuery() {
    if (isSyncingRoomFromQuery.value) return

    const roomId = routeRoomId.value

    if (roomId === null) {
        chatStore.clearActiveRoom()
        isMobileChatOpen.value = false
        return
    }

    if (!hasRoom(roomId)) {
        chatStore.clearActiveRoom()
        isMobileChatOpen.value = false
        return
    }

    if (activeChatId.value !== null && String(activeChatId.value) === roomId) {
        isMobileChatOpen.value = true
        return
    }

    isSyncingRoomFromQuery.value = true
    try {
        await chatStore.selectRoom(roomId)
        isMobileChatOpen.value = true
    } finally {
        isSyncingRoomFromQuery.value = false
    }
}

async function setRoomQuery(roomId: number | string | null) {
    const nextQuery = { ...route.query }

    if (roomId === null) {
        delete nextQuery.room
    } else {
        nextQuery.room = String(roomId)
    }

    await router.replace({ query: nextQuery })
}

async function handleSelectChat(chatId: number | string) {
    await setRoomQuery(chatId)
}

async function handleBackToList() {
    isMobileChatOpen.value = false
    await setRoomQuery(null)
}

async function handleAddModerator() {
    const userId = window.prompt('Введите ID пользователя, которого нужно добавить модератором')
    const normalizedUserId = userId?.trim()
    if (!normalizedUserId) return

    await chatStore.addModeratorToActiveRoom(normalizedUserId)
}

onMounted(async () => {
    if (!chatStore.hasLoadedRooms) {
        await chatStore.loadRooms()
    }

    await syncRoomFromQuery()
})

watch(routeRoomId, async () => {
    if (isLoading.value) return
    await syncRoomFromQuery()
})

watch(() => chatStore.rooms, async () => {
    await syncRoomFromQuery()
})

onBeforeUnmount(() => {
    chatStore.disconnectSocket()
})
</script>

<template>
    <div :class="['min-h-full bg-chat-page font-mono text-chat-text', isMobileChatOpen ? 'py-1 sm:py-2 lg:py-3 xl:py-6' : 'py-6 sm:py-10']">
        <div class="mx-auto w-full max-w-[1880px] px-3 sm:px-8">
            <header :class="isMobileChatOpen ? 'hidden xl:block xl:mb-6' : 'mb-6 sm:mb-8'">
                <h1 class="text-[28px] font-semibold leading-tight md:text-[32px]">
                    {{ chatPageTitle }}
                </h1>
            </header>

            <p v-if="error" class="mb-4 rounded-[8px] border border-chat-border bg-chat-surface p-4 text-chat-warning">
                {{ error }}
            </p>

            <div v-if="shouldShowRoomsLoading" class="flex min-h-[220px] items-center justify-center text-center text-[15px] text-chat-text">
                <AppLoader text="Загрузка чатов" mode="inline" text-class="text-chat-text" />
            </div>

            <div v-else :class="['grid items-start gap-5 sm:gap-6', chatLayoutGridClass]">
                <ChatSidebar
                    :class="isMobileChatOpen ? `hidden lg:block ${chatSidebarResponsiveClass}` : `block ${chatSidebarResponsiveClass}`"
                    :active-chat-id="activeChatId"
                    :chats="filteredChats"
                    :course-filter="courseFilter"
                    :course-options="courseOptions"
                    :filter="filter"
                    :is-ready="hasLoadedRooms"
                    :search-query="searchQuery"
                    :show-course-filter="canUseCourseFilter"
                    @select="handleSelectChat"
                    @set-course-filter="chatStore.setCourseFilter"
                    @set-filter="chatStore.setFilter"
                    @set-search="chatStore.setSearchQuery"
                />
                <ChatPanel
                    :class="isMobileChatOpen ? 'flex' : 'hidden lg:flex'"
                    :can-manage-moderators="canUseCourseFilter"
                    :chat="activeChat"
                    :has-chats="chatStore.rooms.length > 0"
                    :is-messages-loading="isMessagesLoading"
                    :is-sending="isSending"
                    @add-moderator="handleAddModerator"
                    @back="handleBackToList"
                    @retry="chatStore.retryFailedMessage"
                    @send="chatStore.sendMessage"
                />
            </div>
        </div>
    </div>
</template>
