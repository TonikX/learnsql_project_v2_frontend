<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import type { SocialAuthProvider } from '@/types/userTypes'

defineProps<{
    loadingProvider?: SocialAuthProvider | null
    error?: string
}>()

const emit = defineEmits<{
    select: [provider: SocialAuthProvider]
}>()

const providers: Array<{
    label: string
    ariaLabel: string
    icon: string
    value: SocialAuthProvider
    title?: string
}> = [
    {
        label: '[GitHub]',
        ariaLabel: 'Войти через GitHub',
        icon: 'github',
        value: 'github',
    },
    {
        label: '[Яндекс]',
        ariaLabel: 'Войти через Яндекс',
        icon: 'yandex',
        value: 'yandex',
    },
    {
        label: '[Google]',
        ariaLabel: 'Войти через Google',
        icon: 'google',
        value: 'google-oauth2',
    },
]
</script>

<template>
    <div class="mt-8">
        <div class="flex items-center gap-3 sm:gap-4">
            <span class="h-px flex-1 bg-auth-separator" aria-hidden="true" />
            <span class="whitespace-nowrap text-center text-[13px] text-app-text sm:text-[15px]">Войти с помощью</span>
            <span class="h-px flex-1 bg-auth-separator" aria-hidden="true" />
        </div>

        <div class="mt-5 grid gap-3 sm:grid-cols-3">
            <button
                v-for="provider in providers"
                :key="provider.value"
                type="button"
                class="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-auth-social-button-border bg-auth-social-button px-4 text-[15px] text-auth-social-button-text transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-action/50 disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="Boolean(loadingProvider)"
                :title="provider.title"
                :aria-label="provider.ariaLabel"
                @click="emit('select', provider.value)"
            >
                <AppIcon :name="provider.icon" :size="20" />
                <span class="whitespace-nowrap">{{ loadingProvider === provider.value ? '...' : provider.label }}</span>
            </button>
        </div>

        <p v-if="error" class="mt-4 rounded-[10px] border border-auth-border bg-auth-input px-4 py-3 text-[15px] text-danger">
            {{ error }}
        </p>
    </div>
</template>
