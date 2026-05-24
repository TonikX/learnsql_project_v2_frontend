<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import useCourseDifficulty from '@/composables/courseDifficulty';
import type { Course } from '@/types/courseTypes';
import { toRefs, computed } from 'vue';

const props = defineProps<{
    course: Course,
    isEnrolled: boolean,
}>()

const emits = defineEmits(['enrollCourse', ])

const { course } = toRefs(props)
const difficulty = useCourseDifficulty(course)
const courseLink = computed(() => {
    return course.value?.id 
        ? `/courses/${course.value.id}/` 
        : '/courses/all'; // fallback
})

const available = computed(() => course.value.status !== 'soon')
</script>

<template>
    <div class="flex flex-col h-full rounded-2xl p-6 bg-gradient-to-r from-course-card-begin to-course-card-end">
        <div class="flex justify-between text-lg text-text-main">
            <p>{{ course.title }}</p> <p>***</p>
        </div>
        
        <hr class="mt-4 border-text-main">

        <p class="mt-4">Темы:</p>
        <p v-for="theme in course.themes">
            &emsp;▸ {{ theme }}
        </p>
        <p class="mt-4">Сложность: <span class="text-yellow-500">{{ difficulty[0] }}</span>{{ difficulty[1] }}</p>
        <p v-if="course.meta" class="mt-3">{{ course.meta }}</p>

        <div class="mt-auto pt-6 flex self-end justify-end">
            <AppButton v-if="available && isEnrolled" :to="courseLink" size="md" variant="success">
                Открыть курс
            </AppButton>

            <AppButton v-if="available && !isEnrolled" @click="$emit('enrollCourse', course.id)" size="md" variant="primary">
                Записаться >>
            </AppButton>

            <AppButton v-if="!available" variant="ghost" disabled>
                Скоро
            </AppButton>
        </div>
    </div>
</template>
