export default (theme) => ({
    content: {
        width: '80%',
        height: '100%',
        fontFamily: 'sans-serif',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: '78px',
        marginBottom: '78px',
    },
    wrapper: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    button: {
        marginTop: '15px'
    },
    addButton: {
        display: 'flex',
        justifyContent: 'end'
    },
    backButton: {
        fontSize: '18px',
        position: 'fixed',
        marginLeft: '-10%',
        color: '#666',
    },
    modalContainer: {
        width: '400px',
        paddingBottom: '20px',
        textAlign: 'center'
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'space-around'
    }
});