<script setup lang="ts">
import AppContainer from '@/components/layout/AppContainer.vue'
import AppSectionTitle from '@/components/ui/AppSectionTitle.vue'
import CourseCard from '@/components/courses/CourseCard.vue'
import { useCoursesStore } from '@/stores/coursesMockStore'
import { storeToRefs } from 'pinia'

const store = useCoursesStore()
const { courses } = storeToRefs(store) 

</script>

<template>
    <AppContainer as="section" class="py-12">
        <!-- <AppSectionTitle title="Все курсы" subtitle="Выберите тему и начните практику." /> -->
        <div class="p-8 rounded-xl border-2 border-course-grid-stroke bg-course-grid">
            <p>> SELECT * FROM learnsql_courses;</p>

            <div class="-mx-8 my-8 border-t-2 border-course-grid-stroke"></div>
            <p>&emsp;-- Найдено {{ courses.length }} курса(-ов) (100 мс)</p>

            <div class="mt-8 grid gap-8 lg:grid-cols-2">
            <CourseCard
                v-for="c in store.courses"
                :course="c"
                to="/courses"
            />
            </div>
        </div>
    </AppContainer>
</template>