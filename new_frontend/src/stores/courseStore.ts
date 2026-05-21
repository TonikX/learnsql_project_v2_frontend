import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Course } from '@/types/courseTypes'
import courseService from '@/services/courseService'
import { sleep } from "@/utils/Sleep"


export const useCoursesStore = defineStore('courses', () => {
    const courses = ref<Course[]>([])

    const currentCourse = ref<Course | null>(null)

    const courseLoading = ref(false)

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

    const toggleCourseLoading = async (func: (...params: any) => Promise<any>, ...params: any) => {
        courseLoading.value = true
        const res = await func(...params)
        await sleep(1000)
        courseLoading.value = false
        return res
    }

    return { 
        courses, 
        currentCourse, 
        courseLoading,
        previewCourses, 
        getCourseData,
        clearCurrentCourse,
        loadAllCourses,
        loadCourseStats,
        toggleCourseLoading
    }
})