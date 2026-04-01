<script setup lang="ts">
import AppContainer from './AppContainer.vue'
</script>

<template>
  <footer>
    <AppContainer class="py-7">
      <div class="flex items-center justify-between">
        <p>© 2020-2026 LearnSQL</p>
        <p>Онлайн-платформа для изучения SQL</p>

        <RouterLink to="/" class="hover:underline">Условия пользования</RouterLink>
        <RouterLink to="/" class="hover:underline">Справочник</RouterLink>
        <p>antongovorov@gmail.com</p>
      </div>
    </AppContainer>
  </footer>
</template>
