import {createStyles, makeStyles} from "@material-ui/core";

export const useStyles = makeStyles( (theme) => createStyles ({
    tabMenu: {
        borderBottom: '1px solid #f4f4f4',
        marginBottom: '20px',
        display: "grid",
        gridTemplateColumns: '1fr 250px',
        alignItems: 'center'
    },
    courseTabContent: {
        height: '100%',
    },
    paper: {
        height: '100%',
        boxShadow: 'none !important',
    },
    tabs: {
        padding: '0px',
    },
    tab: {
        padding: '20px',
        fontSize: '14px',
        maxWidth: 'initial',
    },
    tabRoot: {
        display: 'flex',
        flexDirection: 'row',
        '& svg': {
            marginRight: 10
        }
    },
    tabSelected: {
        color: theme.palette.secondary.main,
    },
    root: {
        padding: 10,
        minHeight: '100%',
    },
    graph: {
        width: '50vw'
    },
    usersList: {
        marginTop: '20px'
    },
    title: {
        fontWeight: 'bold',
    },
    courseInfo: {
        marginBottom: '40px'
    },
    footer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px'
    },
    tableContainer:{
      // padding: "0 15px"
    },
    table: {
        marginTop: '34px',
        width: "100%",
    },
    tableHeader: {
        height: " 82px",

        background: '#2652A3',
        borderRadius: "10px 10px 0px 0px",
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        alignItems: 'center',
        justifyItems: 'center',
    },
    tableHeaderColumn: {
        color: 'white',
        fontSize: '16px',
    },
    tableRowColumn: {
        color: 'black',
        fontSize: '16px',
    },
    tableBody: {

    },
    tableRow: {
        height: " 82px",
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        borderBottom: "2px solid #E5E5E5",
        alignItems: 'center',
        justifyItems: 'center'
    },

    selector:{
        position: 'relative',
        padding: '15px',
        border: "1px solid #E5E5E5",
        borderRadius: '15px',
        boxSizing: 'border-box',
        height: '50px'
    },
    selectorList: {
        display: 'none',
        position: 'absolute',
        top: 'calc(100% + 10px)',
        boxShadow: '2px 2px 10px 2px rgb(0 0 0 / 25%)',
        width: '100%',
        background: 'white',
        borderRadius: '15px',
        left: 0
    },
    selectorList_show: {
        display: 'grid'
    },
    selectorEl: {
        padding: '15px'
    }

}));
