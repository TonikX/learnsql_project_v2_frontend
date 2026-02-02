import {createStyles, makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => createStyles({
  input: {
    marginBottom: '11px',
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: `2px solid ${theme.palette.primary.main} !important`
    }
  },
  selectField: {
    marginBottom: '11px',
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
    backdropFilter: 'blur(10px)',
    color: '#525252',
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
  student: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '-12px'
  },
  back: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      width: '20px',
    }
  },
  successDescription: {
    fontSize: '20px',
    textAlign: 'center',
  },
  successTitle: {
    fontSize: '30px',
    fontWeight: 600,
    textAlign: 'center',
  },
  successIcon: {
    fontSize: '50px',
    color: theme.palette.primary.main,
    margin: '0 auto'
  }
}))