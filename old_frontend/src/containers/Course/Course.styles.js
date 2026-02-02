export default (theme) => ({
    tabMenu: {
        borderBottom: '1px solid #f4f4f4'
    },
    courseTabContent: {
        height: '100%',
    },
    paper: {
        height: '100%',
        boxShadow: 'none !important',
        border: '1px solid #f4f4f4',
        overflow: 'hidden'
    },
    tabs: {
        padding: '0px',
    },
    tab: {
        padding: '20px',
        fontSize: '14px',
        maxWidth: 'initial',
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
    }
});