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
    username: string
    first_name: string
    last_name: string
    all_tasks: number
    completed_tasks: number
}

export interface StatsResponse {
    count: number,
    results: StudentInCourseStats[]
}

export interface SectionTopic {
    id: number
    topic_name: string
    section: number
    content?: TopicContent
}

export interface SectionMaterials {
    id: number
    number: number
    section_name: string
    topics_of_this_section: SectionTopic[]
}

export interface SectionMaterialsUI extends SectionMaterials {
    open: boolean
}

export interface TopicContent {
    id: number
    number: number
    topic_name: string
    content: string
    section: number
    themes_for_topic: number[]
}
