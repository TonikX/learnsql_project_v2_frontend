export default (theme) => ({
    content: {
        width: '80%',
        height: '100%',
        fontFamily: 'sans-serif',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: '78px',
        marginBottom: '78px'
    },
    wrapper: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    button: {
        marginTop: '15px'
    },
    noAccount: {
        marginTop: '15px'
    },
    addButton: {
        display: 'flex',
        justifyContent: 'end'
    },
    marginBottom: {
        marginBottom: '30px',
        width: '90%',
    },
    backButton: {
        position: 'fixed',
        marginLeft: '-10%',
        color: '#666',
        fontSize: '18px'
    },
    closeButton: {
        color: '#666',
        fontSize: '18px'
    },
    formContainer: {
        width: '850px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fieldContainer: {
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'space-between',
        paddingBottom: '30px'
    },
    textareaContainer: {
        height: '15em',
        width: '80%',
        paddingBottom: '30px'
    },
    inputContainer: {
        height: '2em',
        width: '80%',
        resize: 'none',
        fontSize: '18px'
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    modalContainer: {
        width: '400px',
        paddingBottom: '20px',
        textAlign: 'center'
    },
});