import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Course } from '@/types/courseTypes'

export const useCoursesStore = defineStore('courses', () => {
    const courses = ref<Course[]>([
        {
        id: 1,
        title: 'Оператор SELECT',
        description: 'Выборка данных, фильтры, сортировка, группировка.',
        level: 'Базовый',
        meta: 'Базовый • 24 задания • 2 часа',
        status: 'available',
        },
        {
        id: 2,
        title: 'Data Manipulation (DML)',
        description: 'INSERT, UPDATE, DELETE, изменение данных через SELECT.',
        level: 'Базовый',
        meta: 'Базовый • 18 заданий • 1.5 часа',
        status: 'available',
        },
        {
        id: 3,
        title: 'JOIN и связи таблиц',
        description: 'Соединения, условия, практика на реальных схемах.',
        level: 'Средний',
        meta: 'Средний • 20 заданий • 2.5 часа',
        status: 'soon',
        },
    ])

    const previewCourses = computed(() => courses.value.slice(0, 3))

    return { courses, previewCourses }
})