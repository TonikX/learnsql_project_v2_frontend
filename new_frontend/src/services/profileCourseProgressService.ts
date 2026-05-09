import apiClient from '@/api/client'
import type {
    CourseProgressResponse,
    PaginatedStudentCourses,
    StudentCourse,
} from '@/types/profileCourseProgressTypes'

type StudentCoursesResponse = StudentCourse[] | PaginatedStudentCourses

function normalizeStudentCourses(response: StudentCoursesResponse): StudentCourse[] {
    return Array.isArray(response) ? response : (response.results ?? [])
}

export const profileCourseProgressService = {
    async getStudentCourses(): Promise<StudentCourse[]> {
        const response = await apiClient.get<StudentCoursesResponse>('/api/student-course/')
        return normalizeStudentCourses(response.data)
    },

    async getCourseProgress(courseId: number | string): Promise<CourseProgressResponse> {
        const response = await apiClient.get<CourseProgressResponse>(`/api/student-profile/course/${courseId}/`)
        return response.data
    },
}
