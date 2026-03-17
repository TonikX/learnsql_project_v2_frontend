<script setup lang="ts">
import AppAvatar from '@/components/ui/AppAvatar.vue'
import { useUserStore } from '@/stores/userStore'

const user = useUserStore()

if (!user.user) {
  user.setMockUser()
}
</script>

<template>
    <aside class="hidden w-72 border-r border-slate-200 bg-white p-6 md:block">
        <div class="flex items-center gap-3">
        <AppAvatar :name="`${user.user?.firstName || ''} ${user.user?.lastName || ''}`" />

        <div>
            <div class="text-sm font-extrabold text-slate-900">
                {{ user.user?.firstName }} {{ user.user?.lastName }}
            </div>
            <div class="text-xs font-semibold text-slate-500">
                {{ user.user?.email }}
            </div>
        </div>
        </div>

        <nav class="mt-8 space-y-2">
        <RouterLink class="block rounded-xl px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100" to="/profile">
            Профиль
        </RouterLink>
        <RouterLink class="block rounded-xl px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100" to="/courses">
            Мои курсы
        </RouterLink>
        <RouterLink class="block rounded-xl px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100" to="/progress">
            Прогресс
        </RouterLink>
        <RouterLink class="block rounded-xl px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100" to="/settings">
            Настройки
        </RouterLink>
        </nav>
    </aside>
</template>