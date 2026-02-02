export default (theme) => ({
    root: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: '20px',
        padding: 20,
        '@media (max-width: 1180px)': {
            gridTemplateColumns: '1fr',
        }
    },
    startDate: {
        color: theme.palette.primary.main
    },
    button: {
        borderRadius: '35px',
        boxShadow: 'none',
    },
    ratingSubtitle: {
        display: 'flex',
        alignItems: 'center'
    },
    themeGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: '0px 10px',
        '& p': {
            fontSize: '14px'
        },
        '@media (max-width: 1400px)': {
            gridTemplateColumns: '1fr',
        },
        '@media (max-width: 1180px)': {
            gridTemplateColumns: '1fr 1fr',
        },
        '@media (max-width: 980px)': {
            gridTemplateColumns: '1fr',
        }
    },
    themesSubtitle: {
        fontWeight: 'bold',
        marginTop: '10px'
    },
    subTitle: {
        marginRight: '10px',
        fontSize: '16px',
        '& p': {
            fontSize: '16px'
        }
    },
    card: {
        boxShadow: 'none',
        border: `2px solid #E5E5E5`,
        padding: 25,
        borderRadius: '8px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        fontSize: 20,
        fontWeight: 500,
    },
    description: {
        marginTop: 20,
    },
    actions: {
        marginTop: 'auto',
        padding: 16,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '@media (max-width: 980px)': {
            justifyContent: 'flex-start',
        }
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            color: theme.palette.primary.dark,
        }
    },
    date: {
        color: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center'
    }
});