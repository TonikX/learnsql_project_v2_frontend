<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import type { Course } from '@/types/courseTypes';
import { computed } from 'vue';

const props = defineProps<{
    course: Course
    to?: string
}>()

const difficulty = computed(() => {
    const times = props.course.level % 10
    return ['█'.repeat(times), '░'.repeat(10 - times)]
})

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
            <AppButton v-if="course.status !== 'soon'" :to="to || '/courses'" size="md" variant="success">
                Открыть курс
            </AppButton>

            <AppButton v-else variant="ghost" disabled>
                Скоро
            </AppButton>
        </div>
    </div>
</template>
