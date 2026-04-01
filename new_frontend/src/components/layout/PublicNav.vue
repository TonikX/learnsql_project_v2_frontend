<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isHome = computed(() => route.name === 'home')
</script>

<template>
    <nav class="hidden items-center gap-2 md:flex">
        <a v-if="isHome" href="#why" class="text-lg text-text-neg">
            [ Почему SQL ]
        </a>

        <a v-if="isHome" href="#steps" class="text-lg text-text-neg">
            [ Как работает ]
        </a>

        <a
            v-if="isHome"
            href="#courses"
            class="rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-primary-100"
        >
            Курсы
        </a>
    </nav>
</template>