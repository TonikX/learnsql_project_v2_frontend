<script setup lang="ts">
import AppContainer from '../components/layout/AppContainer.vue';
import { ref, watch, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useCoursesStore } from '@/stores/courseStore';
import { ConnectionError, NotFoundError } from '@/errors/network';

const route = useRoute()
const router = useRouter()

const store = useCoursesStore()
const { currentCourse } = storeToRefs(store)
const { getCourseData } = store

const courseLoadingError = ref('')

const loadCourse = async (id: number) => {
    try {
        currentCourse.value = await getCourseData(id)
    } catch (err) {
        if (err instanceof NotFoundError) 
            router.replace({ name: 'not_found' })

        if (err instanceof ConnectionError) {
            
        }

        console.log(err)
    }
}

// observe path parameter changes
watch(() => Number(route.params.course_id), loadCourse, { immediate: true })

onUnmounted(() => {
    currentCourse.value = null
})
</script>

<template> 
    <!-- Course pages navigation -->
    <AppContainer class="py-12 flex items-center justify-between">
        <section class="flex justify-start gap-4">
            <RouterLink :to="{ name: 'details' }">[ Курс ]</RouterLink>
            <RouterLink :to="{ name: 'schema', params: { task_id: 0 } }">[ Схема ]</RouterLink>
            <RouterLink :to="{ name: 'problem', params: { task_id: 0 } }">[ Решение ]</RouterLink>
        </section>

        <p><< Список задач</p>
    </AppContainer>
    
    <!-- Page body -->
    <RouterView />
</template>