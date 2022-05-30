import {createStyles, makeStyles} from "@material-ui/core";

export const useStyles = makeStyles( (theme) => createStyles ({
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
}));