export default (theme) => ({
    root: {
        height: '100%'
    },
    answerFieldContainer: {
        marginTop: 20,
        maxWidth: '600px'
    },
    buttonsContainer: {
        marginTop: 20
    },
    button: {
        marginLeft: 10
    },
    menu: {
        paddingBottom: 100,
        minWidth: 250,
        width: 320,
        borderRight: '1px solid #f4f4f4',
        '&:focus': {
            outline: 'none !important'
        },
        '& div': {
            '&:focus': {
                outline: 'none !important'
            },
        }
    },
    subMenu: {
        padding: 0,
        '& li': {
            padding: '10px 26px 10px 40px',
        }
    },
    noClick: {
        pointerEvents: 'none'
    },
    doneIcon: {
        color: 'green'
    },
    selectedMenuItem: {
        whiteSpace: 'normal !important',
        color: theme.palette.secondary.main,
        backgroundColor: 'transparent !important',
        borderLeft: '2px solid #ec1946',
        padding: '10px 16px',
        '&:hover': {
            backgroundColor: '#f4f4f4 !important'
        }
    },
    menuItem: {
        whiteSpace: 'normal !important',
        justifyContent: 'space-between',
        padding: '10px 16px',
        '&:hover': {
            backgroundColor: '#f4f4f4 !important',
            color: theme.palette.secondary.main,
        }
    }
});