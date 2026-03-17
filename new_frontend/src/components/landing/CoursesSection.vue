<script setup lang="ts">
import AppSectionTitle from '@/components/ui/AppSectionTitle.vue'
import CourseCard from './CourseCard.vue'
import { useCoursesStore } from '@/stores/coursesStore'

const store = useCoursesStore()
</script>

<template>
    <section id="courses" class="app-container scroll-mt-10 py-16">
        <AppSectionTitle
        title="Курсы"
        subtitle="Начните с базовых тем и двигайтесь дальше."
        />

        <div class="mt-10 grid gap-6 lg:grid-cols-3">
        <CourseCard
            v-for="c in store.previewCourses"
            :key="c.id"
            :title="c.title"
            :description="c.description"
            :level="c.level"
            :meta="c.meta"
            :status="c.status"
            to="/courses"
        />
        </div>
    </section>
</template>