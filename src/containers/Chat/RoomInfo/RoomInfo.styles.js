export default (theme) => ({
    container: {
        padding: '5px',
        display: 'grid',
        gridGap: '15px'
    },
    title: {
        display: 'grid',
        gridGap: '10px'
    },
    titleText: {
        color: `black`,
        textTransform: 'initial',
        cursor: 'pointer',
        textDecoration: 'none',
        fontSize: '14px',
    },
    line: {
        width: '100%',
        left: '0',
        height: '1px',
        background: 'rgba(0, 0, 0, 0.31)'
    },
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
        display: "grid",
        gridGap: "20px",
        gridAutoRows: "max-content",
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
    elName: {
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
    list: {
        // overflowY: "scroll",
        // "&::-webkit-scrollbar": {
        //     width: 0
        // },
        display: "grid",
        gridGap: "20px",
        gridAutoRows: "max-content",
    },
    administrators:{
        display: 'grid',
        gridGap: '10px',
    },
    subscribers:{
        display: 'grid',
        gridGap: '10px',
    },
    footer: {
        display: 'grid',
        gridGap: '10px',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textWarning: {
        color: 'red',
        textTransform: 'initial',
        textDecoration: 'none',
        fontSize: '16px',
    },
    edit: {
        height: '20px',
        width: '20px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2px',
        cursor: 'pointer',
        transition: '.5s',
        "&::before": {
            content: "''",
            position: 'relative',
            height: '3px',
            width: '3px',
            borderRadius: '50%',
            background: 'black'
        },
        "&::after": {
            content: "''",
            position: 'relative',
            height: '3px',
            width: '3px',
            borderRadius: '50%',
            background: 'black'
        },
        // "&:hover": {
        //     background: '#00000054'
        // }
    },
    point: {
        height: '3px',
        width: '3px',
        borderRadius: '50%',
        background: 'black'
    }
})
