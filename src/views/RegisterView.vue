<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AuthFieldRow from '@/components/auth/AuthFieldRow.vue'
import AuthPageShell from '@/components/auth/AuthPageShell.vue'
import AuthSelect from '@/components/auth/AuthSelect.vue'
import AuthSqlCard from '@/components/auth/AuthSqlCard.vue'
import AuthSubmitArea from '@/components/auth/AuthSubmitArea.vue'
import AuthTextInput from '@/components/auth/AuthTextInput.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import { studentGroupService } from '@/services/studentGroupService'
import { useAuthStore } from '@/stores/authStore'
import type { RegisterRequest, StudentGroup, UniversityChoice } from '@/types/userTypes'
import { isOptionalPhoneValid, phoneValidationErrorMessage } from '@/utils/phoneValidation'

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    tel: '',
    university: '',
    group_number: '',
})

const universities = ref<UniversityChoice[]>([])
const groups = ref<StudentGroup[]>([])
const isUniversitiesLoading = ref(false)
const isGroupsLoading = ref(false)
const universitiesError = ref('')
const groupsError = ref('')
const formError = ref('')
let groupsRequestId = 0

const universityOptions = computed(() => universities.value.map((university) => ({
    value: university.id,
    label: university.name,
})))

const groupOptions = computed(() => groups.value.map((group) => ({
    value: group.id,
    label: [group.title ?? group.name ?? `Группа ${group.id}`, group.period].filter(Boolean).join(' • '),
})))

const shouldShowGroupSelect = computed(() => Boolean(form.university) && (isGroupsLoading.value || groupOptions.value.length > 0 || Boolean(groupsError.value)))
const isGroupRequired = computed(() => Boolean(form.university) && groupOptions.value.length > 0)

function normalizeGroups(data: StudentGroup[] | { results: StudentGroup[] }): StudentGroup[] {
    return Array.isArray(data) ? data : data.results
}

function isEmailValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
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

        if (requestId !== groupsRequestId || form.university !== universityId) return

        groups.value = loadedGroups
    } catch {
        if (requestId !== groupsRequestId || form.university !== universityId) return

        groups.value = []
        groupsError.value = 'Не удалось загрузить группы университета'
    } finally {
        if (requestId === groupsRequestId) {
            isGroupsLoading.value = false
        }
    }
}

function buildPayload(): RegisterRequest {
    const payload: RegisterRequest = {
        username: form.username.trim(),
        password: form.password,
        first_name: form.first_name.trim() || undefined,
        last_name: form.last_name.trim() || undefined,
        tel: form.tel.trim() || undefined,
    }

    if (form.email.trim()) {
        payload.email = form.email.trim()
    }

    if (form.group_number) {
        payload.group_number = Number(form.group_number)
    }

    return payload
}

async function submit() {
    formError.value = ''

    if (!form.username.trim() || !form.password) {
        formError.value = 'Введите логин и пароль'
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

    if (isGroupsLoading.value) {
        formError.value = 'Дождитесь загрузки групп'
        return
    }

    if (groupsError.value) {
        formError.value = 'Не удалось загрузить группы. Выберите университет заново'
        return
    }

    if (isGroupRequired.value && !form.group_number) {
        formError.value = 'Выберите группу'
        return
    }

    try {
        await authStore.register(buildPayload())
    } catch {
        formError.value = authStore.error ?? 'Не удалось зарегистрироваться. Проверьте данные и попробуйте ещё раз'
        return
    }

    try {
        await authStore.login({
            username: form.username.trim(),
            password: form.password,
        })

        await router.push('/courses/all')
    } catch {
        await router.push('/login')
    }
}

watch(() => form.university, (universityId) => {
    groupsRequestId += 1
    form.group_number = ''
    groups.value = []
    groupsError.value = ''
    isGroupsLoading.value = false

    if (universityId) {
        void loadGroups(universityId)
    }
})

onMounted(loadUniversities)
</script>

<template>
    <AuthPageShell variant="register">
        <AuthSqlCard title="Регистрация в LearnSQL" command="INSERT INTO users VALUES (...);">
            <form @submit.prevent="submit">
                <div class="overflow-hidden rounded-[10px] border border-auth-border bg-auth-table">
                    <div class="hidden border-b border-auth-border min-[768px]:grid min-[768px]:grid-cols-[260px_minmax(0,1fr)]">
                        <div class="px-4 py-3 text-[15px] text-app-text min-[768px]:border-r min-[768px]:border-auth-border min-[768px]:px-6 min-[768px]:py-4 min-[768px]:text-[17px]">Поле</div>
                        <div class="px-4 py-3 text-[15px] text-app-text min-[768px]:px-6 min-[768px]:py-4 min-[768px]:text-[17px]">Значение</div>
                    </div>

                    <AuthFieldRow label="Логин" db-type="VARCHAR" register-type>
                        <AuthTextInput v-model="form.username" autocomplete="username" />
                    </AuthFieldRow>

                    <AuthFieldRow label="Имя" db-type="VARCHAR" register-type>
                        <AuthTextInput v-model="form.first_name" autocomplete="given-name" />
                    </AuthFieldRow>

                    <AuthFieldRow label="Фамилия" db-type="VARCHAR" register-type>
                        <AuthTextInput v-model="form.last_name" autocomplete="family-name" />
                    </AuthFieldRow>

                    <AuthFieldRow label="Почта" db-type="VARCHAR" register-type>
                        <AuthTextInput v-model="form.email" type="email" autocomplete="email" />
                    </AuthFieldRow>

                    <AuthFieldRow label="Пароль" db-type="TEXT" register-type>
                        <AuthTextInput v-model="form.password" type="password" autocomplete="new-password" />
                    </AuthFieldRow>

                    <AuthFieldRow label="Телефон" db-type="VARCHAR" register-type>
                        <AuthTextInput v-model="form.tel" autocomplete="tel" placeholder="+7 900 000 00 00" />
                    </AuthFieldRow>

                    <AuthFieldRow label="Университет" db-type="FK" register-type>
                        <AuthSelect
                            v-model="form.university"
                            :disabled="isUniversitiesLoading || universityOptions.length === 0"
                            placeholder="Не указывать университет"
                        >
                            <option v-for="university in universityOptions" :key="university.value" :value="university.value">
                                {{ university.label }}
                            </option>
                        </AuthSelect>
                        <p v-if="isUniversitiesLoading" class="mt-2 text-[13px] leading-snug text-app-text">
                            <AppLoader text="Загрузка университетов" mode="inline" />
                        </p>
                        <p v-if="universitiesError" class="mt-2 text-[13px] leading-snug text-danger">
                            {{ universitiesError }}
                        </p>
                    </AuthFieldRow>

                    <AuthFieldRow v-if="shouldShowGroupSelect" label="Группа" db-type="FK" register-type>
                        <AuthSelect v-model="form.group_number" :disabled="isGroupsLoading" placeholder="Выберите группу">
                            <option v-for="group in groupOptions" :key="group.value" :value="group.value">
                                {{ group.label }}
                            </option>
                        </AuthSelect>
                        <p v-if="isGroupsLoading" class="mt-2 text-[13px] leading-snug text-app-text">
                            <AppLoader text="Загрузка групп" mode="inline" />
                        </p>
                        <p v-if="groupsError" class="mt-2 text-[13px] leading-snug text-danger">
                            {{ groupsError }}
                        </p>
                    </AuthFieldRow>
                </div>

                <AuthSubmitArea
                    action="INSERT"
                    button-type="submit"
                    :loading="authStore.isLoading"
                    loading-text="Создаем аккаунт"
                    :error="formError"
                    link-prefix="Есть аккаунт?"
                    link-text="вход"
                    link-to="/login"
                    hint="Создайте аккаунт, чтобы проходить курсы, решать задачи и отслеживать прогресс"
                />
            </form>
        </AuthSqlCard>
    </AuthPageShell>
</template>
