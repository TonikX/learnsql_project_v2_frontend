export interface CreateUserData {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    studyGroup: string,
    isu: string,
    password: string,
    passwordRepeat: string
}

export interface LoginData {
    username: string
    password: string
}

export interface User {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    studyGroup?: string,
    isu?: string,
    avatarUrl?: string
}