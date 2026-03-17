<script setup lang="ts">
import AppContainer from './AppContainer.vue'
</script>

<template>
  <footer class="mt-24 bg-[#0B1220] text-white">
    <AppContainer class="py-7">
      <div class="grid gap-10 md:grid-cols-3">
        <div>
          <div class="text-lg font-extrabold">LearnSQL</div>
          <p class="mt-2 text-sm font-semibold text-[#9FB0FF]">
            Онлайн-платформа для изучения SQL
          </p>
        </div>

        <div>
          <div class="text-sm font-bold text-slate-300">Контакты</div>
          <div class="mt-2 text-sm font-bold">antongovorov@gmail.com</div>
        </div>

        <div>
          <div class="text-sm font-bold text-slate-300">Разделы</div>
          <div class="mt-2 flex flex-wrap gap-4 text-sm font-bold">
            <RouterLink to="/courses" class="hover:underline">Курсы</RouterLink>
            <RouterLink to="/login" class="hover:underline">Вход</RouterLink>
            <RouterLink to="/register" class="hover:underline">Регистрация</RouterLink>
          </div>
        </div>
      </div>
    </AppContainer>
  </footer>
</template>