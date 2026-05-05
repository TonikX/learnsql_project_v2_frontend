import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/userTypes'

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>(null)

    function setUser(value: User) {
        user.value = value
    }

    function clearUser() {
        user.value = null
    }

    return { user, setUser, clearUser }
})
