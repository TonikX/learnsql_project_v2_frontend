<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import type { PersonalStatistics, StudentSummary } from '@/types/profileStatisticsTypes'
import {
    formatRole,
    getDisplayName,
    getInitials,
    getProfileStatusLine,
} from '@/utils/profileFormatters'

const props = defineProps<{
    student: StudentSummary
    personal?: PersonalStatistics | null
}>()

const emit = defineEmits<{
    logout: []
    edit: []
}>()

const groupLabel = computed(() => {
    return [props.student.group?.university, props.student.group?.title]
        .filter(Boolean)
        .join(' • ')
})
</script>

<template>
    <section class="rounded-[10px] border border-app-border bg-profile-card-gradient p-5 text-app-text sm:p-7">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div class="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center">
                <div class="flex h-[86px] w-[86px] shrink-0 items-center justify-center rounded-[18px] bg-primary-gradient text-[32px] leading-none text-white">
                    {{ getInitials(props.student) }}
                </div>

                <div class="min-w-0">
                    <h1 class="break-words text-[26px] leading-tight sm:text-[34px]">
                        {{ getDisplayName(props.student) }}
                    </h1>

                    <div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-app-text sm:text-[15px]">
                        <span class="inline-flex items-center gap-2">
                            <AppIcon name="profile-id" :size="16" class="h-[13px] w-[18px] sm:hidden" />
                            <AppIcon name="profile-id" :size="20" class="hidden h-[15px] w-[20px] sm:block" />
                            @{{ props.student.username }}
                        </span>
                        <span class="inline-flex items-center gap-2">
                            <AppIcon name="profile-student" :size="14" class="sm:hidden" />
                            <AppIcon name="profile-student" :size="16" class="hidden sm:block" />
                            {{ formatRole(props.student.role) }}
                        </span>
                        <span v-if="props.student.email" class="inline-flex min-w-0 items-center gap-2 break-all">
                            <AppIcon name="profile-mail" :size="14" class="shrink-0 sm:hidden" />
                            <AppIcon name="profile-mail" :size="16" class="hidden shrink-0 sm:block" />
                            {{ props.student.email }}
                        </span>
                        <span v-if="groupLabel" class="inline-flex min-w-0 items-center gap-2 break-words">
                            <AppIcon name="profile-university" :size="18" class="shrink-0 sm:hidden" />
                            <AppIcon name="profile-university" :size="22" class="hidden shrink-0 sm:block" />
                            {{ groupLabel }}
                        </span>
                    </div>

                    <p class="mt-4 text-[13px] leading-relaxed text-app-text sm:text-[15px]">
                        <span class="text-progress-green">●</span>
                        {{ getProfileStatusLine(props.personal) }}
                    </p>
                </div>
            </div>

            <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:shrink-0">
                <button
                    type="button"
                    class="h-11 rounded-[9px] bg-profile-logout-bg px-5 text-[15px] text-profile-logout-text transition hover:opacity-90"
                    @click="emit('logout')"
                >
                    Выйти
                </button>
                <button
                    type="button"
                    class="h-11 rounded-[9px] bg-primary-gradient px-5 text-[15px] text-white transition hover:opacity-95"
                    @click="emit('edit')"
                >
                    Редактировать
                </button>
            </div>
        </div>
    </section>
</template>
