export const processTopicData = (topics) => {
    return {
        id: '1',
        name: 'Тестирование',
        questions: topics.map(item => ({
            body: `Как хорошо вы знаете тему: "${item.theme.title}"`,
            options: ['Отлично', 'Выше среднего', "Средне", "Плохо", "Первый раз о ней слышу"],
            id: item.id,
            themeId: item.theme.id
        }))
    }
}