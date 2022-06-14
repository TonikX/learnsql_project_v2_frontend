export default (theme) => ({
    room: {
        height: '100%',
        width: '100%',
        borderRadius: '10px',
        border: '2px solid #2652A3',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateRows: '60px 1fr 60px'
    },
    roomPanel: {
        boxSizing: 'border-box',
        height: '60px',
        width: '100%',
        background: '#2652A3',
        // borderRadius: '10px 10px 0 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
        padding: '0 15px'
    },
    roomBody: {
        // width: '100%',
        // height: '100%',
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
            width: 0
        },

    },
    roomMessages: {
        display: 'grid',
        gridGap: '20px',

        gridAutoRows: "max-content",
        padding: '0 20px',
        height: 'auto',
        maxWidth: '100%'
    },
    roomInfoContainer: {
        maxWidth: '80%',
        display: 'grid',
        gridGap: '10px',
        gridTemplateColumns: '30px auto',
        alignItems: 'center'
    },
    roomNameContainer: {
        height: '100%',
        overflow: 'hidden',
        display: 'grid'
    },
    roomName: {
        color: `white`,
        textTransform: 'initial',

        textDecoration: 'none',
        fontWeight: '400',
        fontSize: '20px',
        overflow: 'hidden',

        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        paddingRight: '5px'
    },
    chatElSubs: {
        color: `white`,
        textTransform: 'initial',
        textDecoration: 'none',
        fontSize: '12px',
    },
    roomAvatar: {
        height: '30px',
        width: '30px',
        background: '#DC3183',
        borderRadius: '50%',
        cursor: 'pointer'
    },
    roomMessageVoid: {
        height: '20px',
        width: '100%'
    },
    roomMessage: {

        // color: 'white',
        // textDecoration: 'none',
        // fontSize: '16px',
        // display: 'flex',
        // alignItems: 'center',
        width: 'auto',
        maxWidth: '80%',
        height: 'max-content',
        display: 'flex',
        gap: '5px',
        alignItems: 'flex-end'
    },
    roomMessage_left: {
        justifySelf: 'start'
    },
    roomMessage_right: {
        justifySelf: 'end'
    },
    roomMessageAvatar: {
        minHeight: '30px',
        minWidth: '30px',
        borderRadius: '50%',
        background: '#DC3183'
    },
    roomMessageInfo: {
        background: '#2652a3db',
        padding: '10px',
        display: 'grid',
        gridGap: '5px',
        borderRadius: '10px',
    },
    roomMessageUserInfo: {
        color: '#DC3183',
        fontWeight: '400',
        textDecoration: 'none',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        width: 'max-content',
        height: 'max-content',
    },
    roomMessageText: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        height: 'max-content',
        overflowWrap: 'anywhere'
    },
    roomMessageTime: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '11px',
        display: 'flex',
        alignItems: 'flex-end',
        height: 'max-content',
        overflowWrap: 'anywhere'
    },
    messagePanel: {
      display: 'grid',
      gridTemplateColumns: '3fr 1fr'
    },
    messageInput: {
        borderRadius: '10px',
        border: 'none',
        background: 'white',
        padding: '15px',
        outline: 'none'
    },
    messageButton: {
        borderRadius: '10px',
        border: 'none',
        background: 'white',
        padding: '15px',
        outline: 'none',
        textTransform: 'initial',
        // color: theme.palette.secondary.main,
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: '400',
        transition: '.5s'
    },
    messageButton_disabled: {
        opacity: '0.6'
    }
});
