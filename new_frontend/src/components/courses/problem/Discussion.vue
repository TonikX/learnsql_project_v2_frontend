<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/taskStore'
import { useUserStore } from '@/stores/userStore'
import type { Comment, Discussion } from '@/types/discussionTypes'
import ProfilePic from '@/components/ui/ProfilePic.vue'
import ContextMenu from '@/components/ui/ContextMenu.vue'
import CommentElem from './CommentElem.vue'
import CommentInput from './CommentInput.vue'


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

const menuCommentId = ref(-1)
const menuX = ref(0)
const menuY = ref(0)
const mainInputRef = ref<InstanceType<typeof CommentInput> | null>(null)
const replyToCommentId = ref<number | null>(null)

const replyInputRefs = ref<Record<number, InstanceType<typeof CommentInput> | null>>({})
const openedComments = ref<Record<number, boolean>>({})

const scrollToInput = () => {
    mainInputRef.value?.focus()
}
defineExpose({scrollToInput})

const closeContextMenu = () => menuCommentId.value = -1
const openContextMenu = (event: MouseEvent, commentId: number) => {
    menuX.value = event.offsetX
    menuY.value = event.offsetY
    menuCommentId.value = commentId
}

const getMenuOptions = (comment: Comment) => {
    const options: string[] = []

    if (!user.value)
        return []

    if (!comment.parent_id)
        options.push('reply')

    if (comment.author.id === user.value.id || user.value.role === 'teacher')
        options.push('delete')

    return options
}

const handleMenuChoice = async (selected: string, comment: Comment) => {
    switch (selected) {
    case 'delete':
        await removeComment(courseId, props.discussion.task, comment.id, comment.parent_id)
        break
    case 'reply':
        openedComments.value[comment.id] = true
        replyToCommentId.value = comment.id
        setTimeout(() => {
            replyInputRefs.value[comment.id]?.focus()
        }, 50)
        break 
    }
}

const toggleReplies = (commentId: number) => {
    openedComments.value[commentId] = !openedComments.value[commentId]
}

const comments = computed(() => {
    if (!props.discussion?.messages) return []
    
    return props.discussion.messages.map((message) => {
        return {
            ...message,
            open: openedComments.value[message.id] ?? false  
        }
    })
})

const handleAddComment = async (content: string, parentId?: number) => {
    try {
        await toggleCommentLoading(addComment, courseId, props.discussion.task, content, parentId) 
        if (parentId) {
            replyToCommentId.value = null
        }
    } catch (err) {
        console.error(err)
    }
}
</script>

<template>
<div class="size-full border-t-2 border-b-0 border-course-grid-stroke mt-8 pt-6">
    <p class="mb-6">> SELECT * FROM comments WHERE task_id={{ props.discussion.task }};</p>
    <CommentInput 
        ref="mainInputRef"
        label="Комментировать"
        :isLoading="commentLoading"
        @submit="handleAddComment"
    />
</div>

<ul>
    <li v-for="comment in comments" :key="comment.id" class="mt-4 flex gap-4">
        <ProfilePic
            :firstname="comment.author.first_name"
            :lastname="comment.author.last_name"
        />
        <div class="relative">
            <CommentElem :comment="comment" @open-menu="openContextMenu"/>
            <ContextMenu
                v-if="menuCommentId === comment.id"
                :comment="comment"
                :options="getMenuOptions(comment)"
                :x="menuX"
                :y="menuY"
                @close-menu="closeContextMenu"
                @handle-choice="handleMenuChoice"
            />
            <p 
                @click="() => toggleReplies(comment.id)"
                class="cursor-pointer hover:underline"
            >
                Ответы ({{ comment.replies_count }}) {{ comment.open ? '▲' : '▼'}}
            </p>
            <ul v-if="comment.open">
                <div v-if="replyToCommentId === comment.id" class="mt-2">
                    <CommentInput 
                        :ref="(el) => { if (el) replyInputRefs[comment.id] = el as any }"
                        label="Ответить"
                        :parent-comm-id="comment.id"
                        :is-loading="commentLoading"
                        @submit="async (val, pid) => await handleAddComment(val, pid)"
                        @cancel="() => replyToCommentId = null"
                    />
                </div>
                <li v-for="reply in comment.replies" :key="reply.id" class="mt-4">
                    <div class="flex gap-4">
                        <ProfilePic
                            :firstname="comment.author.first_name"
                            :lastname="comment.author.last_name"
                        />
                        <div class="relative">
                            <CommentElem :comment="reply" @open-menu="openContextMenu"/>
                            <ContextMenu
                                v-if="menuCommentId === reply.id"
                                :comment="reply"
                                :options="getMenuOptions(reply)"
                                :x="menuX"
                                :y="menuY"
                                @close-menu="closeContextMenu"
                                @handle-choice="handleMenuChoice"
                            />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </li>
</ul>
</template>