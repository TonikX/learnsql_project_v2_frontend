<script setup lang="ts">
import AppSectionTitle from '@/components/ui/AppSectionTitle.vue'
import CourseCard from '../courses/CourseCard.vue'
import { useCoursesStore } from '@/stores/courseStore'

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
            :course="c"
            to="/courses"
        />
        </div>
    </section>
</template>