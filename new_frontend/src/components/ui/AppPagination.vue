<script setup lang="ts">
import { computed, toRefs } from 'vue';

const props = withDefaults(defineProps<{
    pageCount: number
    currentPage: number
}>(), {
    currentPage: 1,
})

const emit = defineEmits(['pageUpdate',])

const { pageCount } = props
const { currentPage } = toRefs(props)

const range = computed(() => { 
    let start = Math.max(currentPage.value - 2, 1)
    let end = start + 4

    if (end > pageCount) {
        start = Math.max(start + pageCount - end, 1)
        end = pageCount
    } 

    let arr = []
    for (let i = start; i <= end; i++) arr.push(i)
  
    return arr
})

const disabledStyle = "cursor-default pointer-events-none"
const enabledStyle = "cursor-pointer hover:underline"
</script>

<template>
<div class="w-full mt-4 flex justify-center gap-2">
    <div 
        :class="(currentPage > 1) ? enabledStyle : disabledStyle" 
        @click="$emit('pageUpdate', 1)"><<
    </div>
    <template v-for="i in range" :key="i">
        <div v-if="i===currentPage" :class="disabledStyle">[{{ i }}]</div>
        <div v-else :class="enabledStyle" @click="$emit('pageUpdate', i)">{{ i }}</div>
    </template>
    <div 
        :class="(currentPage < pageCount) ? enabledStyle : disabledStyle"
        @click="$emit('pageUpdate', pageCount)" >>>
    </div>
</div>
</template>