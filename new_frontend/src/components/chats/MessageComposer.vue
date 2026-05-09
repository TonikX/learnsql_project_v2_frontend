<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const emit = defineEmits<{
    send: [content: string]
}>()

const message = ref('')

function submit() {
    const content = message.value.trim()
    if (!content) return
    emit('send', content)
    message.value = ''
}

function insertSqlTemplate() {
    const template = '```sql\nSELECT *\nFROM table_name;\n```'
    message.value = message.value ? `${message.value}\n${template}` : template
}

function noopAttachmentClick() {}

function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault()
        submit()
    }
}
</script>

<template>
    <section>
        <div class="rounded-[10px] border border-chat-border-strong bg-chat-surface p-4 sm:p-5">
            <div class="flex items-stretch gap-3 sm:gap-5">
                <textarea
                    v-model="message"
                    class="chat-placeholder min-h-[108px] min-w-0 flex-1 resize-none rounded-[8px] border border-chat-border bg-chat-composer-input p-4 text-[14px] text-chat-text outline-none placeholder:text-chat-placeholder focus:border-chat-border-active"
                    placeholder="Напишите вопрос преподавателю..."
                    @keydown="handleKeydown"
                ></textarea>

                <div class="flex shrink-0 gap-3">
                    <div class="flex flex-col gap-3">
                        <button
                            type="button"
                            class="flex h-12 w-12 items-center justify-center rounded-[8px] border border-chat-border bg-chat-icon-button text-chat-text transition hover:border-chat-border-active"
                            aria-label="Прикрепить файл"
                            title="Загрузка файлов будет добавлена позже"
                            @click.prevent="noopAttachmentClick"
                        >
                            <AppIcon name="paperclip" :size="24" />
                        </button>

                        <button
                            type="button"
                            class="flex h-12 w-12 items-center justify-center rounded-[8px] border border-chat-border bg-chat-icon-button text-chat-text transition hover:border-chat-border-active"
                            aria-label="Вставить SQL"
                            @click="insertSqlTemplate"
                        >
                            <AppIcon name="code" :size="24" />
                        </button>
                    </div>

                    <button
                        type="button"
                        class="flex h-[108px] w-[54px] items-center justify-center rounded-[8px] bg-chat-send text-chat-on-accent transition hover:opacity-90"
                        aria-label="Отправить"
                        @click="submit"
                    >
                        <AppIcon name="send" :size="28" />
                    </button>
                </div>
            </div>
        </div>

        <p class="mt-3 text-[12px] text-chat-text">
            Можно отправлять текст, SQL фрагменты и скриншоты
        </p>
    </section>
</template>
