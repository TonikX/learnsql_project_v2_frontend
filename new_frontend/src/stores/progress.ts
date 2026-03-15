import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProgressStore = defineStore('progress', () => {
    const selectProgress = ref(65)
    const joinProgress = ref(35)

    return { selectProgress, joinProgress }
})