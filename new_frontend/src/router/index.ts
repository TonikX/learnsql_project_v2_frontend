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
                component: () => import('@/views/CoursesView.vue')
            },
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
