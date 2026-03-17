<script setup lang="ts">
import TheHeader from './TheHeader.vue'
import TheFooter from './TheFooter.vue'
</script>

<template>
    <div>
        <TheHeader />
        <main>
            <RouterView />
        </main>
        <TheFooter />
    </div>
</template>