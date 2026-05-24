<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthFieldRow from '@/components/auth/AuthFieldRow.vue'
import AuthPageShell from '@/components/auth/AuthPageShell.vue'
import AuthSelect from '@/components/auth/AuthSelect.vue'
import AuthSqlCard from '@/components/auth/AuthSqlCard.vue'
import AuthSubmitArea from '@/components/auth/AuthSubmitArea.vue'
import AuthTextInput from '@/components/auth/AuthTextInput.vue'
import { studentGroupService } from '@/services/studentGroupService'
import { useAuthStore } from '@/stores/authStore'
import type { RegisterRequest, StudentGroup } from '@/types/userTypes'

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    tel: '',
    group_number: '',
    isStudent: true,
})

const groups = ref<StudentGroup[]>([])
const isGroupsLoading = ref(false)
const formError = ref('')

const groupOptions = computed(() => groups.value.map((group) => ({
    value: group.id,
    label: [group.title ?? group.name ?? `Группа ${group.id}`, group.period].filter(Boolean).join(' • '),
})))

function normalizeGroups(data: StudentGroup[] | { results: StudentGroup[] }): StudentGroup[] {
    return Array.isArray(data) ? data : data.results
}

async function loadGroups() {
    isGroupsLoading.value = true

    try {
        groups.value = normalizeGroups(await studentGroupService.getStudentGroups())
    } catch {
        groups.value = []
    } finally {
        isGroupsLoading.value = false
    }
}

function buildPayload(): RegisterRequest {
    const payload: RegisterRequest = {
        username: form.username,
        email: form.email,
        password: form.password,
        first_name: form.first_name || undefined,
        last_name: form.last_name || undefined,
        tel: form.tel || undefined,
        role: form.isStudent ? 'student' : undefined,
    }

    if (form.group_number) {
        payload.group_number = Number(form.group_number)
    }

    return payload
}

async function submit() {
    formError.value = ''

    if (!form.username || !form.email || !form.password) {
        formError.value = 'Введите логин, почту и пароль'
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
            username: form.username,
            password: form.password,
        })

        await router.push('/courses/all')
    } catch {
        await router.push('/login')
    }
}

onMounted(loadGroups)
</script>

<template>
    <AuthPageShell variant="register">
        <AuthSqlCard title="Регистрация в LearnSQL" command="INSERT INTO users VALUES (...);">
            <form @submit.prevent="submit">
                <div class="overflow-hidden rounded-[10px] border border-auth-border bg-auth-table">
                    <div class="grid border-b border-auth-border sm:grid-cols-[260px_minmax(0,1fr)]">
                        <div class="px-4 py-3 text-[15px] text-app-text sm:border-r sm:border-auth-border sm:px-6 sm:py-4 sm:text-[17px]">Поле</div>
                        <div class="px-4 py-3 text-[15px] text-app-text sm:px-6 sm:py-4 sm:text-[17px]">Значение</div>
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

                    <AuthFieldRow label="Группа" db-type="FK" register-type>
                        <AuthSelect v-model="form.group_number" :disabled="isGroupsLoading" placeholder="Не указывать группу">
                            <option v-for="group in groupOptions" :key="group.value" :value="group.value">
                                {{ group.label }}
                            </option>
                        </AuthSelect>
                    </AuthFieldRow>

                    <AuthFieldRow label="Роль" db-type="BOOLEAN" register-type>
                        <label class="flex cursor-pointer items-center gap-3 text-[15px] text-app-text sm:text-[17px]">
                            <input v-model="form.isStudent" type="checkbox" class="peer sr-only" />
                            <span class="flex h-5 w-5 items-center justify-center rounded-[4px] border border-auth-border bg-auth-input transition peer-checked:border-auth-checkbox-border peer-checked:bg-auth-checkbox-bg peer-checked:[&_svg]:opacity-100">
                                <svg class="h-4 w-4 text-auth-checkbox-mark opacity-0 transition" viewBox="0 0 16 16" aria-hidden="true">
                                    <path d="M3.3 8.1 6.6 11.4 12.8 4.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                            Студент
                        </label>
                    </AuthFieldRow>
                </div>

                <AuthSubmitArea
                    action="INSERT"
                    button-type="submit"
                    :loading="authStore.isLoading"
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
