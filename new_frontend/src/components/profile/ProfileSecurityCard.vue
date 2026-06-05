<script setup lang="ts">
defineEmits<{
    changePassword: []
}>()
</script>

<template>
    <aside class="rounded-[10px] border border-app-border bg-profile-card-gradient p-6 text-app-text shadow-card md:p-8">
        <h2 class="text-[25px] font-bold leading-tight">
            Безопасность
        </h2>

        <p class="mt-8 text-[16px] leading-relaxed md:text-[18px]">
            Пароль: **********
        </p>

        <button
            type="button"
            class="mt-4 h-14 w-full rounded-[8px] bg-primary-gradient px-5 text-[17px] text-white transition hover:opacity-95"
            @click="$emit('changePassword')"
        >
            Изменить пароль
        </button>

        <p class="mt-7 text-[16px] leading-relaxed md:text-[18px]">
            Для безопасности сначала подтвердите текущий пароль.
        </p>
    </aside>
</template>
