export type CourseStatus = 'available' | 'soon'

export interface Course {
    id: number
    title: string
    themes: string[]
    level: number 
    meta: string
    status: CourseStatus
}