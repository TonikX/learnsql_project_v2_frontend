<script setup lang="ts">
import AppLoader from '@/components/ui/AppLoader.vue'

withDefaults(defineProps<{
    action: string
    loading?: boolean
    loadingText?: string
    error?: string
    linkPrefix: string
    linkText: string
    linkTo: string
    hint?: string
    buttonType?: 'button' | 'submit'
}>(), {
    buttonType: 'button',
    loadingText: 'Загрузка',
})
</script>

<template>
    <div class="mt-10">
        <div class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <button
                :type="buttonType"
                class="h-12 w-full rounded-[9px] bg-auth-button-gradient px-8 text-[22px] leading-none text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-[178px]"
                :disabled="loading"
            >
                <AppLoader v-if="loading" :text="loadingText" mode="inline" text-class="text-white" />
                <span v-else>{{ action }}</span>
            </button>

            <p class="text-center text-[15px] leading-snug text-app-text sm:text-right sm:text-[18px] sm:leading-none">
                {{ linkPrefix }}
                <RouterLink :to="linkTo" class="ml-2 whitespace-nowrap hover:text-primary-action">
                    [ {{ linkText }} ]
                </RouterLink>
            </p>
        </div>

        <p v-if="error" class="mt-6 rounded-[10px] border border-auth-border bg-auth-input px-4 py-3 text-[15px] text-danger">
            {{ error }}
        </p>

        <p v-if="hint" class="mx-auto mt-6 max-w-[360px] text-center text-[13px] leading-relaxed text-app-text sm:mt-14 sm:max-w-none sm:text-[17px]">
            {{ hint }}
        </p>
    </div>
</template>
