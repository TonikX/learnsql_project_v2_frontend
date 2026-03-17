import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/userTypes'

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>(null)

    function setMockUser() {
        user.value = {
        id: 1,
        username: 'learnsql_user',
        firstName: 'Пользователь',
        lastName: 'LearnSQL',
        email: 'user@learnsql.ru',
        studyGroup: 'M3200',
        isu: '123456',
        }
    }

    function clearUser() {
        user.value = null
    }

    return { user, setMockUser, clearUser }
})