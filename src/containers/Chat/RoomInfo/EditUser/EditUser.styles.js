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
      width: '100%'
    },
    deleteButton: {
           width: '100%'
    },
    footer: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        alignItems: 'center'
    },
    warn: {
        color: `red`,
        textTransform: 'initial',
        textDecoration: 'none',
        fontSize: '16px',
        background: 'white',
        height: '100%',
        width: '100%',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        position: 'relative'
    },
    warn_show: {
        display: 'flex'
    },
    warnText: {
        position: 'absolute',
        height: 'auto',
        maxWidth: '350px',
        top: '100%',
        marginTop: '20px',
        opacity: 0,
        transition: '.5s',
        ':hover > &': {
            opacity: 1
        },
        background: 'white',
        padding: '15px',
        boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.05)',
        borderRadius: '14px',
        zIndex: '10003'
    }

})
