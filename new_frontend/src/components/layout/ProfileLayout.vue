<script setup lang="ts">
import ProfileSidebar from './ProfileSidebar.vue'
import ProfileTopbar from './ProfileTopbar.vue'
</script>

<template>
    <div class="min-h-screen bg-bg">
        <div class="flex">
        <ProfileSidebar />

        <div class="flex-1">
            <ProfileTopbar />

            <div class="app-container py-8">
            <RouterView />
            </div>
        </div>
        </div>
    </div>
</template>