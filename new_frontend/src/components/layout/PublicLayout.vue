<script setup lang="ts">
import TheHeader from './TheHeader.vue'
import TheFooter from './TheFooter.vue'
import { useRoute } from 'vue-router'

const router = useRoute()
</script>

<template>
    <div>
        <TheHeader />
        <main>
            <RouterView />
        </main>
        <TheFooter v-if="!router.meta.hideFooter"/>
    </div>
</template>