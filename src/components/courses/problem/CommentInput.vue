<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'

const props = withDefaults(defineProps<{
    label: string
    parentCommId?: number
    isLoading?: boolean
    maxHeight?: number
}>(), {
    isLoading: false,
    maxHeight: 250,
})

const emit = defineEmits(['submit', 'cancel'])

const text = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const adjustHeight = () => {
    const elem = textareaRef.value
    if (!elem) 
        return

    elem.style.height = 'auto'
    elem.style.height = `${Math.min(elem.scrollHeight, props.maxHeight)}px`
}

const focus = () => {
    if (!textareaRef.value) return
    textareaRef.value.scrollIntoView({ behavior: 'smooth', block: 'center' })
    textareaRef.value.focus({ preventScroll: true })
}
defineExpose({ focus })

const submit = () => { 
    console.log("PARENT ID =", props.parentCommId)
    emit('submit', text.value, props.parentCommId)
    text.value = ''
    textareaRef.value!.style.height = 'auto'
}

const cancel = () => {
    text.value = ''
    textareaRef.value!.style.height = 'auto'
    emit('cancel')
}
</script>

<template>
<div class="w-full rounded-lg p-4 bg-course-grid">
    <textarea 
        ref="textareaRef"
        v-model="text"
        rows="1"
        placeholder="Оставьте комментарий..."
        class="w-full block no-scrollbar resize-none outline-none bg-transparent font-light"
        @input="adjustHeight"
    ></textarea>
</div>
<div class="w-full mt-4 flex gap-4">
    <AppButton variant="secondary" size="sm" @click="() => text = ''">Отмена</AppButton>
    <AppButton variant="success" size="sm" @click="submit" :loading="isLoading" :disabled="text === ''">
        {{ label }}
    </AppButton>
</div>
</template>