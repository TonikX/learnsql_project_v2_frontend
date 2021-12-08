export default (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: 50,
        justifyContent: 'center',
        textAlign: 'center'
    },
    card: {
        boxShadow: 'none !important',
        border: '2px solid #E5E5E5',
        borderRadius: '8px',
        padding: 15,
        width: '100%',
        marginRight: '50px',
        marginBottom: '50px',
        boxSizing: 'border-box',
        maxWidth: '500px',
    },
    form: {
        boxShadow: '0px 0px 6px 1px rgba(194,194,194,0.3)',
        background: 'white',
        margin: 'auto',
        width: '70$',
        display: 'flex',
        flexDirection: 'column',
        padding: '50px'
    },
    title: {
        fontSize: 20,
        fontWeight: 500,
        marginBottom: '25px'
    },
    description: {
        marginTop: 20,
    },
    descriptionFeedback: {
        marginBottom: 30,
    },
    textField: {
        marginBottom: '15px',
        width: '100%',
        height: '30%',
    },
    button: {
        marginTop: '15px',
        width: '100%'
    },
    actions: {
        padding: 16,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});