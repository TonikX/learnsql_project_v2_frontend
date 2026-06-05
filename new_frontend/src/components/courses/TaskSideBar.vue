<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/taskStore'
import { computed, toRefs } from 'vue'
import TaskDifficulty from '../ui/TaskDifficulty.vue'
import AppIcon from '../ui/AppIcon.vue'


const taskStore = useTaskStore()
const { tasksList, taskLoading } = storeToRefs(taskStore)

const totalTasks = computed(() => tasksList.value.length)
const solvedTasks = computed(() => tasksList.value.filter(task => task.status != '0').length)

const emit = defineEmits(['closeSideBar', ])
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    }
})

const { isOpen } = toRefs(props)
</script>

<template>
<Teleport to="body">
    <div 
        @click="$emit('closeSideBar')" 
        class="z-10 fixed inset-0 bg-[#0000007F]"
        :class="isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    >
    </div>
    <aside 
        class="z-20 fixed top-14 bottom-0 right-0 w-[40dvw] bg-sidebar-bg flex flex-col transform transition-transform duration-300 ease-in-out"
        :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
    >
        <div class="flex justify-between p-6 border-b border-text-main">
            <h2>Список задач</h2>
            <h2>{{ solvedTasks }}/{{ totalTasks }} Решено</h2>
            <h2 @click="$emit('closeSideBar')" class="cursor-pointer">X</h2>
        </div>

        <nav class="flex-1 mx-4 py-4 overflow-y-auto no-scrollbar">
            <div 
                v-for="(task, i) in tasksList" :key="i"
                class="p-2 rounded-xl [&:nth-child(odd)]:bg-sidebar-elem cursor-pointer"
            >
                <RouterLink 
                    :to="{ name: 'problem', params: { task_id: task.taskId } }"
                    @click="$emit('closeSideBar')"
                    class="flex justify-between"
                >
                    <div class="flex">
                        <AppIcon name="check-mark" :color="task.status !== '0' ? 'fill-task-easy' : 'fill-transparent'"/>
                        <p class="pl-1">{{ task.title }}</p>
                    </div>
                    <p><TaskDifficulty :difficulty="task.difficulty"></TaskDifficulty></p>
                </RouterLink>
            </div>
        </nav>
    </aside>
</Teleport>
</template>
