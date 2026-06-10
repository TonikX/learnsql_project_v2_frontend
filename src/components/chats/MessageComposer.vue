<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const props = defineProps<{
    disabled?: boolean
}>()

const emit = defineEmits<{
    send: [content: string]
}>()

const message = ref('')

function submit() {
    if (props.disabled) return
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
    <section class="shrink-0">
        <div class="rounded-[10px] border border-chat-border-strong bg-chat-surface p-2 sm:p-3 xl:p-4">
            <div class="flex items-stretch gap-2 sm:gap-3">
                <textarea
                    v-model="message"
                    :disabled="disabled"
                    class="chat-placeholder min-h-[56px] min-w-0 flex-1 resize-none rounded-[8px] border border-chat-border bg-chat-composer-input p-2.5 text-[14px] text-chat-text outline-none ring-0 placeholder:text-chat-placeholder disabled:opacity-70 focus:border-chat-border focus:outline-none focus:ring-0 focus-visible:outline-none sm:min-h-[68px] sm:p-3 lg:min-h-[72px] xl:min-h-[88px] xl:p-4"
                    placeholder="Напишите вопрос преподавателю..."
                    @keydown="handleKeydown"
                ></textarea>

                <div class="flex shrink-0 gap-2 sm:gap-3">
                    <div class="flex flex-col gap-2">
                        <button
                            type="button"
                            class="flex h-7 w-7 items-center justify-center rounded-[8px] border border-chat-border bg-chat-icon-button text-chat-text transition hover:border-chat-border-active sm:h-9 sm:w-9 xl:h-11 xl:w-11"
                            aria-label="Прикрепить файл"
                            title="Загрузка файлов будет добавлена позже"
                            @click.prevent="noopAttachmentClick"
                        >
                            <AppIcon name="paperclip" :size="18" class="sm:hidden" />
                            <AppIcon name="paperclip" :size="20" class="hidden sm:flex xl:hidden" />
                            <AppIcon name="paperclip" :size="24" class="hidden xl:flex" />
                        </button>

                        <button
                            type="button"
                            class="flex h-7 w-7 items-center justify-center rounded-[8px] border border-chat-border bg-chat-icon-button text-chat-text transition hover:border-chat-border-active sm:h-9 sm:w-9 xl:h-11 xl:w-11"
                            aria-label="Вставить SQL"
                            @click="insertSqlTemplate"
                        >
                            <AppIcon name="code" :size="18" class="sm:hidden" />
                            <AppIcon name="code" :size="20" class="hidden sm:flex xl:hidden" />
                            <AppIcon name="code" :size="24" class="hidden xl:flex" />
                        </button>
                    </div>

                    <button
                        type="button"
                        :disabled="disabled"
                        class="flex h-16 w-9 items-center justify-center rounded-[8px] bg-chat-send text-chat-on-accent transition hover:opacity-90 disabled:cursor-wait disabled:opacity-70 sm:h-20 sm:w-11 xl:h-24 xl:w-12"
                        aria-label="Отправить"
                        @click="submit"
                    >
                        <AppIcon name="send" :size="22" class="sm:hidden" />
                        <AppIcon name="send" :size="24" class="hidden sm:flex xl:hidden" />
                        <AppIcon name="send" :size="28" class="hidden xl:flex" />
                    </button>
                </div>
            </div>
        </div>

        <p class="mt-2 hidden text-[12px] text-chat-text sm:block">
            Можно отправлять текст, SQL фрагменты и скриншоты
        </p>
    </section>
</template>
