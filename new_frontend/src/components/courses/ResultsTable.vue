<script setup lang="ts">
import { toRefs, computed } from 'vue';

const props = defineProps({
    results: {
        type: Array,
        default: [],
    },
    columns: {
        type: Number,
        default: 0,
    }
})

const MAX_SIZE = 50
const { results, columns } = toRefs(props)

const limitedResults = computed(() => { 
    if (results.value.length <= MAX_SIZE) 
        return results.value

    const limited = results.value.slice(0, MAX_SIZE)
    limited.push(Array(columns.value).fill('...'))
    return limited
})
</script>

<template>
<div 
    class="grid w-full rounded-lg overflow-hidden text-sm border-2 border-course-grid-stroke bg-gradient-to-b from-editor-begin to-editor-end"
    :style="{ gridTemplateColumns: `max-content repeat(${columns}, minmax(0, 1fr))` }"
>
    <template v-for="(row, i) in limitedResults" :key="i">
        <div :class="['p-2 border-r border-course-grid-stroke text-center', { 'border-t': Number(i) > 0 }]">
            {{ i }}
        </div>
        
        <div 
            v-for="(item, j) in row" :key="j" 
            :class="['p-2 border-course-grid-stroke', { 'border-t': Number(i) > 0, 'border-r': Number(j) < columns - 1}]"
        >
            {{ item }}
        </div>
    </template>
</div>
</template>