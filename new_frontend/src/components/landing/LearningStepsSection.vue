<script setup lang="ts">
import AppSectionTitle from '@/components/ui/AppSectionTitle.vue'
import AppCard from '@/components/ui/AppCard.vue'
</script>

<template>
  <section id="steps" class="app-container scroll-mt-10 py-16">
    <AppSectionTitle
      title="Как проходит обучение"
      subtitle="Путь от первого запроса до уверенного навыка."
    />

    <div class="mt-10 grid gap-6 lg:grid-cols-4">
      <AppCard>
        <div class="flex items-center gap-3">
          <div class="h-8 w-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-extrabold">1</div>
          <div class="text-base font-extrabold text-slate-900">Выберите курс</div>
        </div>
        <p class="mt-4 text-sm font-semibold text-slate-600">Начните с SELECT или DML — как удобнее.</p>
      </AppCard>

      <AppCard>
        <div class="flex items-center gap-3">
          <div class="h-8 w-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-extrabold">2</div>
          <div class="text-base font-extrabold text-slate-900">Изучите примеры</div>
        </div>
        <p class="mt-4 text-sm font-semibold text-slate-600">Короткая теория + примеры запросов.</p>
      </AppCard>

      <AppCard>
        <div class="flex items-center gap-3">
          <div class="h-8 w-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-extrabold">3</div>
          <div class="text-base font-extrabold text-slate-900">Решайте задачи</div>
        </div>
        <p class="mt-4 text-sm font-semibold text-slate-600">Пишите SQL и сразу проверяйте ответы.</p>
      </AppCard>

      <AppCard>
        <div class="flex items-center gap-3">
          <div class="h-8 w-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-extrabold">4</div>
          <div class="text-base font-extrabold text-slate-900">Отслеживайте прогресс</div>
        </div>
        <p class="mt-4 text-sm font-semibold text-slate-600">Видите, что уже освоено и что дальше.</p>
      </AppCard>
    </div>
  </section>
</template>