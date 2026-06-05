import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import PublicLayout from '@/components/layout/PublicLayout.vue'
import { useAuthStore } from '@/stores/authStore'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: PublicLayout,
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/views/HomeView.vue')
            },
            {
                path: 'login',
                name: 'login',
                component: () => import('@/views/LoginView.vue'),
                meta: { hideFooter: true, guestOnly: true }
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('@/views/RegisterView.vue'),
                meta: { hideFooter: true, guestOnly: true }
            },
            {
                path: 'auth/callback/:provider',
                name: 'social-callback',
                component: () => import('@/views/SocialCallbackView.vue'),
                meta: { hideFooter: true }
            },
            {
                path: 'courses',
                name: 'courses',
                children: [
                    {
                        path: 'all',
                        name: 'all-courses',
                        component: () => import('@/views/CoursesListView.vue'),
                        props: { enrolledOnly: false }
                    },
                    {
                        path: 'my',
                        name: 'my-courses',
                        component: () => import('@/views/CoursesListView.vue'),
                        props: { enrolledOnly: true }
                    },
                ]
            },
            {
                path: 'chats',
                name: 'chats',
                component: () => import('@/views/ChatsView.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'profile',
                name: 'profile',
                component: () => import('@/views/ProfileView.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'profile/edit',
                name: 'profile-edit',
                component: () => import('@/views/ProfileEditView.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: 'courses/:course_id',
                name: 'course',
                component: () => import('@/views/CourseView.vue'),
                children: [
                    {
                        path: '',
                        component: () => import('@/components/courses/CourseDetails.vue'),
                    },
                    {
                        path: 'details',
                        name: 'details',
                        component: () => import('@/components/courses/CourseDetails.vue'),
                    }, 
                    {
                        path: 'schema/:task_id',
                        name: 'schema',
                        component: () => import('@/components/courses/DbSchema.vue')
                    },
                    {
                        path: 'problem/:task_id',
                        name: 'problem',
                        component: () => import('@/components/courses/problem/Problem.vue')
                    },
                ],
                meta: { hideFooter: true }
            },
            {
                path: '/:pathMatch(.*)*',
                name: 'not_found',
                component: () => import('@/views/errors/NotFoundView.vue'),
                meta: { hideFooter: true }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        if (to.hash) return { el: to.hash, top: 95, behavior: 'smooth' }
        return { top: 0 }
    },
})

router.beforeEach((to) => {
    const authStore = useAuthStore()

    if (to.meta.guestOnly === true && authStore.isAuth) {
        return { path: '/courses/all' }
    }

    if (to.meta.requiresAuth === true && !authStore.isAuth) {
        return { path: '/login', query: { redirect: to.fullPath } }
    }
})

export default router
