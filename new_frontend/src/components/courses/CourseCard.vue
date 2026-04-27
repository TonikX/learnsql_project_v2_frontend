<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import useCourseDifficulty from '@/composables/courseDifficulty';
import type { Course } from '@/types/courseTypes';
import { toRefs, computed } from 'vue';

const props = defineProps<{
    course: Course
}>()

const { course } = toRefs(props)
const difficulty = useCourseDifficulty(course)
const courseLink = computed(() => {
    return course.value?.id 
        ? `/courses/${course.value.id}/` 
        : '/courses'; // fallback
});

</script>

<template>
    <div class="rounded-2xl p-6 bg-gradient-to-r from-course-card-begin to-course-card-end">
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

        <div class="mt-6 flex justify-end">
            <AppButton v-if="course.status !== 'soon'" :to="courseLink" size="md" variant="success">
                Открыть курс
            </AppButton>

            <AppButton v-else variant="ghost" disabled>
                Скоро
            </AppButton>
        </div>
    </div>
</template>
