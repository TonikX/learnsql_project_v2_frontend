import {createStyles, makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => createStyles({
    pages: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
        marginBottom: '60px',
        paddingBottom: '50px'
    },
    page: {
        fontFamily: 'sans-serif',
        fontSize: '18px',
        color: theme.palette.primary.main,
        padding: '5px',
        '&:hover': {
            color: '#00008b',
            textDecoration: 'underline'
        },
        cursor: 'pointer'
    },
    activePage: {
        fontWeight: 'bold'
    }
}))