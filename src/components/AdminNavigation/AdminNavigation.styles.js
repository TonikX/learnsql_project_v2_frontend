import {createStyles, makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => createStyles({
    adminNavigation: {
        width: '150px',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '30px',
        height: '100%',
        // position: 'fixed',
        // zIndex: '1',
        // top: '0',
        // left: '0',
        // overflowX: 'hidden',
    },
    menuItem: {
        marginTop: '20px',
        textDecoration: 'none',
        fontSize: '20px',
        fontFamily: 'sans-serif',
        color: theme.palette.primary.main
    }
}))