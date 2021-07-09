export default (theme) => ({
    tabMenu: {
        display: 'flex',
        borderBottom: '1px solid #f4f4f4'
    },
    courseTabContent: {
        height: '100%',
    },
    paper: {
        height: '100%',
        boxShadow: '0px 0px 6px 1px rgba(194,194,194,0.3)',
        overflow: 'hidden'
    },
    tabs: {
        padding: '0px 50px'
    },
    tab: {
        padding: '20px'
    },
    tabRoot: {
        display: 'flex',
        flexDirection: 'row',
        '& svg': {
            marginRight: 10
        }
    },
    tabSelected: {
        color: theme.palette.secondary.main,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPaper: {
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > span': {
            marginTop: 10,
            color: 'grey'
        },
        '& button': {
            margin: 30
        }
    },
});