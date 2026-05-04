<script setup lang="ts">
import { storeToRefs } from 'pinia'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useThemeStore } from '@/stores/themeStore'
import DatabaseSchemaIllustration from './DatabaseSchemaIllustration.vue'
import {
    landingFeatures,
    landingStats,
    learningSteps,
} from './landingContent'

type LearningStep = typeof learningSteps[number]

const themeStore = useThemeStore()
const { resolvedTheme } = storeToRefs(themeStore)

function getFeatureIconClass() {
    return resolvedTheme.value === 'dark' ? 'text-white' : 'text-primary-action'
}

function getStepIndicatorClass(step: LearningStep) {
    if (step.statusTone === 'success') {
        return resolvedTheme.value === 'dark'
            ? 'border-2 border-white bg-white text-black'
            : 'border-2 border-primary-action bg-primary-action text-white'
    }

    if (step.number === '3') {
        return resolvedTheme.value === 'dark'
            ? 'border-2 border-white bg-card-surface-gradient text-white'
            : 'border-2 border-primary-action bg-card text-app-text'
    }

    return resolvedTheme.value === 'dark'
        ? 'border border-app-border bg-card-surface-gradient text-white'
        : 'border border-app-border-soft bg-status-progress-bg text-app-text'
}
</script>

<template>
    <div class="min-h-screen bg-page font-mono text-app-text transition-colors duration-200">
        <main>
            <section class="mx-auto w-full max-w-[1635px] px-4 pt-8 sm:px-5 sm:pt-[46px]">
                <div class="overflow-hidden rounded-[9px] border-2 border-app-border bg-panel-gradient xl:min-h-[847px]">
                    <div class="border-b-2 border-app-border bg-panel-gradient px-4 py-4 text-[18px] leading-tight text-app-text sm:px-5 sm:py-[22px] sm:text-[32px]">
                        &gt; SELECT * FROM learnsql_courses;
                    </div>

                    <div class="grid gap-10 px-4 py-8 md:px-8 lg:grid-cols-2 xl:grid-cols-[780px_1fr] xl:gap-[120px] xl:px-[38px] xl:pb-[73px] xl:pt-[79px]">
                        <div class="flex flex-col justify-center">
                            <h1 class="max-w-[680px] text-[34px] font-medium leading-[1.18] text-app-text sm:text-[42px] xl:text-[52px]">
                                Изучайте SQL через<br />практику
                            </h1>

                            <p class="mt-8 max-w-[660px] text-[16px] leading-[1.25] text-app-text sm:text-[18px] xl:mt-[67px] xl:text-[21px] xl:leading-[1.2]">
                                Решайте реальные задачи, получайте обратную связь и отслеживайте свой прогресс на онлайн платформе по изучению SQL от преподавателей ИТМО
                            </p>

                            <div class="mt-7 flex flex-wrap gap-3 sm:gap-5 xl:mt-[46px]">
                                <RouterLink
                                    to="/register"
                                    class="inline-flex h-11 w-full items-center justify-center gap-3 rounded-[8px] bg-primary-gradient text-[14px] text-white shadow-sm transition hover:opacity-90 sm:w-[240px] xl:h-[54px] xl:text-[16px]"
                                >
                                    <AppIcon name="play" :size="20" />
                                    Начать обучение
                                </RouterLink>
                                <RouterLink
                                    to="/courses"
                                    class="inline-flex h-11 w-full items-center justify-center gap-3 rounded-[8px] border-2 border-app-border bg-surface-contrast text-[14px] text-app-text transition hover:bg-panel sm:w-[240px] xl:h-[54px] xl:text-[16px]"
                                >
                                    <AppIcon name="book" :size="24" />
                                    Смотреть курсы
                                </RouterLink>
                            </div>

                            <div class="mt-10 grid max-w-[805px] grid-cols-2 items-center gap-y-6 rounded-[19px] border-2 border-app-border bg-card-surface-gradient px-5 py-7 sm:grid-cols-4 xl:mt-[77px] xl:h-[150px] xl:px-[48px] xl:py-0">
                                <div
                                    v-for="(stat, index) in landingStats"
                                    :key="stat.label"
                                    :class="[
                                        'px-4 text-center xl:px-9',
                                        index !== landingStats.length - 1 ? 'sm:border-r-2 sm:border-app-border' : '',
                                    ]"
                                >
                                    <div class="text-[24px] font-bold leading-none text-app-text">{{ stat.value }}</div>
                                    <div class="mt-2 text-[12px] leading-none text-app-text">{{ stat.label }}</div>
                                </div>
                            </div>
                        </div>

                        <div class="w-full self-start overflow-hidden rounded-[19px] border-2 border-app-border bg-card-surface-gradient">
                            <div class="flex min-h-[52px] items-center justify-between gap-4 border-b-2 border-app-border px-4 py-3 text-[12px] text-app-text sm:text-[14px] xl:h-[70px] xl:px-[28px] xl:py-0 xl:text-[16px]">
                                <span>&gt;&gt;&gt; editor / result / schema</span>
                                <span>[ v1 ]</span>
                            </div>

                            <div class="grid gap-4 p-4 sm:grid-cols-[minmax(0,356px)_minmax(150px,178px)] sm:justify-between xl:gap-[20px] xl:p-[24px]">
                                <div class="rounded-[13px] border-2 border-app-border bg-inner-panel-gradient">
                                    <div class="border-b-2 border-app-border px-[24px] py-[17px] text-[12px] text-app-text">query.sql</div>
                                    <div class="space-y-4 px-5 py-6 text-[15px] leading-none sm:text-[17px] xl:space-y-[22px] xl:px-[38px] xl:py-[32px] xl:text-[20px]">
                                        <p><span class="text-app-text">1</span>&nbsp;&nbsp;SELECT <span class="text-sql-pink">u.name</span>,</p>
                                        <p><span class="text-app-text">2</span>&nbsp;&nbsp;<span class="text-primary-action">COUNT(*)</span> AS orders</p>
                                        <p><span class="text-app-text">3</span>&nbsp;&nbsp;FROM users u</p>
                                        <p><span class="text-app-text">4</span>&nbsp;&nbsp;JOIN orders o ON</p>
                                        <p><span class="text-app-text">5</span>&nbsp;&nbsp;o.user_id = u.id;</p>
                                    </div>
                                </div>

                                <div class="rounded-[13px] border-2 border-app-border bg-inner-panel-gradient">
                                    <div class="border-b-2 border-app-border px-[24px] py-[17px] text-[12px] text-app-text">result</div>
                                    <div class="space-y-[14px] p-[24px] text-[12px]">
                                        <div class="grid h-[47px] grid-cols-[1fr_auto] items-center rounded-[9px] border border-app-border bg-result-header px-[16px]">
                                            <span>name</span>
                                            <span class="justify-self-end text-right">orders</span>
                                        </div>
                                        <div class="grid h-[47px] grid-cols-[1fr_auto] items-center rounded-[9px] border border-app-border px-[16px]">
                                            <span>Anna</span>
                                            <span class="justify-self-end text-right">14</span>
                                        </div>
                                        <div class="grid h-[47px] grid-cols-[1fr_auto] items-center rounded-[9px] border border-app-border px-[16px]">
                                            <span>Mark</span>
                                            <span class="justify-self-end text-right">11</span>
                                        </div>
                                        <div class="grid h-[47px] grid-cols-[1fr_auto] items-center rounded-[9px] border border-app-border px-[16px]">
                                            <span>Iris</span>
                                            <span class="justify-self-end text-right">8</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="grid gap-4 px-4 pb-4 sm:grid-cols-[minmax(0,252px)_minmax(0,276px)] sm:justify-between xl:gap-[20px] xl:px-[24px] xl:pb-[24px]">
                                <div class="rounded-[13px] border-2 border-app-border bg-inner-panel-gradient px-[34px] py-[25px]">
                                    <div class="text-[12px] text-app-text">Схема</div>
                                    <div class="mx-auto mt-[43px] w-[164px]">
                                        <DatabaseSchemaIllustration />
                                    </div>
                                    <p class="mt-[23px] text-center text-[12px] text-app-text">таблицы, поля и связи</p>
                                </div>

                                <div class="rounded-[13px] border-2 border-app-border bg-inner-panel-gradient px-[35px] py-[25px]">
                                    <div class="text-[12px] text-app-text">Прогресс</div>
                                    <div class="mt-[31px] space-y-[29px] text-[14px]">
                                        <div>
                                            <div class="flex justify-between"><span>SELECT</span><span>65%</span></div>
                                            <div class="mt-[14px] h-[11px] rounded-full bg-progress-track">
                                                <div class="h-full w-[65%] rounded-full bg-primary-action"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="flex justify-between"><span>JOIN</span><span>35%</span></div>
                                            <div class="mt-[14px] h-[11px] rounded-full bg-progress-track">
                                                <div class="h-full w-[35%] rounded-full bg-progress-green"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="mx-auto mt-14 w-full max-w-[1635px] px-4 sm:px-5 xl:mt-[110px]">
                <div class="rounded-[9px] border-2 border-app-border bg-panel-gradient px-5 py-10 sm:px-8 xl:min-h-[523px] xl:px-[38px] xl:py-[58px]">
                    <div class="text-center">
                        <h2 class="text-[28px] font-medium leading-tight text-app-text sm:text-[34px] xl:text-[40px]">Всё необходимое для изучения SQL</h2>
                        <p class="mx-auto mt-3 max-w-[670px] text-[14px] leading-[1.45] text-app-muted sm:text-[16px]">
                            Современная платформа для эффективного изучения SQL с акцентом на практику и результат
                        </p>
                    </div>

                    <div class="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:mt-[62px] xl:gap-[95px]">
                        <article
                            v-for="feature in landingFeatures"
                            :key="feature.title"
                            class="min-h-[180px] rounded-[19px] border border-app-border bg-card-surface-gradient px-[23px] py-[26px] xl:min-h-[221px]"
                        >
                            <div
                                class="flex h-[45px] w-[45px] items-center justify-center rounded-[10px] bg-icon-box"
                                :class="getFeatureIconClass()"
                            >
                                <AppIcon :name="feature.icon" :size="23" />
                            </div>
                            <h3 class="mt-6 text-[16px] font-normal leading-tight text-app-text xl:mt-[34px]">{{ feature.title }}</h3>
                            <p class="mt-[18px] text-[12px] leading-[1.35] text-app-muted">{{ feature.text }}</p>
                        </article>
                    </div>
                </div>
            </section>

            <section class="mx-auto mt-16 w-full max-w-[880px] px-4 pb-16 sm:px-5 xl:mt-[135px] xl:pb-[90px]">
                <div class="text-center">
                    <h2 class="text-[28px] font-medium leading-tight text-app-text sm:text-[34px] xl:text-[40px]">Ваш путь в изучении SQL</h2>
                    <p class="mt-4 text-[14px] text-app-muted sm:text-[16px]">Структурированная программа от основ до продвинутых техник</p>
                </div>

                <div class="relative mt-10 xl:mt-[70px]">
                    <div class="absolute bottom-[55px] left-[24px] top-[24px] border-l-2 border-app-border sm:bottom-[60px] sm:left-[32px] sm:top-[32px]"></div>

                    <div
                        v-for="step in learningSteps"
                        :key="step.title"
                        class="relative grid grid-cols-[48px_1fr] gap-4 pb-[23px] sm:grid-cols-[64px_1fr] sm:gap-[24px]"
                    >
                        <div
                            :class="[
                                'z-10 flex h-12 w-12 items-center justify-center rounded-[12px] text-[18px] sm:h-[64px] sm:w-[64px] sm:text-[24px]',
                                getStepIndicatorClass(step),
                            ]"
                        >
                            <AppIcon v-if="step.icon" :name="step.icon" :size="22" />
                            <span v-else>{{ step.number }}</span>
                        </div>

                        <article class="min-h-[92px] rounded-[12px] border border-app-border-soft bg-panel-gradient px-4 py-4 sm:px-[28px] sm:py-[21px]">
                            <div class="flex items-start justify-between gap-3">
                                <div>
                                    <h3 class="text-[16px] font-normal text-app-text sm:text-[18px]">{{ step.title }}</h3>
                                    <p class="mt-[10px] text-[12px] font-normal text-app-muted sm:text-[13px]">{{ step.text }}</p>
                                </div>
                                <span
                                    v-if="step.status"
                                    :class="[
                                        'shrink-0 rounded-full px-[10px] py-[5px] text-[11px]',
                                        step.statusTone === 'success'
                                            ? 'bg-status-success-bg text-status-success-text'
                                            : 'bg-status-progress-bg text-status-progress-text',
                                    ]"
                                >
                                    {{ step.status }}
                                </span>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section class="min-h-[360px] bg-panel-gradient py-10 text-center text-app-text xl:min-h-[450px] xl:py-[42px]">
                <div class="mx-auto max-w-[980px] px-5">
                    <div class="mx-auto inline-flex h-[35px] items-center gap-2 rounded-[10px] border border-app-border bg-surface-contrast px-[18px] text-[12px] text-app-text">
                        <AppIcon name="spark" :size="20" class="text-app-text" />
                        Присоединяйтесь к LearnSQL
                    </div>
                    <h2 class="mt-7 text-[30px] font-medium leading-tight sm:text-[38px] xl:mt-[34px] xl:whitespace-nowrap xl:text-[48px]">Начните изучать SQL уже сегодня</h2>
                    <p class="mt-5 text-[15px] leading-[1.35] text-app-muted sm:text-[18px] xl:mt-[28px]">
                        Решайте задачи, проходите курсы, отслеживайте прогресс и становитесь<br class="hidden xl:block" />
                        экспертом SQL на современной платформе обучения
                    </p>

                    <div class="mt-8 flex flex-wrap justify-center gap-4 xl:mt-[45px]">
                        <RouterLink to="/register" class="inline-flex h-12 w-full items-center justify-center rounded-[8px] bg-primary-gradient text-[14px] text-white transition hover:opacity-90 sm:w-[214px] xl:h-[54px] xl:text-[16px]">
                            Начать обучение
                        </RouterLink>
                        <RouterLink to="/login" class="inline-flex h-12 w-full items-center justify-center rounded-[8px] border border-app-border bg-surface-contrast text-[14px] text-app-text transition hover:bg-panel sm:w-[129px] xl:h-[54px] xl:text-[16px]">
                            Войти
                        </RouterLink>
                    </div>

                    <div class="mt-8 flex flex-wrap justify-center gap-5 text-[12px] sm:gap-[62px] sm:text-[14px] xl:mt-[45px]">
                        <span class="inline-flex items-center gap-1"><AppIcon name="check-circle" :size="20" class="text-primary-action" /> Бесплатный доступ</span>
                        <span class="inline-flex items-center gap-1"><AppIcon name="check-circle" :size="20" class="text-primary-action" /> Поддержка 24/7</span>
                        <span class="inline-flex items-center gap-1"><AppIcon name="check-circle" :size="20" class="text-primary-action" /> 500+ задач</span>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>
