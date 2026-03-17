<script setup lang="ts">
import AppSectionTitle from '@/components/ui/AppSectionTitle.vue'
import AppCard from '@/components/ui/AppCard.vue'
</script>

<template>
    <section class="bg-surface2">
        <div class="app-container py-16">
        <AppSectionTitle
            title="Что дает LearnSQL"
            subtitle="Понятные курсы, практика и прогресс — в одном месте."
        />

        <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <AppCard hoverable>
            <div class="h-12 w-12 rounded-2xl bg-primary-50"></div>
            <div class="mt-5 text-base font-extrabold text-slate-900">Интерактивные задания</div>
            <p class="mt-2 text-sm font-semibold text-slate-600">Сразу пишете запросы и видите результат.</p>
            </AppCard>

            <AppCard hoverable>
            <div class="h-12 w-12 rounded-2xl bg-primary-50"></div>
            <div class="mt-5 text-base font-extrabold text-slate-900">Уровни сложности</div>
            <p class="mt-2 text-sm font-semibold text-slate-600">От базовых тем до сложных задач.</p>
            </AppCard>

            <AppCard hoverable>
            <div class="h-12 w-12 rounded-2xl bg-primary-50"></div>
            <div class="mt-5 text-base font-extrabold text-slate-900">Треки обучения</div>
            <p class="mt-2 text-sm font-semibold text-slate-600">Двигаетесь шаг за шагом без хаоса.</p>
            </AppCard>

            <AppCard hoverable>
            <div class="h-12 w-12 rounded-2xl bg-primary-50"></div>
            <div class="mt-5 text-base font-extrabold text-slate-900">Курсы от преподавателей</div>
            <p class="mt-2 text-sm font-semibold text-slate-600">Авторская структура и проверенные темы.</p>
            </AppCard>
        </div>
        </div>
    </section>
</template>