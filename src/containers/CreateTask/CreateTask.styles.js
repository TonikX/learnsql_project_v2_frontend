export default (theme) => ({
    root: {
        width: '70%',
        height: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: '50px'
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        textAlign: 'center',
        color: theme.palette.primary.main,
        marginBottom: '20px'
    },
    backButton: {
        position: 'fixed',
        marginLeft: '-10%',
        fontSize: '16px'
    },
    marginBottom: {
        marginBottom: '30px'
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'end',
    },
    fieldContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'space-between',
        marginBottom: '30px',
        width: '100%'
    },
    inputLabel: {
        marginRight: '5px',
        marginBottom: '10px',
    },
    selectContainer: {
        display: 'flex',
        justifyContent: 'start',
        marginBottom: '30px',
        alignItems: 'center'
    },
    selectTitle: {
        width: '10%'
    },
});