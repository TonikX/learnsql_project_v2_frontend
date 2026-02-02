export default (theme) => ({
    root: {
        height: '100%',
        position: 'relative'
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
        minWidth: 200,
        borderRight: '1px solid #f4f4f4',
        '&:focus': {
            outline: 'none'
        },
        paddingBottom: 100,
    },
    doneIcon: {
        color: theme.palette.secondary.main,
        marginRight: 10,
    },
    selectedMenuItem: {
        color: theme.palette.secondary.main,
        backgroundColor: 'transparent !important',
        borderLeft: '2px solid #ec1946',
        padding: '10px 16px',
        '&:hover': {
            backgroundColor: '#f4f4f4 !important'
        }
    },
    menuItem: {
        justifyContent: 'space-between',
        padding: '10px 16px',
        '&:hover': {
            backgroundColor: '#f4f4f4 !important',
            color: theme.palette.secondary.main,
        }
    }
});