<script setup lang="ts">
import { computed } from 'vue'
import AppContainer from './AppContainer.vue'

const footerClass = computed(() => {
    return 'bg-[var(--color-footer)] text-[var(--color-footer-text)]'
})
</script>

<template>
    <footer :class="['font-mono transition-colors duration-200', footerClass]">
        <AppContainer class="py-5 sm:py-7 lg:py-9">
            <div class="grid grid-cols-2 items-center gap-x-4 gap-y-2 text-[13px] font-medium leading-relaxed sm:text-[15px] md:flex md:flex-wrap md:items-center md:justify-between md:gap-x-5 md:gap-y-3 lg:flex-nowrap lg:text-[17px]">
                <p class="col-span-2 md:col-auto">© 2020-2026 LearnSQL</p>
                <p class="col-span-2 md:col-auto">Онлайн-платформа изучения SQL</p>

                <RouterLink to="/feedback" class="transition hover:underline">Обратная связь</RouterLink>
                <RouterLink to="/faq" class="text-right transition hover:underline min-[480px]:text-left">Справочник</RouterLink>
                <p class="col-span-2 break-words md:col-auto">antongovorov@gmail.com</p>
            </div>
        </AppContainer>
    </footer>
</template>
