export default (theme) => ({
    header: {
        display: 'grid',
        gridTemplateColumns: '30px 1fr',
        gridGap: '20px',
    },
    avatar: {
        maxWidth: '40px',
        maxHeight: '40px',
        minWidth: '40px',
        minHeight: '40px',
        background: '#DC3183',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        color: `white`,
        textTransform: 'initial',
        textDecoration: 'none',
        fontSize: '18px',
    },
    chatElInfo: {
        display: 'grid',
        gridGap: '2px'
    },
    chatElName: {
        color: `black`,
        textTransform: 'initial',
        textDecoration: 'none',
        fontSize: '16px',
        maxWidth: '100%',

        whiteSpace: 'nowrap',
        overflow: 'hidden',
        paddingRight: '5px',
        textOverflow: 'ellipsis',
    },
    chatElSubs: {
        color: `#2652A`,
        textTransform: 'initial',
        textDecoration: 'none',
        fontSize: '12px',
    },
    body: {
        marginTop: '30px',
        display: 'grid',
        gridGap: '12px'
    },
    rights: {
        display: 'flex',
        gap: '5px',
        alignItems: 'center'
    },
    switcher: {
        position: 'relative',

        width: '50px',
        height: '20px',
        background: ' #D9D9D9',
        borderRadius: '20px',

        display: 'flex',
        alignItems: 'center',
        transition: '.5s'

    },

    switcher_turn: {
        background: 'rgba(220, 49, 131, 0.7)',
    },
    switcherTrigger: {
        position: 'absolute',
        minWidth: '24px',
        height: '24px',
        background: '#DC3183',
        border: '1px solid #DC3183',
        borderRadius: '50%',
        transition: '.5s',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    switcherTrigger_turn: {
        marginLeft: 'calc(100% - 24px)'
    },
    saveButton: {
      marginTop: '15px'
    },
    deleteButton: {
      marginTop: '15px'
    },
    footer: {
        display: 'flex',
        justifyContent: 'center'
    }

})
