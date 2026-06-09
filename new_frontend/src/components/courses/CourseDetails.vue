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
import type { SectionMaterials, SectionMaterialsUI, StudentInCourseStats } from '@/types/courseTypes'
import { ConnectionError, NotFoundError, ServerError } from '@/errors/network'
import getStyle from '@/composables/styleGetter'
import AppPagination from '../ui/AppPagination.vue'
import { useUserStore } from '@/stores/userStore.ts'


const courseStore = useCoursesStore()
const { loadCourseStats, loadMaterials, loadMaterialsContent, getCachedTopic } = courseStore
const { currentCourse, materials, materialsAlreadyLoaded } = storeToRefs(courseStore)

const userStore = useUserStore()
const { user } = userStore

const themeStore = useThemeStore()
const { resolvedTheme } = storeToRefs(themeStore)

const stats = ref<StudentInCourseStats[]>([])
const statPage = ref(1)
const totalPages = ref(1)
const statLoading = ref(false)
const statError = ref('')

const chartMetaColor = ref(getStyle('--text-main'))
const chartKey = ref(0)

const materialsSections = ref<SectionMaterialsUI[]>([])
const topicInnerHTML = ref<string | null>(null)
const currentMaterialsId = ref<number | null>(null)

const difficulty = useCourseDifficulty(currentCourse)
const title = computed(() => currentCourse.value ? currentCourse.value.title : '')
const description = computed(() => currentCourse.value ? currentCourse.value.description : '')

const handleStatLoad = async (page: number) => {
    if (!currentCourse.value || statLoading.value) 
        return

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

const handleMaterialsLoad = async () => {
    if (!currentCourse.value || materialsAlreadyLoaded.value) 
        return

    try {
        await loadMaterials(currentCourse.value.id)
    } catch (err) {
        console.error(err)
    }
}

const handleTopicLoad = async (materialsId: number) => {
    const cached = getCachedTopic(materialsId)
    currentMaterialsId.value = materialsId

    if (cached && cached.content) {
        topicInnerHTML.value = cached.content.content
        return
    }

    try {
        const loaded = await loadMaterialsContent(materialsId)
        if (loaded) 
            topicInnerHTML.value = loaded.content
    } catch (err) {
        console.error(err)
    }
}

const toggleSection = async (sectionIndex: number) => {
    const state = materialsSections.value[sectionIndex]?.open
    if (state === undefined)
        return

    materialsSections.value[sectionIndex]!.open = !state
}  

const loadStatsAndMaterials = async (page: number) => await Promise.all([handleStatLoad(page), handleMaterialsLoad()])

watch(materials, (sections: SectionMaterials[]) => {
    materialsSections.value = sections.map(section => {
        return { 
            ...section,
            open: false,
        }
    })
}, { immediate: true })

// event listeners to reload statistics
onMounted(async() => await loadStatsAndMaterials(statPage.value))
watch(currentCourse, async() => await loadStatsAndMaterials(statPage.value))
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
                backgroundColor: stats.value.map(student => {
                    return user?.username === student.username ? '#ED9121' : '#318CE7' 
                }),
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
                ticks: { precision: 0, color: c },
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
const blockStyle = "w-full mt-4 rounded-lg bg-gradient-to-r from-segment-begin to-segment-end"
const materialsBaseStyle = "p-2 md:p-6 overflow-y-scroll max-h-[100dvh]"
const skeletonBarStyle = "h-1/2 bg-gray-500/40 animate-pulse"
const skeletonWidths = [95, 90, 82, 72, 72, 65, 60, 40, 35, 25]
</script>

<template>
<AppContainer class="flex flex-col gap-10">
    <div>
        <div class="flex items-center justify-between">
            <IconTitle :title="title" icon="course-tiles"></IconTitle>
            <p class="hidden md:block">
                Сложность: <span class="text-yellow-500">{{ difficulty[0] }}</span>{{ difficulty[1] }}
            </p>
        </div>
        
        <div v-html="description" :class="[blockStyle, 'p-4 md:p-10']"></div>
    </div>
    
    <AppSectionTitle title="Статистика учебной группы" icon="stats">
        <div :class="[blockStyle, 'p-4 md:p-10 h-[500px]']">
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
            :range="9"
            :current-page="statPage"
            :page-count="totalPages"
            @page-update="handleStatLoad"
        >
        </AppPagination>
    </AppSectionTitle>

    <AppSectionTitle v-if="materialsAlreadyLoaded" title="Методические материалы" icon="materials">
        <div :class="[blockStyle, 'flex']">
            <div :class="[materialsBaseStyle, 'w-1/4']">
                <!-- sections list -->
                <ul> 
                    <li v-for="(section, i) in materialsSections" :key="i" class="pb-2">
                        <div 
                            class="flex justify-between border-dashed border-t-2 border-text-main pt-2 cursor-pointer"
                            @click="async () => await toggleSection(i)"
                        >
                            <span class="font-bold">{{ i + 1 }}. {{ section.section_name }}</span>
                            <span class="text-lg">{{ section.open ? '-' : '+' }}</span>
                        </div>
                        <!-- topics list -->
                        <ul v-if="section.open">
                            <li 
                                v-for="topic in section.topics_of_this_section" :key="topic.id" 
                                class="pl-2 md: pl-8 cursor-pointer hover:bg-course-card-begin"
                                @click="async () => handleTopicLoad(topic.id)"
                            >
                                > <span :class="topic.id === currentMaterialsId ? 'underline' : ''">
                                    {{ topic.topic_name }}
                                </span> 
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div
                v-if="topicInnerHTML" 
                :class="[
                    materialsBaseStyle,
                    'w-3/4 html-links md:max-w-none break-all',
                    resolvedTheme === 'dark' ? 'md:prose md:prose-invert' : 'md:prose'
                ]"
                v-html="topicInnerHTML"
            ></div>
            <p v-else class="m-auto italic">[Выберите раздел с материалами]</p>
        </div>
    </AppSectionTitle>
</AppContainer>
</template>

<style scoped>
:deep(pre), 
:deep(code) {
    color: #ffffff !important;
    text-shadow: none !important;
}

:deep(.prose table) {
    width: auto;
}

:deep(.prose tr),
:deep(.prose td) {
    border: 1px solid rgba(0, 0, 0, 1);
}

:deep([data-theme="dark"] .prose tr),
:deep([data-theme="dark"] .prose td) {
    border: 1px solid rgba(255, 255, 255, 1);
}
</style>