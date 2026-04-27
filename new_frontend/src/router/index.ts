import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import PublicLayout from '@/components/layout/PublicLayout.vue'

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
                meta: { hideFooter: true }
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('@/views/RegisterView.vue'),
                meta: { hideFooter: true }
            },
            {
                path: 'courses',
                name: 'courses',
                component: () => import('@/views/CoursesListView.vue')
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
                        component: () => import('@/components/courses/Problem.vue')
                    },
                ],
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

export default router
