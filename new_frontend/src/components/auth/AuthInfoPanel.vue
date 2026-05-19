<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps<{
    variant: 'login' | 'register'
}>()

const stats = [
    { icon: 'stats-auth', value: '120+', label: 'уроков' },
    { icon: 'target', value: '500+', label: 'задач' },
    { icon: 'modules', value: '20+', label: 'модулей' },
]

const items = ['Решайте задачи', 'Следите за прогрессом', 'Получайте поддержку']
</script>

<template>
    <aside class="h-fit self-start overflow-hidden rounded-[10px] border border-auth-border bg-auth-info-surface-gradient text-app-text">
        <div class="bg-auth-info-header-gradient px-8 py-6 text-white">
            <h2 class="text-[30px] font-normal leading-tight">Изучайте SQL</h2>
            <p class="mt-1 text-[21px]">Шаг за шагом</p>
        </div>

        <div class="px-8 py-8">
            <div class="space-y-8">
                <div v-for="stat in stats" :key="stat.label" class="flex items-center gap-5">
                    <span class="flex h-[62px] w-[62px] items-center justify-center rounded-[15px] border border-auth-border bg-auth-input text-auth-checkbox">
                        <AppIcon :name="stat.icon" :size="34" />
                    </span>
                    <span>
                        <span class="block text-[25px] leading-none">{{ stat.value }}</span>
                        <span class="mt-2 block text-[20px] leading-none">{{ stat.label }}</span>
                    </span>
                </div>
            </div>

            <div class="mt-10 rounded-[15px] border border-auth-border bg-auth-input px-5 py-4">
                <p v-for="item in items" :key="item" class="py-2 text-[18px] leading-none">
                    • {{ item }}
                </p>
            </div>
        </div>
    </aside>
</template>
