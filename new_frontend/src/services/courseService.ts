import apiClient from '@/api/client'
import type { Course, StatsResponse, StudentInCourseStats } from '@/types/courseTypes'
import { type AxiosInstance } from 'axios'

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

    async getCourseStats(courseId: number, page: number): Promise<StatsResponse> {
        const response = await this.api.get<StatsResponse>(`/api/group/statistic/${courseId}?page=${page}`)
        return response.data
    }
}

const courseService = new CourseService(apiClient)

export default courseService