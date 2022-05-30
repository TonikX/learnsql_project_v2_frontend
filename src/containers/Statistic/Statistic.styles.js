import {createStyles, makeStyles} from "@material-ui/core";

export const useStyles = makeStyles( (theme) => createStyles ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '120%',
        padding: 10
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
}));