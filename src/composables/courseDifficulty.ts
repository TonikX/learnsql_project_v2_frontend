import type { Course } from '@/types/courseTypes';
import { computed, type Ref } from 'vue';

export default function useCourseDifficulty(course: Ref<Course | null>) {
    const difficulty = computed(() => {
        const times = course.value ? course.value.difficulty % 10 : 0
        return ['█'.repeat(times), '░'.repeat(10 - times)]
    })

    return difficulty 
} 