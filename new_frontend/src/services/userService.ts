import { type AxiosInstance } from 'axios'
import { type CreateUserData } from '@/types/userTypes'
import apiClient from '@/api/client'


class UserService {
    constructor(public api: AxiosInstance) {}

    async createUser(payload: CreateUserData) {
        this.api.post('/api/users/', payload)
    }
}

const userService = new UserService(apiClient)

export default userService
