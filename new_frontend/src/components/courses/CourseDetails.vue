<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    type ChartOptions
} from 'chart.js'

import { storeToRefs } from 'pinia'
import { useCoursesStore } from '@/stores/courseStore'
import { useThemeStore } from '@/stores/themeStore'
import  useCourseDifficulty from '@/composables/courseDifficulty'
import AppContainer from '../layout/AppContainer.vue'
import IconTitle from '../ui/IconTitle.vue'
import AppSectionTitle from '../ui/AppSectionTitle.vue'
import type { StudentInCourseStats } from '@/types/courseTypes'
import { ConnectionError, NotFoundError, ServerError } from '@/errors/network'
import getStyle from '@/composables/styleGetter'
import AppPagination from '../ui/AppPagination.vue'


const courseStore = useCoursesStore()
const { loadCourseStats } = courseStore
const { currentCourse } = storeToRefs(courseStore)

const themeStore = useThemeStore()
const { resolvedTheme } = storeToRefs(themeStore)

const stats = ref<StudentInCourseStats[]>([])
const statPage = ref(1)
const totalPages = ref(1)
const statLoading = ref(false)
const statError = ref('')

const chartMetaColor = ref(getStyle('--text-main'))
const chartKey = ref(0)

const difficulty = useCourseDifficulty(currentCourse)
const title = computed(() => currentCourse.value ? currentCourse.value.title : '')
const description = computed(() => currentCourse.value ? currentCourse.value.description : '')

const handleStatLoad = async (page: number) => {
    if (!currentCourse.value) return

    if (statLoading.value) return

    try {
        statLoading.value = true
        const statsData = await loadCourseStats(currentCourse.value.id, page)

        stats.value = statsData.results
        totalPages.value = Math.floor(statsData.count / 10) + 1
        statPage.value = page
    } catch (err) {
        if (err instanceof ConnectionError)
            statError.value = "Ошибка подключения. Проверьте соединение с интернетом"
        else if (err instanceof NotFoundError)
            statError.value = "Курс или группа не найдены"
        else if (err instanceof ServerError)
            statError.value = "Ошибка сервера. Попробуйте позже"
        else 
            statError.value = "Неизвестная ошибка"

        // console.error(err)
        console.log("ERR=", statError.value)
    } finally {
        statLoading.value = false
    }
}

// event listeners to reload statistics
onMounted(async() => await handleStatLoad(statPage.value))
watch(currentCourse, async() => await handleStatLoad(statPage.value))
watch(statPage, async(page: number) => { await handleStatLoad(page) })

// register chart
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// force chart redraw if window size changed
window.addEventListener("resize", () => {
    chartKey.value++
})

// force chart redraw if theme changed
watch(resolvedTheme, () => {
    chartMetaColor.value = getStyle('--text-main')
    chartKey.value++
})

const chartData = computed(() => { 
    return {
        labels: stats.value.map(student => `${student.first_name} ${student.last_name}`),
        datasets: [
            {
                data: stats.value.map(student => student.completed_tasks),
                backgroundColor: '#318CE7',
                categoryPercentage: 1.0,
                barPercentage: 0.5,
            }
        ],
    }
})

const chartOptions = computed(() => {
    const c: string = chartMetaColor.value

    return {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            x: {
                ticks: { color: c },
                border: { color: c }, 
                beginAtZero: true,
                grid: { display: false }
            },
            y: {
                ticks: { color: c },
                border: { color: c },  
                grid: { display: false },
            }
        }
    } as ChartOptions<"bar">
})

// Consts for UI
const blockStyle = "w-full mt-4 rounded-lg p-10 bg-gradient-to-r from-segment-begin to-segment-end"
const skeletonBarStyle = "h-1/2 bg-gray-500/40 animate-pulse"
const skeletonWidths = [95, 90, 82, 72, 72, 65, 60, 40, 35, 25]
</script>

<template>
<AppContainer class="flex flex-col gap-10">
    <div>
        <div class="flex items-center justify-between">
            <IconTitle :title="title" icon="course-tiles"></IconTitle>
            <p>Сложность: <span class="text-yellow-500">{{ difficulty[0] }}</span>{{ difficulty[1] }}</p>
        </div>
        
        <div v-html="description" :class="blockStyle"></div>
    </div>
    
    <AppSectionTitle title="Статистика учебной группы" icon="stats">
        <div :class="[blockStyle, 'h-[500px]']">
            <Bar v-if="!statLoading && !statError" :key="chartKey" :data="chartData" :options="chartOptions" />
            <!-- Loading skeleton -->
            <div v-if="statLoading" class="size-full flex flex-col py-5">
                <div 
                    v-for="(w, i) in skeletonWidths" :key="i" 
                    class="flex gap-4 w-full"
                    :style="{ height: (100 / skeletonWidths.length) + '%' }"
                >
                    <div :class="[skeletonBarStyle, 'w-28 shrink-0']"></div>
                    <div :class="skeletonBarStyle" :style="{ width: w + '%' }"></div>
                </div>
            </div>
            <!-- Show errors if occur -->
            <div v-if="!statLoading && statError" class="size-full flex items-center justify-center">
                <p class="text-danger text-lg">{{ statError }}</p>
            </div>
        </div>

        <AppPagination
            v-if="stats.length > 0"
            :current-page="statPage"
            :page-count="totalPages"
            @page-update="handleStatLoad"
        >
        </AppPagination>

    </AppSectionTitle>

    <AppSectionTitle title="Методические материалы" icon="materials">
        <div :class="blockStyle"></div>
    </AppSectionTitle>

</AppContainer>
</template>