export default (theme) => ({
    modal: {
        position: "fixed",
        height: "100%",
        width: "100%",
        left: 0,
        top: 0,
        background: "#00000057",
        display: "none",
        alignItems: "center",
        justifyContent: "center",

    },
    "modal_show": {
        display: "flex"
    },
    modalContent: {
        padding: "20px",
        background: "white",
        borderRadius: "20px",
        display: "grid",
        gridGap: "20px"
    },
    container: {
        boxSizing: "border-box",
        height: "100%",
        width: "100%",
        display: "flex",
        // border: "2px solid #E5E5E5",
        borderRadius: "8px",
        padding: "25px"
    },
    leftPanel: {
        "display": "grid",
        "gridAutoFlow": "row",
        "grid-gap": "20px",
        gridTemplateRows: "1fr 1fr"
    },
    contentOnLeftPanel: {
        overflow: "hidden",
        padding: "8px",
        border: "2px solid #E5E5E5",
        borderRadius: "8px",
        display: "grid",
        "gridGap": "20px",
        "grid-template-rows": "50px 1fr",
        // "boxShadow": "0 4px 64px rgb(0 0 0 / 10%)",
    },
    roomList: {
        overflow: "hidden",
        padding: "8px",
        border: "2px solid #E5E5E5",
        borderRadius: "8px",
        display: "grid",
        "gridGap": "20px",
        "grid-template-rows": "50px 50px 1fr",
        // "boxShadow": "0 4px 64px rgb(0 0 0 / 10%)",
    },
    list: {
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
            width: 0
        },
        display: "grid",
        "gridGap": "20px",
        "gridAutoRows": "max-content",
    },
    elOfList: {
        padding: "2px",
        color: "black",
        textDecoration: "none"
    },
    input: {}
    // tabSelected: {
    //     color: theme.palette.secondary.main,
    // }
});
