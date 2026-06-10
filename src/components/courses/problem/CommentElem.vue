<script setup lang="ts">
import type { Comment } from '@/types/discussionTypes';

const props = withDefaults(defineProps<{
    comment: Comment
    showOptions?: boolean
}>(), {
    showOptions: true
})

defineEmits(['openMenu', ]) 
</script>

<template>
<span>{{ comment.author.first_name }}_{{ comment.author.last_name }}&nbsp;</span>
<template v-if="comment.author.role === 'teacher'">
    <AppBadge variant="info">admin</AppBadge>
    <span>&nbsp;</span>
</template>

<span class="text-text-secondary">{{ comment.created_at }}&nbsp;</span>
<span class="cursor-pointer" @click.stop="$emit('openMenu', $event, comment.id)">•••</span>
<p class="font-extralight">-- {{ comment.content }} --</p>
</template>