<script setup lang="ts">
import AppSectionTitle from '@/components/ui/AppSectionTitle.vue'
import FeatureCard from './FeatureCard.vue'
</script>

<template>
    <section id="why" class="app-container scroll-mt-10 py-16">
        <AppSectionTitle
        title="Почему SQL"
        subtitle="SQL — базовый навык для работы с данными в современных сервисах."
        />

        <div class="mt-10 grid gap-6 lg:grid-cols-3">
        <FeatureCard title="База для данных" text="Используется в большинстве реляционных СУБД." dot="cyan" />
        <FeatureCard title="Нужен в профессиях" text="Backend, аналитика, QA, BI, data engineering." dot="green" />
        <FeatureCard title="Практический навык" text="Помогает быстро получать результат на реальных данных." dot="yellow" />
        </div>
    </section>
</template>