import {createStyles, makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => createStyles({
  button: {
    borderRadius: '35px',
    fontSize: '20px',
    fontWeight: 700,
    padding: '0px 25px 5px !important',
    '& span:first-child': {
      textTransform: 'initial',
    }
  },
  secondaryButton: {
    background: 'rgba(229,229,229,0.25)',
    color: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.main,
      color: '#fff'
    }
  },
  outlined: {
    background: 'none',
    border: '2px solid',
    color: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.main,
      color: '#fff'
    }
  },
  delete: {
    background: '#e61919',
    border: '2px solid',
    color: 'white',
    '&:hover': {
      background: 'red',
      color: '#fff'
    }
  }
}))