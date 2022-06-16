export default (theme) => ({
    modalContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        color: `black`,
        textTransform: 'initial',
        textDecoration: 'none',
        fontSize: '18px',
        marginBottom: "20px"
    },
    roomName: {
      marginBottom: '20px'
    },
    searchBlock: {
        position: 'relative',
        display: 'grid',
        gridGap: '10px',
        marginBottom: "30px"
    },
    scrollList: {
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
            width: 0
        },
        display: "grid",
        gridGap: "20px",
        gridAutoRows: "max-content",
        zIndex: '10'
    },
    searchedUsers: {
        position: 'absolute',
        maxHeight: "300px",
        top: "calc(100% + 10px)",
        background: 'white',
        padding: '15px',
        borderRadius: '15px',
        maxWidth: '100%',
        width: '100%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, 0)',
        boxShadow: '2px 2px 10px 2px rgb(0 0 0 / 25%)',
        boxSizing: 'border-box'
    },
    selectedUsers: {
        maxHeight: "300px",
        background: 'white',
        borderRadius: '15px',
        maxWidth: '100%',
        marginBottom: '20px'
    },
    searchedUser: {
        fontSize: '20px',
        overflow: 'hidden',
        width: '100%',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        paddingRight: '5px'
    },
     elInBody: {
        padding: '6px 0',
        display: 'grid',
        gridTemplateColumns: 'auto max-content',
        gridGap: '150px'
    },
    left: {
        display: 'flex',
        gap: '8px',

        color: `#2652A`,
        textTransform: 'initial',
        cursor: 'pointer',
        textDecoration: 'none',
        fontSize: '18px',
    },
    right: {
        display: 'flex',
        alignItems: 'center'
    },
    rightText: {
        color: `#2652A`,
        textTransform: 'initial',
        cursor: 'pointer',
        textDecoration: 'none',
        fontSize: '14px',
    },
    infoEL: {
        display: 'grid',
        alignItems: 'center'
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

})
