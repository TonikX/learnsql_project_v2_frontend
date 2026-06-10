<script setup lang="ts">
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import AppContainer from '@/components/layout/AppContainer.vue'
import CourseCard from '@/components/courses/CourseCard.vue'
import { useCoursesStore } from '@/stores/courseStore'
import type { Course } from '@/types/courseTypes'


const route = useRoute()
const props = defineProps({
    enrolledOnly: {
        type: Boolean,
        default: false
    }
})

const store = useCoursesStore()
const { courses } = storeToRefs(store)
const { loadAllCourses, enrollToCourse, loadEnrolledCourses, isEnrolled } = store
const showCourses = ref<Course[]>([])

const syncCourseListData = async () => {
    if (courses.value.length == 0) {
        await Promise.all([loadAllCourses(), loadEnrolledCourses()])
    }
        
    showCourses.value = props.enrolledOnly ? courses.value.filter(c => isEnrolled(c.id)) : Array.from(courses.value)
}

const handleCourseEnrollmentRequest = async (courseId: number) => {
    await enrollToCourse(courseId)
    await syncCourseListData()
}

watch(() => route.path, async () => await syncCourseListData(), { immediate: true })
</script>

<template>
    <AppContainer as="section" class="py-6 md:py-12">
        <div class="p-4 md:p-8 rounded-xl border-2 border-course-grid-stroke bg-course-grid">
            <p>> SELECT * FROM learnsql_courses;</p>

            <div class="-mx-4 my-4 md:-mx-8 md:my-8 border-t-2 border-course-grid-stroke"></div>
            <p>&emsp;-- Найдено {{ showCourses.length }} курса(-ов) ({{ Math.floor(Math.random() * 100) + 50 }} мс)</p>

            <div class="mt-4 md:mt-8 grid gap-4 md:gap-8 lg:grid-cols-2">
            <CourseCard
                v-for="c in showCourses"
                :course="c"
                :key="c.id"
                :is-enrolled="isEnrolled(c.id)"
                @enroll-course="handleCourseEnrollmentRequest"
            />
            </div>
        </div>
    </AppContainer>
</template>