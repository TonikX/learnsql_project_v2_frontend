export type LandingSpriteIconName =
    | 'chart'
    | 'chat'
    | 'check'
    | 'code'
    | 'target'

export const landingStats = [
    { value: '100+', label: 'SQL-задач' },
    { value: '1000+', label: 'студентов' },
    { value: '2', label: 'готовых курса' },
    { value: '3+', label: 'курса в разработке' },
]

export const landingFeatures: Array<{
    icon: LandingSpriteIconName
    title: string
    text: string
}> = [
    {
        icon: 'code',
        title: 'Практика на SQL-задачах',
        text: 'Решайте задания и учитесь применять SQL в реальных учебных и рабочих сценариях.',
    },
    {
        icon: 'target',
        title: 'Пошаговое обучение',
        text: 'Осваивайте темы последовательно, чтобы уверенно двигаться от основ к более сложным запросам.',
    },
    {
        icon: 'chart',
        title: 'Прогресс по темам и уровням',
        text: 'Отслеживайте результаты, контролируйте развитие навыков и возвращайтесь к сложным темам.',
    },
    {
        icon: 'chat',
        title: 'Поддержка преподавателей',
        text: 'Получайте помощь, задавайте вопросы и разбирайте решения вместе с преподавателями.',
    },
]

export const learningSteps: Array<{
    icon?: LandingSpriteIconName
    number?: string
    title: string
    text: string
    status?: string
    statusTone?: 'success' | 'progress'
}> = [
    {
        icon: 'check',
        title: 'SELECT и базовые запросы',
        text: 'Начните с основ: выборка данных, фильтрация, сортировка',
        status: 'Завершено',
        statusTone: 'success',
    },
    {
        icon: 'check',
        title: 'JOIN и подзапросы',
        text: 'Объединяйте таблицы и работайте со сложными выборками',
        status: 'Завершено',
        statusTone: 'success',
    },
    {
        number: '3',
        title: 'GROUP BY и агрегаты',
        text: 'Группировка данных и агрегирующие функции',
        status: 'В процессе',
        statusTone: 'progress',
    },
    {
        number: '4',
        title: 'Оконные функции',
        text: 'Продвинутая аналитика и расчёты в окнах данных',
    },
    {
        number: '5',
        title: 'Продвинутые SQL-задачи',
        text: 'Оптимизация запросов и решение сложных кейсов',
    },
]
