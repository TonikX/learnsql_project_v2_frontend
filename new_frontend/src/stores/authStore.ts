import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const accessToken = ref<string | null>(localStorage.getItem('accessToken'))
    const isAuth = computed(() => !!accessToken.value)

    function setToken(token: string) {
        accessToken.value = token
        localStorage.setItem('accessToken', token)
    }

    function logout() {
        accessToken.value = null
        localStorage.removeItem('accessToken')
    }

    return { accessToken, isAuth, setToken, logout }
})
