export default (theme) => ({
    header: {
        zIndex: 10000,
        boxShadow: 'none',
        display: 'flex',
    },
    popper: {
        zIndex: '10000 !important'
    },
    menuLink: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        '&:hover': {
            color: theme.palette.text.primary
        }
    },
    link: {
        color: '#fff',
        textTransform: 'initial',
        cursor: 'pointer',
        textDecoration: 'none',
        marginLeft: '30px',
        fontSize: '18px',
        display: 'flex',
    },
    logo: {
        width: '210px',
        position: 'relative',
        top: '2px',
    },
    help: {
        marginLeft: 'auto'
    }
});