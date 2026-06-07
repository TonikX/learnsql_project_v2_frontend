import type { Theme } from '@/types/theme'

const prismThemesImport = {
    light: () => import('prismjs/themes/prism.css?url'),
    dark: () => import('prismjs/themes/prism-tomorrow.css?url'),
    system: () => import('prismjs/themes/prism.css?url')
}

export const loadPrismTheme = async (theme: Theme) => {
    const oldLink = document.getElementById('prism-theme')
    if (oldLink) {
        oldLink.remove()
    }

    const themeModule = await prismThemesImport[theme]()
    const link = document.createElement('link')

    link.id = 'prism-theme'
    link.rel = 'stylesheet'
    link.href = themeModule.default

    document.head.appendChild(link)
}
