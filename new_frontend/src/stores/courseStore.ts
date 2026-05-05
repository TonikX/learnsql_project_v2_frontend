import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Course } from '@/types/courseTypes'
import courseService from '@/services/courseService'

export const useCoursesStore = defineStore('courses', () => {
    const courses = ref<Course[]>([])

    const currentCourse = ref<Course | null>(null)

    const previewCourses = computed(() => courses.value.slice(0, 3))

    const getCached = (courseId: number) : Course | null => {
        for (let c of courses.value) {
            if (c.id === courseId) return c as Course
        }

        return null
    }

    const getCourseData = async (courseId: number) => { 
        let courseData = getCached(courseId)
        
        // Fallback: load course from backend
        if (!courseData) {
            courseData = await courseService.getCourseById(courseId)
            if (courseData !== null)
                courses.value.push(courseData)
        }

        currentCourse.value = courseData
        return courseData
    }

    const clearCurrentCourse = () => { currentCourse.value = null }

    const loadAllCourses = async () => {
        const loadedCourses = await courseService.getAllCourses()
        courses.value = loadedCourses ?? []
    }

    const loadCourseStats = async (courseId: number, page: number) => {
        return courseService.getCourseStats(courseId, page)
    }

    return { 
        courses, 
        currentCourse, 
        previewCourses, 
        getCourseData,
        clearCurrentCourse,
        loadAllCourses,
        loadCourseStats,
    }
})