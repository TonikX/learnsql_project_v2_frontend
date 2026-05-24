export type CourseStatus = 'available' | 'soon'

export interface Course {
    id: number
    title: string
    description: string
    themes: string[]
    difficulty: number 
    meta: string
    status: CourseStatus
}

export interface StudentCourse {
    id: number
    course: number
    course_title?: string | null
    date_start?: string | null
    date_finish?: string | null
}

export interface PaginatedStudentCourses {
    results: StudentCourse[]
}

export interface StudentInCourseStats {
    first_name: string
    last_name: string
    all_tasks: number
    completed_tasks: number
}

export interface StatsResponse {
    count: number,
    results: StudentInCourseStats[]
}
