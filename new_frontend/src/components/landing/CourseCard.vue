<script setup lang="ts">
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'

defineProps<{
    title: string
    description: string
    level: 'Базовый' | 'Средний' | 'Продвинутый'
    meta?: string
    status?: 'available' | 'soon'
    to?: string
}>()
</script>

<template>
    <div class="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
        <div class="flex items-start justify-between gap-4">
        <div>
            <div class="text-lg font-extrabold text-slate-900">{{ title }}</div>
            <div class="mt-2">
            <AppBadge :variant="level === 'Базовый' ? 'info' : level === 'Средний' ? 'warning' : 'danger'">
                {{ level }}
            </AppBadge>
            </div>
        </div>
        </div>

        <p class="mt-4 text-sm font-semibold text-slate-600">{{ description }}</p>
        <p v-if="meta" class="mt-3 text-sm font-semibold text-slate-500">{{ meta }}</p>

        <div class="mt-6">
        <AppButton
            v-if="status !== 'soon'"
            :to="to || '/courses'"
            size="md"
        >
            Открыть курс
        </AppButton>

        <AppButton v-else variant="secondary" disabled>
            Скоро
        </AppButton>
        </div>
    </div>
</template>