import apiClient from '@/api/client'

import { type AxiosInstance } from 'axios'

import type { Course, SectionMaterials, StatsResponse, TopicContent } from '@/types/courseTypes'
import type { StudentCourse, PaginatedStudentCourses } from '@/types/courseTypes'
import type { CourseProgressCard, CourseProgressResponse } from '@/types/profileCourseProgressTypes'

type StudentCoursesResponse = StudentCourse[] | PaginatedStudentCourses

function normalizeStudentCourses(response: StudentCoursesResponse): StudentCourse[] {
    return Array.isArray(response) ? response : (response.results ?? [])
}

class CourseService {
    constructor(public api: AxiosInstance) {}

    async getCourseById(courseId: number): Promise<Course> {
        const response = await this.api.get<Course>(`/api/course/${courseId}`)
        return response.data
    }

    async getAllCourses(): Promise<Course[]> {
        try {
            const response = await this.api.get("/api/courses/")
            if ("results" in response.data)
                return response.data.results as Course[]

        } catch (err) {
            console.error("Failed to load courses list:", err)
        }

        return []
    }

    async sendEnrollmentRequest(courseId: number): Promise<boolean> {
        const response = await this.api.post(`/api/student-course/`, { course: courseId })
        return 'course' in response.data
    }

    async getCourseStats(courseId: number, page: number): Promise<StatsResponse> {
        const response = await this.api.get<StatsResponse>(`/api/group/statistic/${courseId}?page=${page}`)
        return response.data
    }

    async getCourseMaterials(courseId: number): Promise<SectionMaterials[]> {
        const response = await this.api.get<SectionMaterials[]>(`/api/sectionsofmethodologicalmaterials/${courseId}`)
        return response.data
    }

    async getTopicMaterials(materialsId: number): Promise<TopicContent> {
        const response = await this.api.get<TopicContent>(`/api/topicsofsection/detail/${materialsId}`)
        return response.data
    }

    async getStudentCourses(): Promise<StudentCourse[]> {
        const response = await apiClient.get<StudentCoursesResponse>('/api/student-course/')
        return normalizeStudentCourses(response.data)
    }

    async getCourseProgress(courseId: number | string): Promise<CourseProgressResponse> {
        const response = await apiClient.get<CourseProgressResponse>(`/api/student-profile/course/${courseId}/`)
        return response.data
    }
}

const courseService = new CourseService(apiClient)

export default courseService