import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CurrentUserProfile, User } from '@/types/userTypes'

const accessStorageKey = 'access_token'

type UserSource = CurrentUserProfile | User

function hasStoredAccessToken() {
    if (typeof window === 'undefined') return false
    return Boolean(window.localStorage.getItem(accessStorageKey))
}

function normalizeUser(value: UserSource): User {
    return {
        id: value.id,
        username: value.username,
        email: value.email,
        first_name: value.first_name,
        last_name: value.last_name,
        role: value.role,
        tel: 'tel' in value ? value.tel : undefined,
        group_number: value.group_number,
        group_number_title: 'group_number_title' in value ? value.group_number_title : undefined,
    }
}

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)
    let currentUserLoadPromise: Promise<User | null> | null = null

    // stores only basic current user data in memory
    function setUser(value: UserSource) {
        user.value = normalizeUser(value)
        error.value = null
    }

    function clearUser() {
        user.value = null
        error.value = null
        currentUserLoadPromise = null
    }

    async function loadCurrentUser() {
        if (user.value) return user.value

        if (!hasStoredAccessToken()) {
            clearUser()
            return null
        }

        if (currentUserLoadPromise) return currentUserLoadPromise

        isLoading.value = true
        error.value = null

        currentUserLoadPromise = (async () => {
            try {
                const { userService } = await import('@/services/userService')
                const currentUser = await userService.getCurrentUserProfile()
                setUser(currentUser)
                return user.value
            } catch (unknownError) {
                error.value = 'Не удалось загрузить данные пользователя'
                throw unknownError
            } finally {
                isLoading.value = false
                currentUserLoadPromise = null
            }
        })()

        return currentUserLoadPromise
    }

    return {
        user,
        isLoading,
        error,
        setUser,
        clearUser,
        loadCurrentUser,
        ensureCurrentUser: loadCurrentUser,
    }
})
