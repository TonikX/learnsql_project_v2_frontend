<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()
</script>

<template>
    <div class="border-b border-slate-200 bg-white">
        <div class="app-container flex h-16 items-center justify-between">
            <div class="text-sm font-extrabold text-slate-900">Личный кабинет</div>
            <AppButton variant="secondary" @click="auth.logout()">Выйти</AppButton>
        </div>
    </div>
</template>