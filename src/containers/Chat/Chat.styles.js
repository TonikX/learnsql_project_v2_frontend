export default (theme) => ({

    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        gap: '40px',
    },

    infoPanel: {
        width: '100%',
        maxWidth: '270px',
        height: '100%',

        border: '2px solid #E5E5E5',
        borderRadius: '10px',

        display: 'grid',
        gridTemplateRows: 'max-content max-content minmax(0px, 1fr) 65px',
        gridGap: '10px',

        padding: '5px',
    },
    button: {
        marginLeft: 10
    },
    scrollListContainer: {
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
            width: 0
        },
        display: "grid",
        gridGap: "20px",
        gridAutoRows: "max-content",
    },
    headerInfoPanel: {
        display: 'flex',
    },
    navButton: {
        width: '100%',
        padding: '10px',
        borderRadius: '10px',

        display: 'flex',
        justifyContent: 'center',

        color: `#2652A`,
        textTransform: 'initial',
        cursor: 'pointer',
        textDecoration: 'none',
        fontSize: '18px',

        transition: '.5s',
    },
    navButtonSelect: {
        width: '100%',
        padding: '10px',
        borderRadius: '10px',
        background: '#2652A3',
        color: 'white'
    },
    chatEl: {
        padding: '6px',
        display: 'flex',
        gap: '8px',

        color: `#2652A`,
        textTransform: 'initial',
        cursor: 'pointer',
        textDecoration: 'none',
        fontSize: '18px',
    },
    chatElSelect: {
        background: '#00000012',
        borderRadius: '10px'
    },
    avatar: {
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

    // modal: {
    //     position: "fixed",
    //     height: "100%",
    //     width: "100%",
    //     left: 0,
    //     top: 0,
    //     background: "#00000057",
    //     display: "none",
    //     alignItems: "center",
    //     justifyContent: "center",
    // },
    // "modal_show": {
    //     display: "flex"
    // },
    // modalContent: {
    //     padding: "20px",
    //     background: "white",
    //     borderRadius: "20px",
    //     display: "grid",
    //     gridGap: "20px"
    // },
    // container: {
    //     boxSizing: "border-box",
    //     height: "100%",
    //     width: "100%",
    //     display: "flex",
    //     // border: "2px solid #E5E5E5",
    //     borderRadius: "8px",
    //     padding: "25px"
    // },
    // leftPanel: {
    //     "display": "grid",
    //     "gridAutoFlow": "row",
    //     "grid-gap": "20px",
    //     gridTemplateRows: "1fr 1fr"
    // },
    // contentOnLeftPanel: {
    //     overflow: "hidden",
    //     padding: "8px",
    //     border: "2px solid #E5E5E5",
    //     borderRadius: "8px",
    //     display: "grid",
    //     "gridGap": "20px",
    //     "grid-template-rows": "50px 1fr",
    //     // "boxShadow": "0 4px 64px rgb(0 0 0 / 10%)",
    // },
    // roomList: {
    //     overflow: "hidden",
    //     padding: "8px",
    //     border: "2px solid #E5E5E5",
    //     borderRadius: "8px",
    //     display: "grid",
    //     gridGap: "20px",
    //     gridTemplateRows: "50px 50px 1fr",
    //     // "boxShadow": "0 4px 64px rgb(0 0 0 / 10%)",
    // },
    // list: {
    //     overflowY: "scroll",
    //     "&::-webkit-scrollbar": {
    //         width: 0
    //     },
    //     display: "grid",
    //     gridGap: "20px",
    //     gridAutoRows: "max-content",
    // },
    // elOfList: {
    //     padding: "2px",
    //     color: "black",
    //     textDecoration: "none"
    // },
    // input: {},
    // userList: {
    //     maxHeight: "100px",
    //     overflowY: "scroll",
    //     "&::-webkit-scrollbar": {
    //         width: 0
    //     },
    //     display: "grid",
    //     gridGap: "20px",
    //     gridAutoRows: "max-content",
    // }
    // tabSelected: {
    //     color: theme.palette.secondary.main,
    // }
});
