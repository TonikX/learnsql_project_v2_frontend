export type CourseLevel = 'Базовый' | 'Средний' | 'Продвинутый'
export type CourseStatus = 'available' | 'soon'

export interface Course {
    id: number
    title: string
    description: string
    level: CourseLevel
    meta: string
    status: CourseStatus
}