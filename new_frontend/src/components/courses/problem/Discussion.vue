<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/taskStore'
import { useUserStore } from '@/stores/userStore'
import type { Comment, Discussion } from '@/types/discussionTypes'
import AppButton from '@/components/ui/AppButton.vue'
import ProfilePic from '@/components/ui/ProfilePic.vue'
import ContextMenu from '@/components/ui/ContextMenu.vue'
import AppBadge from '@/components/ui/AppBadge.vue'


const props = defineProps<{
    discussion: Discussion
}>()

const route = useRoute()
const courseId = Number(route.params.course_id)

const taskStore = useTaskStore()
const { commentLoading } = storeToRefs(taskStore)
const { addComment, removeComment, toggleCommentLoading } = taskStore

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const commentText = ref('')
const menuCommentId = ref(-1)
const menuX = ref(0)
const menuY = ref(0)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const adjustHeight = () => {
    const elem = textareaRef.value
    if (!elem) 
        return

    elem.style.height = 'auto'
    elem.style.height = `${Math.min(elem.scrollHeight, 250)}px`
}

const scrollToInput = () => {
    const elem = textareaRef.value
    if (!elem) 
        return

    elem.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center'
    })

    elem.focus({ preventScroll: true })
}
defineExpose({scrollToInput})

const closeContextMenu = () => menuCommentId.value = -1
const openContextMenu = (event: MouseEvent, commentId: number) => {
    menuX.value = event.offsetX
    menuY.value = event.offsetY
    menuCommentId.value = commentId
}

const getMenuOptions = (comment: Comment) => {
    const options = ['reply', ]

    if (!user.value)
        return options

    if (comment.author.id === user.value.id || user.value.role === 'teacher')
        options.push('delete')

    return options
}

const handleMenuChoice = async (selected: string, comment: Comment) => {
    switch (selected) {
    case 'delete':
        await removeComment(courseId, props.discussion.task, comment.id)
        break
    case 'reply':
        console.log("Reply") 
    }
}

const handleAddComment = async (content: string) => {
    try {
        await toggleCommentLoading(addComment, courseId, props.discussion.task, content) 
        commentText.value = ''
        textareaRef.value!.style.height = 'auto'
    } catch (err) {
        console.error(err)
    }
}
</script>

<template>
<div class="size-full border-t-2 border-b-0 border-course-grid-stroke mt-8 pt-6">
    <p class="mb-6">> SELECT * FROM comments WHERE task_id={{ props.discussion.task }};</p>
    <div class="w-full rounded-lg p-4 bg-course-grid">
        <textarea 
            ref="textareaRef"
            v-model="commentText"
            rows="1"
            placeholder="Оставьте комментарий..."
            class="w-full block no-scrollbar resize-none outline-none bg-transparent font-light"
            @input="adjustHeight"
        ></textarea>
    </div>
    <div class="w-full mt-4 flex gap-4">
        <AppButton variant="secondary" size="sm" @click="() => commentText = ''">Отмена</AppButton>
        <AppButton
            variant="success"
            size="sm"
            @click="async () => await handleAddComment(commentText)"
            :loading="commentLoading"
            :disabled="commentText === ''"
        >Комментировать
        </AppButton>
    </div>
</div>

<ul class="my-6">
    <li v-for="comment in props.discussion.messages" :key="comment.id" class="mb-4 flex gap-4">
        <ProfilePic
            :firstname="comment.author.first_name"
            :lastname="comment.author.last_name"
        />
        <div class="relative">
            <span>{{ comment.author.first_name }}_{{ comment.author.last_name }}&nbsp;</span>
            <template v-if="comment.author.role === 'teacher'">
                <AppBadge variant="info">admin</AppBadge>
                <span>&nbsp;</span>
            </template>

            <span class="text-text-secondary">{{ comment.created_at }}&nbsp;</span>
            <span class="cursor-pointer" @click.stop="openContextMenu($event, comment.id)">•••</span>
            <ContextMenu
                v-if="menuCommentId === comment.id"
                :comment="comment"
                :options="getMenuOptions(comment)"
                :x="menuX"
                :y="menuY"
                @close-menu="closeContextMenu"
                @handle-choice="handleMenuChoice"
            />
            <p class="font-extralight">-- {{ comment.content }} --</p>
        </div>
    </li>
</ul>
</template>