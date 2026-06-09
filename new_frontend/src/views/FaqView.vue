<script setup lang="ts">
import AppContainer from '@/components/layout/AppContainer.vue'

const faqItems = [
    {
        question: 'В чем предназначение ресурса?',
        answer: 'Данный ресурс предназначен для получения базовых и углубленных навыков работы с языком SQL.',
    },
    {
        question: 'Для кого подойдут эти курсы?',
        answer: 'Платформа может использоваться для подготовки специалистов высшего, среднего профессионального и дополнительного профессионального образования, а также всеми желающими освоить SQL.',
    },
    {
        question: 'Зачем разработчику изучать базы данных?',
        answer: 'Базы данных — это организованная специальным образом структура, которая умеет хранить, обрабатывать и изменять информацию в различных объемах. Если вы будете делать веб-приложение — например интернет-магазин, блог или игры, — почти наверняка вы столкнётесь с базой данных.',
    },
    {
        question: 'Почему именно SQL?',
        answer: 'SQL — язык для общения с базами данных. Зная синтаксис написания SQL-запросов, вы сможете работать с любой СУБД: SQLite, MySQL, PostgreSQL, Microsoft SQL Server, Oracle.',
    },
]
</script>

<template>
    <main class="min-h-full bg-page py-10 font-mono text-app-text sm:py-14">
        <AppContainer class="space-y-8">
            <header class="max-w-4xl space-y-3">
                <h1 class="text-[30px] font-bold leading-tight sm:text-[40px]">
                    &gt;_ FAQ
                </h1>
                <p class="max-w-3xl text-[15px] leading-7 text-app-text sm:text-[17px]">
                    Ответы на основные вопросы о назначении платформы и изучении SQL.
                </p>
            </header>

            <section class="grid gap-4">
                <article
                    v-for="item in faqItems"
                    :key="item.question"
                    class="rounded-[8px] border border-app-border bg-card p-5 shadow-card sm:p-6"
                >
                    <h2 class="text-[18px] font-bold leading-snug sm:text-[22px]">
                        {{ item.question }}
                    </h2>
                    <div class="my-4 h-px bg-app-border-soft"></div>
                    <p class="text-[15px] leading-7 text-app-text sm:text-[17px]">
                        {{ item.answer }}
                    </p>
                </article>
            </section>
        </AppContainer>
    </main>
</template>
