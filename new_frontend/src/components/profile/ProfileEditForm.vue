<script setup lang="ts">
import AuthSelect from '@/components/auth/AuthSelect.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import ProfileEditFieldRow from '@/components/profile/ProfileEditFieldRow.vue'

type ProfileEditFormState = {
    first_name: string
    last_name: string
    username: string
    email: string
    tel: string
    university: string
    group_number: string
    role: string
}

type FieldName = keyof ProfileEditFormState

type SelectOption = {
    value: string | number
    label: string
}

defineProps<{
    form: ProfileEditFormState
    universityOptions: SelectOption[]
    groupOptions: SelectOption[]
    currentGroupTitle?: string
    isUniversitiesLoading?: boolean
    isGroupsLoading?: boolean
    universitiesError?: string
    groupsError?: string
    formError?: string
    successMessage?: string
    isSubmitting?: boolean
    canSubmit?: boolean
}>()

const emit = defineEmits<{
    submit: []
    cancel: []
    'update:field': [field: FieldName, value: string]
}>()

const controlClass = 'h-[50px] min-w-0 w-full rounded-[8px] border border-auth-border bg-auth-input px-4 text-[16px] leading-none text-app-text outline-none transition placeholder:text-app-muted focus:border-primary-action disabled:cursor-not-allowed disabled:opacity-60 md:px-5 md:text-[18px]'

function updateField(field: FieldName, event: Event) {
    emit('update:field', field, (event.target as HTMLInputElement).value)
}

function updateFieldValue(field: FieldName, value: string) {
    emit('update:field', field, value)
}
</script>

<template>
    <section class="rounded-[10px] border border-app-border bg-profile-card-gradient px-6 py-8 text-app-text shadow-card sm:px-8 md:px-10 md:py-12">
        <h1 class="text-[28px] font-bold leading-tight md:text-[34px]">
            Редактирование профиля
        </h1>

        <p class="mt-8 text-[15px] leading-relaxed md:text-[18px]">
            Таблица:
            <span class="text-primary-action">public.users</span>
            <span class="px-2">•</span>
            Schema: authentication
        </p>

        <form class="mt-8" @submit.prevent="emit('submit')">
            <div class="overflow-hidden rounded-[10px] border border-auth-border bg-auth-table">
                <div class="hidden border-b border-auth-border md:grid md:grid-cols-[254px_minmax(0,1fr)]">
                    <div class="border-r border-auth-border px-6 py-5 text-[17px] leading-none text-app-text">Поле</div>
                    <div class="px-6 py-5 text-[17px] leading-none text-app-text">Значение</div>
                </div>

                <ProfileEditFieldRow label="Имя" db-type="VARCHAR">
                    <input
                        :value="form.first_name"
                        :class="controlClass"
                        autocomplete="given-name"
                        @input="updateField('first_name', $event)"
                    >
                </ProfileEditFieldRow>

                <ProfileEditFieldRow label="Фамилия" db-type="VARCHAR">
                    <input
                        :value="form.last_name"
                        :class="controlClass"
                        autocomplete="family-name"
                        @input="updateField('last_name', $event)"
                    >
                </ProfileEditFieldRow>

                <ProfileEditFieldRow label="Логин" db-type="VARCHAR">
                    <input
                        :value="form.username"
                        :class="controlClass"
                        autocomplete="username"
                        required
                        @input="updateField('username', $event)"
                    >
                </ProfileEditFieldRow>

                <ProfileEditFieldRow label="Почта" db-type="VARCHAR">
                    <input
                        :value="form.email"
                        :class="controlClass"
                        autocomplete="email"
                        type="email"
                        @input="updateField('email', $event)"
                    >
                </ProfileEditFieldRow>

                <ProfileEditFieldRow label="Телефон" db-type="VARCHAR">
                    <input
                        :value="form.tel"
                        :class="controlClass"
                        autocomplete="tel"
                        placeholder="+7 900 000 00 00"
                        @input="updateField('tel', $event)"
                    >
                </ProfileEditFieldRow>

                <ProfileEditFieldRow label="Университет" db-type="VARCHAR">
                    <div class="w-full">
                        <AuthSelect
                            :model-value="form.university"
                            :disabled="isUniversitiesLoading || universityOptions.length === 0"
                            placeholder="Не выбрано"
                            @update:model-value="updateFieldValue('university', $event)"
                        >
                            <option
                                v-for="university in universityOptions"
                                :key="university.value"
                                :value="university.value"
                            >
                                {{ university.label }}
                            </option>
                        </AuthSelect>
                        <p v-if="isUniversitiesLoading" class="mt-2 text-[13px] text-app-text">
                            <AppLoader text="Загрузка университетов" mode="inline" />
                        </p>
                        <p v-if="universitiesError" class="mt-2 text-[13px] text-danger">
                            {{ universitiesError }}
                        </p>
                    </div>
                </ProfileEditFieldRow>

                <ProfileEditFieldRow label="Группа" db-type="FK">
                    <div class="w-full">
                        <AuthSelect
                            :model-value="form.group_number"
                            :disabled="isGroupsLoading || !form.university"
                            :placeholder="form.university ? 'Группа не выбрана' : 'Сначала выберите университет'"
                            @update:model-value="updateFieldValue('group_number', $event)"
                        >
                            <option
                                v-if="currentGroupTitle && form.group_number && !groupOptions.some((group) => String(group.value) === String(form.group_number))"
                                :value="form.group_number"
                            >
                                {{ currentGroupTitle }}
                            </option>
                            <option
                                v-for="group in groupOptions"
                                :key="group.value"
                                :value="group.value"
                            >
                                {{ group.label }}
                            </option>
                        </AuthSelect>
                        <p v-if="isGroupsLoading" class="mt-2 text-[13px] text-app-text">
                            <AppLoader text="Загрузка групп" mode="inline" />
                        </p>
                        <p v-if="groupsError" class="mt-2 text-[13px] text-danger">
                            {{ groupsError }}
                        </p>
                    </div>
                </ProfileEditFieldRow>

                <ProfileEditFieldRow label="Роль" db-type="TEXT">
                    <input
                        :value="form.role"
                        :class="[controlClass, 'bg-auth-input-alt']"
                        readonly
                        aria-readonly="true"
                    >
                </ProfileEditFieldRow>
            </div>

            <div class="mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div class="min-h-[24px] text-[15px] leading-relaxed md:text-[18px]">
                    <p v-if="formError" class="text-danger">{{ formError }}</p>
                    <p v-else-if="successMessage" class="text-success-action">{{ successMessage }}</p>
                    <p v-else>Изменения будут применены к данным профиля пользователя.</p>
                </div>

                <div class="flex flex-col gap-4 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        class="h-14 rounded-[8px] bg-profile-logout-bg px-8 text-[17px] text-profile-logout-text transition hover:opacity-90"
                        @click="emit('cancel')"
                    >
                        Отменить
                    </button>
                    <button
                        type="submit"
                        class="h-14 rounded-[8px] bg-primary-gradient px-8 text-[17px] text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                        :disabled="isSubmitting || !canSubmit"
                    >
                        <AppLoader v-if="isSubmitting" text="Сохранение" mode="inline" text-class="text-white" />
                        <span v-else>Сохранить</span>
                    </button>
                </div>
            </div>
        </form>
    </section>
</template>
