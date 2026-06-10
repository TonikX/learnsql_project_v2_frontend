<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import type { ChatUser } from '@/types/chatTypes'
import { getChatUserDisplayName } from '@/utils/chatFormatters'

const props = withDefaults(defineProps<{
    moderator: ChatUser
    isRemoving?: boolean
    error?: string
}>(), {
    isRemoving: false,
    error: '',
})

const emit = defineEmits<{
    close: []
    confirm: []
}>()

const isLocalRemoving = ref(false)
const moderatorName = computed(() => getChatUserDisplayName(props.moderator))
const isRemoveLocked = computed(() => props.isRemoving || isLocalRemoving.value)

function close() {
    if (isRemoveLocked.value) return
    emit('close')
}

function confirm() {
    if (isRemoveLocked.value) return
    isLocalRemoving.value = true
    emit('confirm')
}

watch(() => props.isRemoving, (isRemoving) => {
    if (!isRemoving) {
        isLocalRemoving.value = false
    }
})

onBeforeUnmount(() => {
    isLocalRemoving.value = false
})
</script>

<template>
    <Teleport to="body">
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <button
                type="button"
                class="absolute inset-0 bg-black/50"
                aria-label="Закрыть окно удаления модератора"
                :disabled="isRemoveLocked"
                @click="close"
            />

            <section
                class="relative max-h-[calc(100dvh-2rem)] w-full max-w-[480px] overflow-y-auto rounded-[10px] border border-chat-border bg-chat-panel p-6 text-chat-text shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
                role="dialog"
                aria-modal="true"
                aria-labelledby="remove-moderator-title"
            >
                <div class="flex items-start justify-between gap-4">
                    <h2 id="remove-moderator-title" class="text-[22px] font-semibold leading-tight">
                        Удалить модератора
                    </h2>
                    <button
                        type="button"
                        class="rounded-[4px] px-2 text-[22px] leading-none text-chat-text transition hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Закрыть"
                        :disabled="isRemoveLocked"
                        @click="close"
                    >
                        ×
                    </button>
                </div>

                <div class="mt-5 space-y-3">
                    <p class="text-[16px] leading-relaxed">
                        Удалить {{ moderatorName }} из модераторов чата?
                    </p>
                    <p v-if="error" class="rounded-[8px] border border-chat-border bg-chat-surface px-4 py-3 text-[14px] text-chat-warning">
                        {{ error }}
                    </p>
                </div>

                <div class="mt-6 flex justify-end">
                    <button
                        type="button"
                        class="h-11 w-full rounded-[8px] bg-profile-logout-bg px-5 text-[14px] text-profile-logout-text transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        :disabled="isRemoveLocked"
                        @click="confirm"
                    >
                        <AppLoader v-if="isRemoveLocked" text="Удаляем" mode="inline" text-class="text-profile-logout-text" />
                        <span v-else>Удалить</span>
                    </button>
                </div>
            </section>
        </div>
    </Teleport>
</template>
