<script setup lang="ts">
import { computed } from 'vue'
import AppContainer from './AppContainer.vue'

const footerClass = computed(() => {
    return 'bg-[var(--color-footer)] text-[var(--color-footer-text)]'
})
</script>

<template>
    <footer :class="['font-mono transition-colors duration-200', footerClass]">
        <AppContainer class="py-7 sm:py-9">
            <div class="flex flex-col items-start gap-3 text-[14px] font-medium leading-relaxed sm:text-[15px] lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-5 lg:text-[17px]">
                <p>© 2020-2026 LearnSQL</p>
                <p>Онлайн-платформа изучения SQL</p>

                <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-5 lg:contents">
                    <RouterLink to="/" class="hover:underline">Условия пользования</RouterLink>
                    <RouterLink to="/" class="hover:underline">Справочник</RouterLink>
                    <p>antongovorov@gmail.com</p>
                </div>
            </div>
        </AppContainer>
    </footer>
</template>
