<script setup lang="ts">
import AppSectionTitle from '@/components/ui/AppSectionTitle.vue'
import AppCard from '@/components/ui/AppCard.vue'
</script>

<template>
    <section class="bg-surface2">
        <div class="app-container py-16">
        <AppSectionTitle
            title="Вы научитесь"
            subtitle="Ключевые навыки, которые вы закрепите на практике."
        />

        <div class="mt-10 grid gap-6 lg:grid-cols-3">
            <AppCard>
            <div class="text-base font-extrabold">Писать SELECT запросы</div>
            <p class="mt-2 text-sm font-semibold text-slate-600">Выборка, фильтрация, сортировка.</p>
            </AppCard>

            <AppCard>
            <div class="text-base font-extrabold">Использовать JOIN</div>
            <p class="mt-2 text-sm font-semibold text-slate-600">Работа с несколькими таблицами.</p>
            </AppCard>

            <AppCard>
            <div class="text-base font-extrabold">Группировать данные</div>
            <p class="mt-2 text-sm font-semibold text-slate-600">GROUP BY, HAVING, агрегаты.</p>
            </AppCard>

            <AppCard>
            <div class="text-base font-extrabold">Писать подзапросы</div>
            <p class="mt-2 text-sm font-semibold text-slate-600">Сложные выборки и условия.</p>
            </AppCard>

            <AppCard>
            <div class="text-base font-extrabold">Изменять данные (DML)</div>
            <p class="mt-2 text-sm font-semibold text-slate-600">INSERT, UPDATE, DELETE.</p>
            </AppCard>

            <AppCard>
            <div class="text-base font-extrabold">Понимать ошибки</div>
            <p class="mt-2 text-sm font-semibold text-slate-600">Отладка и улучшение запросов.</p>
            </AppCard>
        </div>
        </div>
    </section>
</template>