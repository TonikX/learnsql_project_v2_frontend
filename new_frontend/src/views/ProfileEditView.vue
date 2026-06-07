<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AppContainer from '@/components/layout/AppContainer.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import ProfileEditForm from '@/components/profile/ProfileEditForm.vue'
import ProfilePasswordModal from '@/components/profile/ProfilePasswordModal.vue'
import ProfileSecurityCard from '@/components/profile/ProfileSecurityCard.vue'
import { extractApiErrorMessage } from '@/errors/network'
import { studentGroupService } from '@/services/studentGroupService'
import { userService } from '@/services/userService'
import { useProfileStatisticsStore } from '@/stores/profileStatisticsStore'
import { useUserStore } from '@/stores/userStore'
import type {
    ChangePasswordPayload,
    CurrentUserProfile,
    StudentGroup,
    UniversityChoice,
} from '@/types/userTypes'
import { isOptionalPhoneValid, isPhoneBackendErrorMessage, phoneValidationErrorMessage } from '@/utils/phoneValidation'
import { formatRole } from '@/utils/profileFormatters'

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
type EditableSnapshot = {
    username: string
    first_name: string
    last_name: string
    email: string
    tel: string
    group_number: string | null
}

const router = useRouter()
const userStore = useUserStore()
const profileStatisticsStore = useProfileStatisticsStore()

const form = reactive<ProfileEditFormState>({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    tel: '',
    university: '',
    group_number: '',
    role: '',
})

const currentProfile = ref<CurrentUserProfile | null>(null)
const initialSnapshot = ref<EditableSnapshot | null>(null)
const initialUniversity = ref('')
const universities = ref<UniversityChoice[]>([])
const groups = ref<StudentGroup[]>([])
const isLoading = ref(false)
const isSubmitting = ref(false)
const isUniversitiesLoading = ref(false)
const isGroupsLoading = ref(false)
const pageError = ref('')
const formError = ref('')
const successMessage = ref('')
const universitiesError = ref('')
const groupsError = ref('')
const passwordModalOpen = ref(false)
const passwordError = ref('')
const isPasswordSubmitting = ref(false)
const isInitializing = ref(false)
let groupsRequestId = 0

const universityOptions = computed(() => universities.value.map((university) => ({
    value: String(university.id),
    label: university.name,
})))

const groupOptions = computed(() => groups.value.map((group) => ({
    value: String(group.id),
    label: [group.title ?? group.name ?? `Группа ${group.id}`, group.period].filter(Boolean).join(' • '),
})))

const currentGroupTitle = computed(() => currentProfile.value?.group_number_title ?? '')

const currentSnapshot = computed<EditableSnapshot>(() => ({
    username: form.username.trim(),
    first_name: form.first_name.trim(),
    last_name: form.last_name.trim(),
    email: form.email.trim(),
    tel: form.tel.trim(),
    group_number: form.group_number ? String(form.group_number) : null,
}))

const isDirty = computed(() => {
    if (!initialSnapshot.value) return false
    return JSON.stringify(currentSnapshot.value) !== JSON.stringify(initialSnapshot.value)
})

const isGroupSelectionValid = computed(() => !form.university || Boolean(form.group_number))
const canSubmitProfile = computed(() => isDirty.value && isGroupSelectionValid.value)

function normalizeGroups(data: StudentGroup[] | { results: StudentGroup[] }): StudentGroup[] {
    return Array.isArray(data) ? data : data.results
}

function isEmailValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
}

function setFormFromProfile(profile: CurrentUserProfile, preserveUniversity = false) {
    form.first_name = profile.first_name ?? ''
    form.last_name = profile.last_name ?? ''
    form.username = profile.username ?? ''
    form.email = profile.email ?? ''
    form.tel = profile.tel ?? ''
    form.group_number = profile.group_number === null || profile.group_number === undefined
        ? ''
        : String(profile.group_number)
    form.role = formatRole(profile.role) || profile.role || ''

    if (!preserveUniversity) {
        form.university = ''
    }
}

function snapshotFromProfile(profile: CurrentUserProfile): EditableSnapshot {
    return {
        username: profile.username?.trim() ?? '',
        first_name: profile.first_name?.trim() ?? '',
        last_name: profile.last_name?.trim() ?? '',
        email: profile.email?.trim() ?? '',
        tel: profile.tel?.trim() ?? '',
        group_number: profile.group_number === null || profile.group_number === undefined
            ? null
            : String(profile.group_number),
    }
}

function updateField(field: FieldName, value: string) {
    form[field] = value
    formError.value = ''
    successMessage.value = ''
}

function getFriendlyError(error: unknown, fallback: string): string {
    const message = extractApiErrorMessage(error, fallback)
    const normalizedMessage = message.toLowerCase()

    if (isPhoneBackendErrorMessage(message)) {
        return phoneValidationErrorMessage
    }

    if (normalizedMessage.includes('username') && (
        normalizedMessage.includes('already exists') ||
        normalizedMessage.includes('unique') ||
        normalizedMessage.includes('уже')
    )) {
        return 'Пользователь с таким логином уже существует'
    }

    if (normalizedMessage.includes('email') && (
        normalizedMessage.includes('already exists') ||
        normalizedMessage.includes('unique') ||
        normalizedMessage.includes('уже')
    )) {
        return 'Пользователь с такой почтой уже существует'
    }

    if (normalizedMessage.includes('email') && (
        normalizedMessage.includes('valid') ||
        normalizedMessage.includes('коррект')
    )) {
        return 'Введите корректную почту'
    }

    if (normalizedMessage.includes('group_number') || normalizedMessage.includes('invalid pk')) {
        return 'Выберите корректную группу'
    }

    if (normalizedMessage.includes('current_password')) {
        return 'Текущий пароль указан неверно'
    }

    if (normalizedMessage.includes('new_password')) {
        return message.replace(/^new_password:\s*/i, '').trim() || 'Проверьте новый пароль'
    }

    return message || fallback
}

async function loadUniversities() {
    isUniversitiesLoading.value = true
    universitiesError.value = ''

    try {
        universities.value = await studentGroupService.getChoiceValues<UniversityChoice>('university')
    } catch {
        universities.value = []
        universitiesError.value = 'Не удалось загрузить список университетов'
    } finally {
        isUniversitiesLoading.value = false
    }
}

async function loadGroups(universityId: string) {
    const requestId = ++groupsRequestId
    isGroupsLoading.value = true
    groupsError.value = ''

    try {
        const loadedGroups = normalizeGroups(await studentGroupService.getStudentGroups({ university: universityId }))
        if (requestId !== groupsRequestId) return

        groups.value = loadedGroups
    } catch {
        if (requestId !== groupsRequestId) return

        groups.value = []
        groupsError.value = 'Не удалось загрузить группы университета'
    } finally {
        if (requestId === groupsRequestId) {
            isGroupsLoading.value = false
        }
    }
}

function getProfileUniversityId(profile: CurrentUserProfile) {
    const universityId = profile.group?.university?.id
    return universityId === null || universityId === undefined ? '' : String(universityId)
}

async function loadPage() {
    isLoading.value = true
    pageError.value = ''
    formError.value = ''
    successMessage.value = ''
    isInitializing.value = true

    try {
        const profile = await userService.getCurrentUserProfile()
        currentProfile.value = profile
        setFormFromProfile(profile)
        initialSnapshot.value = snapshotFromProfile(profile)

        await loadUniversities()

        const universityId = getProfileUniversityId(profile)
        form.university = universityId
        initialUniversity.value = universityId

        if (universityId) {
            await loadGroups(universityId)
        }
    } catch (error) {
        pageError.value = getFriendlyError(error, 'Не удалось загрузить данные профиля')
    } finally {
        isInitializing.value = false
        isLoading.value = false
    }
}

function buildUpdatePayload() {
    const payload: Partial<EditableSnapshot> = {}

    for (const key of Object.keys(currentSnapshot.value) as Array<keyof EditableSnapshot>) {
        if (currentSnapshot.value[key] !== initialSnapshot.value?.[key]) {
            payload[key] = currentSnapshot.value[key] as never
        }
    }

    return payload
}

async function submitProfile() {
    if (isSubmitting.value) return

    formError.value = ''
    successMessage.value = ''

    if (!form.username.trim()) {
        formError.value = 'Введите логин'
        return
    }

    if (form.email.trim() && !isEmailValid(form.email)) {
        formError.value = 'Введите корректную почту'
        return
    }

    if (!isOptionalPhoneValid(form.tel)) {
        formError.value = phoneValidationErrorMessage
        return
    }

    if (!isGroupSelectionValid.value) {
        formError.value = 'Выберите группу'
        return
    }

    if (!isDirty.value) return

    isSubmitting.value = true

    try {
        const updatedProfile = await userService.updateCurrentUserProfile(buildUpdatePayload())
        currentProfile.value = updatedProfile
        setFormFromProfile(updatedProfile, true)
        initialSnapshot.value = snapshotFromProfile(updatedProfile)
        initialUniversity.value = form.university
        userStore.setUser(updatedProfile)
        profileStatisticsStore.clearProfile()
        await router.push('/profile')
    } catch (error) {
        formError.value = getFriendlyError(error, 'Не удалось сохранить данные профиля')
    } finally {
        isSubmitting.value = false
    }
}

function resetForm() {
    if (!currentProfile.value) return

    isInitializing.value = true
    form.university = initialUniversity.value
    setFormFromProfile(currentProfile.value, true)
    isInitializing.value = false
}

async function cancelEdit() {
    if (isDirty.value) {
        resetForm()
        formError.value = ''
        successMessage.value = ''
        return
    }

    await router.push('/profile')
}

async function submitPassword(payload: ChangePasswordPayload) {
    passwordError.value = ''
    successMessage.value = ''
    isPasswordSubmitting.value = true

    try {
        await userService.changeCurrentUserPassword(payload)
        passwordModalOpen.value = false
        successMessage.value = 'Пароль успешно изменен'
    } catch (error) {
        passwordError.value = getFriendlyError(error, 'Не удалось изменить пароль')
    } finally {
        isPasswordSubmitting.value = false
    }
}

watch(() => form.university, (universityId) => {
    if (isInitializing.value) return

    form.group_number = ''
    groups.value = []
    groupsError.value = ''
    groupsRequestId += 1

    if (universityId) {
        void loadGroups(universityId)
    }
})

onMounted(loadPage)
</script>

<template>
    <main class="min-h-screen bg-page py-8 font-mono text-app-text sm:py-12">
        <AppContainer as="section">
            <div class="mx-auto max-w-[1760px]">
                <div class="mb-10 flex items-center justify-between gap-4 border-b border-app-border pb-6 sm:mb-16 sm:pb-7">
                    <p class="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[14px] leading-none sm:text-[17px] xl:text-[18px]">
                        <span class="text-profile-prompt">&gt;_</span>
                        UPDATE users SET profile_data = new_values WHERE id = current_user;
                    </p>
                    <RouterLink
                        to="/profile"
                        class="hidden w-fit shrink-0 rounded-[8px] border border-app-border px-3 py-1 text-[13px] text-app-text transition hover:opacity-75 sm:inline-flex"
                    >
                        [ профиль ]
                    </RouterLink>
                </div>

                <div v-if="isLoading" class="flex min-h-[320px] items-center justify-center text-center">
                    <AppLoader text="Загрузка профиля" mode="inline" />
                </div>

                <div v-else-if="pageError" class="rounded-[10px] border border-app-border bg-profile-card-gradient px-6 py-12 text-center text-danger">
                    {{ pageError }}
                </div>

                <div v-else class="grid gap-10 xl:grid-cols-[minmax(0,1220px)_410px] xl:items-start xl:justify-center">
                    <ProfileEditForm
                        :form="form"
                        :university-options="universityOptions"
                        :group-options="groupOptions"
                        :current-group-title="currentGroupTitle"
                        :is-universities-loading="isUniversitiesLoading"
                        :is-groups-loading="isGroupsLoading"
                        :universities-error="universitiesError"
                        :groups-error="groupsError"
                        :form-error="formError"
                        :success-message="successMessage"
                        :is-submitting="isSubmitting"
                        :can-submit="canSubmitProfile"
                        @update:field="updateField"
                        @submit="submitProfile"
                        @cancel="cancelEdit"
                    />

                    <ProfileSecurityCard @change-password="passwordModalOpen = true" />
                </div>
            </div>
        </AppContainer>

        <ProfilePasswordModal
            :open="passwordModalOpen"
            :is-submitting="isPasswordSubmitting"
            :error="passwordError"
            @close="passwordModalOpen = false"
            @submit="submitPassword"
        />
    </main>
</template>
