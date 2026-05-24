import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Course, StudentCourse } from '@/types/courseTypes'
import courseService from '@/services/courseService'
import { sleep } from "@/utils/asyncSleep"


export const useCoursesStore = defineStore('courses', () => {
    const courses = ref<Course[]>([])
    const enrolledIds: Set<number> = new Set()
    const currentCourse = ref<Course | null>(null)
    const courseLoading = ref(false)

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
        }

        return courseData
    }

    const loadCurrentCourse = async (courseId: number) => { currentCourse.value = await getCourseData(courseId)}
    
    const loadAllCourses = async () => {
        const loadedCourses = await courseService.getAllCourses()
        courses.value = loadedCourses
        return loadedCourses
    }

    const loadEnrolledCourses = async () => {
        const enrollmentList: StudentCourse[] = await courseService.getStudentCourses()

        for (const enrollment of enrollmentList) {
            enrolledIds.add(enrollment.course)
        }
    }

    const loadCourseStats = async (courseId: number, page: number) => {
        return courseService.getCourseStats(courseId, page)
    }

    const enrollToCourse = async (courseId: number) => {
        const success = await courseService.sendEnrollmentRequest(courseId)
        if (success) enrolledIds.add(courseId)
    }

    const isEnrolled = (courseId: number) => enrolledIds.has(courseId)

    const clearCurrentCourse = () => { currentCourse.value = null }
    const clearCourseList = () => { courses.value = [] }
    const clearEnrollmentSet = () => { enrolledIds.clear() }

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
        loadCurrentCourse,
        loadCourseStats,
        loadAllCourses,
        loadEnrolledCourses,
        enrollToCourse,
        isEnrolled,
        clearCurrentCourse,
        clearCourseList,
        clearEnrollmentSet,
        toggleCourseLoading
    }
})