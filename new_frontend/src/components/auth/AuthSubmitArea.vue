<script setup lang="ts">
withDefaults(defineProps<{
    action: string
    loading?: boolean
    error?: string
    linkPrefix: string
    linkText: string
    linkTo: string
    hint: string
    buttonType?: 'button' | 'submit'
}>(), {
    buttonType: 'button',
})
</script>

<template>
    <div class="mt-10">
        <div class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <button
                :type="buttonType"
                class="h-12 min-w-[178px] rounded-[9px] bg-auth-button-gradient px-8 text-[22px] leading-none text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
                :disabled="loading"
            >
                {{ loading ? '...' : action }}
            </button>

            <p class="text-[18px] leading-none text-app-text">
                {{ linkPrefix }}
                <RouterLink :to="linkTo" class="ml-2 hover:text-primary-action">
                    [ {{ linkText }} ]
                </RouterLink>
            </p>
        </div>

        <p v-if="error" class="mt-6 rounded-[10px] border border-auth-border bg-auth-input px-4 py-3 text-[15px] text-danger">
            {{ error }}
        </p>

        <p class="mt-14 text-center text-[17px] leading-relaxed text-app-text">
            {{ hint }}
        </p>
    </div>
</template>
