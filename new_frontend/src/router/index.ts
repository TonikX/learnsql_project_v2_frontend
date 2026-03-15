import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import PublicLayout from ''

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
                component: () => import('@/views/LoginView.vue')
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('@/views/RegisterView.vue')
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        if (to.hash) return { el: to.hash, behavior: 'smooth'}
        return { top: 0}
    },
})

export default router
