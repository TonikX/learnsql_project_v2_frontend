<script setup lang="ts">
import { computed } from 'vue'
import AppContainer from './AppContainer.vue'

const footerClass = computed(() => {
    return 'bg-[var(--color-footer)] text-[var(--color-footer-text)]'
})
</script>

<template>
    <footer :class="['font-mono transition-colors duration-200', footerClass]">
        <AppContainer class="py-9">
            <div class="flex flex-wrap items-center justify-between gap-5 text-[17px] font-medium">
                <p>© 2020-2026 LearnSQL</p>
                <p>Онлайн-платформа изучения SQL</p>

                <RouterLink to="/" class="hover:underline">Условия пользования</RouterLink>
                <RouterLink to="/" class="hover:underline">Справочник</RouterLink>
                <p>antongovorov@gmail.com</p>
            </div>
        </AppContainer>
    </footer>
</template>
