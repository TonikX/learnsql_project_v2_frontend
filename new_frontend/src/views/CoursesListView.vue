<script setup lang="ts">
import AppContainer from '@/components/layout/AppContainer.vue'
import CourseCard from '@/components/courses/CourseCard.vue'
import { useCoursesStore } from '@/stores/courseStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const store = useCoursesStore()
const { loadAllCourses } = store
const { courses } = storeToRefs(store)

onMounted(async () => { await loadAllCourses() })
</script>

<template>
    <AppContainer as="section" class="py-12">
        <div class="p-8 rounded-xl border-2 border-course-grid-stroke bg-course-grid">
            <p>> SELECT * FROM learnsql_courses;</p>

            <div class="-mx-8 my-8 border-t-2 border-course-grid-stroke"></div>
            <p>&emsp;-- Найдено {{ courses.length }} курса(-ов) (100 мс)</p>

            <div class="mt-8 grid gap-8 lg:grid-cols-2">
            <CourseCard
                v-for="c in courses"
                :course="c"
            />
            </div>
        </div>
    </AppContainer>
</template>