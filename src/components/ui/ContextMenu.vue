<script setup lang="ts">
import type { Comment } from '@/types/discussionTypes';
import { onMounted, onUnmounted } from 'vue';

const props = defineProps<{
    options: string[]
    comment: Comment
    x: number
    y: number
}>()

const emit = defineEmits(["handleChoice", "closeMenu"])
const handleGlobalClick = () => {
    emit("closeMenu")
}

const actionMap: Record<string, string> = {
    reply: 'Ответить',
    delete: 'Удалить',
}

onMounted(() => {
    window.addEventListener('click', handleGlobalClick)
})

onUnmounted(() => {
    window.removeEventListener('click', handleGlobalClick)
})
</script>

<template>
<ul
    v-if="options.length > 0"
    class="absolute z-40 rounded-md py-2 border border-text-secondary bg-bg text-sm" 
    :style="{ top: y + 'px', left: x + 'px' }"
>
    <li 
        v-for="option in options"
        class="py-1 px-2 hover:bg-primary-end cursor-pointer"
        @click.stop="$emit('handleChoice', option, comment)"
    >
        {{ actionMap[option] }}
    </li>


</ul>
</template>