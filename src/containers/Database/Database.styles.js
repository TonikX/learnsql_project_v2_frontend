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
        marginTop: '-100px',
        fontSize: '16px'
    },
    marginBottom: {
        marginBottom: '30px'
    },
    inputLabel: {
        marginRight: '5px',
        marginBottom: '10px',
    },
    fieldContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'space-between',
        marginBottom: '30px',
        width: '100%'
    },
    textareaContainer: {
        marginBottom: '30px',
        width: '100%'
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'end'
    },
    fileContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        marginBottom: '30px'
    },
    fileTitle: {
        width: '10%'
    },
    fileField: {
        fontSize: '16px',
        fontFamily: 'serif'
    }
});