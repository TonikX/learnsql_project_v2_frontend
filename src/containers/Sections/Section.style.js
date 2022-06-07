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
    marginBottom: {
        marginBottom: '30px',
        width: '90%',
    },
    formContainer: {
        width: '850px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '400px',
        paddingBottom: '20px',
        textAlign: 'center'
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    selectTitle: {
        width: '10%'
    },
    sectionItem: {
        display: 'flex',
        alignItems: 'start',
        border: '1px solid #979797',
        borderRadius: '10px',
        marginBottom: '30px',
        fontFamily: 'sans-serif',
        padding: '25px 20px',
        fontSize: '18px'
    },
    itemContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    blueCircle: {
        minWidth: '13px',
        height: '13px',
        background: theme.palette.primary.main,
        borderRadius:'50%',
        marginRight: '15px'
    },
    info: {
        marginLeft: '40px'
    },
    moreInfoButton: {
        color: '#666',
        fontSize: '18px',
        cursor: 'pointer',
        marginRight: '15px'
    },
    icons: {
        marginRight: 0,
        marginLeft: 'auto'
    },
    fieldContainer: {
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'space-between',
        paddingBottom: '30px'
    },
    selectContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        width: '90%',
        marginBottom: '30px'
    }
});