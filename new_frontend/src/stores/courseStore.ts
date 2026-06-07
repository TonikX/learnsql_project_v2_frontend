import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Course, SectionMaterials, SectionTopic, StudentCourse, TopicContent } from '@/types/courseTypes'
import courseService from '@/services/courseService'
import { loaderFactory } from '@/utils/loadersFactory'


export const useCoursesStore = defineStore('courses', () => {
    const courses = ref<Course[]>([])
    const enrolledIds: Set<number> = new Set()
    const materials = ref<SectionMaterials[]>([])
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

    const loadMaterials = async (courseId: number) => {
        materials.value = await courseService.getCourseMaterials(courseId)
    }

    const getCachedTopic = (materialsId: number) => {
        for (const section of materials.value) {
            for (const t of section.topics_of_this_section) {
                if (t.id === materialsId)
                    return t
            }
        }

        return null
    }

    const loadMaterialsContent = async (materialsId: number) => {
        const topic: SectionTopic | null = getCachedTopic(materialsId)
        if (!topic)
            return null

        const content: TopicContent = await courseService.getTopicMaterials(materialsId)
        topic.content = content
        return content
    }

    const materialsAlreadyLoaded = computed(() =>  materials.value.length > 0)

    const clearCurrentCourse = () => currentCourse.value = null 
    const clearCourseList = () => courses.value = [] 
    const clearEnrollmentSet = () => enrolledIds.clear() 
    const clearMaterials = () => materials.value = []

    const toggleCourseLoading = async (func: (...params: any) => Promise<any>, ...params: any) => {
        await loaderFactory(func, courseLoading, ...params)()
    }

    return { 
        courses, 
        materials,
        currentCourse, 
        courseLoading,
        materialsAlreadyLoaded,
        loadCurrentCourse,
        loadCourseStats,
        loadAllCourses,
        loadEnrolledCourses,
        loadMaterials,
        loadMaterialsContent,
        getCachedTopic,
        enrollToCourse,
        isEnrolled,
        clearCurrentCourse,
        clearCourseList,
        clearEnrollmentSet,
        clearMaterials,
        toggleCourseLoading
    }
})