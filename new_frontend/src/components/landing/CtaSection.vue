<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
</script>

<template>
    <section class="app-container pb-16">
        <div class="rounded-3xl bg-primary-500 px-8 py-12 text-white md:px-12">
            <h3 class="text-3xl font-extrabold">Начните изучать SQL уже сегодня</h3>
            <p class="mt-3 text-base font-semibold text-white/90">
                Зарегистрируйтесь и откройте первый курс за минуту.
            </p>

            <div class="mt-8 flex flex-wrap gap-3">
                <AppButton variant="secondary" to="/register">Получить доступ</AppButton>
                <AppButton variant="ghost" to="/login" class="text-white ring-2 ring-white hover:bg-white/10">
                    Войти
                </AppButton>
            </div>
        </div>
    </section>
</template>