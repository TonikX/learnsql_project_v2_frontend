export default (theme) => ({
    root: {
        width: '70%',
        height: '100%',
        fontFamily: 'sans-serif',
        fontSize: '18px',
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
        color: '#666',
        fontSize: '18px'
    },
    inputContainer: {
        height: '2em',
        width: '90%',
        resize: 'none',
        fontSize: '18px'
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'end'
    },
    selectField: {
        fontSize: '18px',
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
    marginBottom: {
        marginBottom: '30px'
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
    textareaContainer: {
        marginBottom: '30px',
        width: '100%'
    },
    selectContainerThemes: {
        display: 'flex',
        justifyContent: 'start',
        marginBottom: '30px',
        alignItems: 'start'
    }
});