import {createStyles, makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => createStyles({
  input: {
    marginBottom: '11px',
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: `2px solid ${theme.palette.primary.main} !important`
    }
  },
  button: {
    marginTop: '30px'
  },
  form: {
    boxSizing: 'border-box',
    width: '400px',
    flex: 'none',
    background: 'rgba(196,196,196,0.1)',
    padding: '35px',
    display: 'flex',
    flexDirection: 'column',
    height: 'fit-content',
    backdropFilter: 'blur(10px)',
    '@media (max-width: 768px)': {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgb(247 247 247)',
      '& div': {
        width: '100%',
      }
    }
  },
  link: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.dark,
    }
  },
  googleButton: {
    marginTop: '20px',
    color: 'rgb(215 73 55)',
    fontSize: '14px',
    '&:hover': {
      background: 'rgb(215 73 55) !important',
    },
    '& span': {
      position: 'relative',
      top: '2px',
    }
  },
}))