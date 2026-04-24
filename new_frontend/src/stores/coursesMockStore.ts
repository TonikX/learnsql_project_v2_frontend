import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Course } from '@/types/courseTypes'

export const useCoursesStore = defineStore('courses', () => {
    const courses = ref<Course[]>([
        {
            id: 1,
            title: 'Оператор SELECT',
            themes: ['Выборка данных', 'Фильтры, сортировка, группировка.'],
            level: 3,
            meta: 'Базовый | 24 задания | ~2 часа',
            status: 'available',
        },
        {
            id: 2,
            title: 'Data Manipulation (DML)',
            themes: ['INSERT, UPDATE, DELETE', 'Изменение данных через SELECT.'],
            level: 4,
            meta: 'Базовый | 18 заданий | ~1.5 часа',
            status: 'available',
        },
        {
            id: 3,
            title: 'JOIN и связи таблиц',
            themes: ['Соединения, условия', 'Практика на реальных схемах.'],
            level: 7,
            meta: 'Средний | 20 заданий | ~2.5 часа',
            status: 'soon',
        },
    ])

    const previewCourses = computed(() => courses.value.slice(0, 3))

    return { courses, previewCourses }
})