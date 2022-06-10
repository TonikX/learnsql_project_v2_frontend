import {createStyles, makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => createStyles({
    modal: {
        position: 'fixed',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        display: 'none',
        background: 'rgba(0, 0, 0, 0.5)'
    },

    title: {
        textAlign: 'center',
        color: theme.palette.primary.main,
        marginBottom: '20px'
    },
    active: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        padding: '10px 30px 30px 30px',
        background: '#fff',
        borderRadius: '20px',
        minWidth: '300px',
        fontSize: '18px',
        fontFamily: 'sans-serif',
    },
    cross: {
        marginLeft: '-20px',
        display: 'flex',
        justifyContent: 'end',
        cursor: 'pointer'
    }
}))