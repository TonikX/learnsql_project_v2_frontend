import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/styles/main.scss'
import { useThemeStore } from '@/stores/themeStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

const themeStore = useThemeStore()
themeStore.initThemeMode()

app.use(router)

app.mount('#app')
