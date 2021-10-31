import {createStyles, makeStyles} from "@material-ui/core";
import { InsertInvitationOutlined } from "@material-ui/icons";

export const useStyles = makeStyles((theme) => createStyles({
  wrap: {
    maxWidth: '1195px',
    margin: '0 auto',
    '@media (max-width: 1195px)': {
      padding: '0px 20px',
    }
  },
  mainBackground: {
    '@media (max-width: 768px)': {
      backgroundImage: "initial !important",
    }
  },
  title: {
    fontWeight: 700,
    fontSize: '64px',
    color: theme.palette.primary.main,
    lineHeight: '64px',
    letterSpacing: '2px',
    '@media (max-width: 1195px)': {
      fontSize: '35px',
    },
    '@media (max-width: 768px)': {
      textAlign: 'center',
    },
    '@media (max-width: 768px)': {
      fontSize: '30px',
      lineHeight: '50px',
    }
  },
  description: {
    fontSize: '25px',
    lineHeight: '34px',
    color: '#525252',
    marginTop: '28px',
    marginBottom: '38px',
    letterSpacing: '2px',
    '@media (max-width: 768px)': {
      textAlign: 'center',
    }
  },
  mainScreen: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '@media (max-width: 768px)': {
      marginTop: '30px',
      textAlign: 'center',
    }
  },
  emptyForm: {

  },
  form: {
    height: '490px',
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      textAlign: 'center',
      position: 'fixed',
      height: '100vh',
      width: '100vw',
      top: 0,
      left: 0,
      marginTop: 0,
      zIndex: 10,
    },
  },
  closeButton: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    color: theme.palette.primary.main,
    zIndex: 100,
    '@media (min-width: 768px)': {
      display: 'none'
    },
  },
  header: {
    padding: '20px 0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& img': {
      height: '50px',
      marginLeft: '-7px'
    },
    '& a': {
      fontWeight: 'bold',
      textDecoration: 'none',
      color: theme.palette.primary.main,
      fontSize: '20px',
      cursor: 'pointer',
    }
  },
  questions: {

  },
  question: {
    display: 'flex',
    color: '#525252',
    marginBottom: '120px',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      textAlign: 'center',
      '&:nth-child(1)': {
        flexDirection: 'column-reverse',
      }
    }
  },
  questionTitle: {
    fontSize: '30px',
    fontWeight: 600,
  },
  questionText: {
    fontSize: '25px',
    letterSpacing: '0.035em',
    marginTop: '10px',
  },
  questionBorder: {
    width: '140px',
    height: '8px',
    borderRadius: '10px',
    '@media (max-width: 768px)': {
      margin: '0 auto',
    }
  },
  questionImageRight: {
    marginLeft: '150px',
    '@media (max-width: 768px)': {
      marginLeft: 'initial',
      marginBottom: '30px',
    },
    '@media (max-width: 425px)': {
      width: '120px',
    },
  },
  questionImageLeft: {
    marginLeft: '76px',
    '@media (max-width: 768px)': {
      marginLeft: 'initial',
      marginBottom: '30px',
    },
    '@media (max-width: 425px)': {
      width: '120px',
    },
  },
  learn: {
    marginBottom: '50px',
  },
  learnTitle: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: '50px',
    marginBottom: '60px',
    '@media (max-width: 768px)': {
      textAlign: 'center',
    },
    '@media (max-width: 425px)': {
      fontSize: '39px',
    },
  },
  learnItems: {
    display: 'flex',
    justifyContent: 'space-between',
    '@media (max-width: 768px)': {
      overflow: 'scroll',
    },
    '@media (max-width: 425px)': {
      flexWrap: 'wrap',
    },
  },

  learnItem: {
    width: '32%',
    color: '#525252',
    border: '2px solid #E5E5E5',
    borderRadius: '8px',
    padding: '28px',
    boxSizing: 'border-box',
    position: 'relative',
    '@media (max-width: 768px)': {
      width: '100%',
      minWidth: '380px',
      marginRight: '20px',
    },
    '@media (max-width: 425px)': {
      width: '100%',
      minWidth: '380px',
      marginRight: '20px',
      marginBottom: '15px',
    },
    '@media (max-width: 380px)': {
      minWidth: 'initial',
      marginRight: 'initial',
    }
  },
  square: {
    width: '30px',
    height: '30px',
    background: theme.palette.primary.main,
    position: 'absolute',
    '@media (max-width: 768px)': {
      display: 'none',
    }
  },
  learnItemTitle: {
    fontSize: '25px',
    fontWeight: 600,
  },
  learnItemText: {
    fontSize: '20px',
  },
  offer: {
    background: theme.palette.primary.main,
    padding: '50px 0px 80px',
  },
  offerTitle: {
    color: '#fff',
    fontWeight: 600,
    fontSize: '50px',
    marginBottom: '60px',
    '@media (max-width: 768px)': {
      textAlign: 'center',
    },
    '@media (max-width: 425px)': {
      fontSize: '39px',
    },
  },
  offerList: {
    display: 'flex',
    '@media (max-width: 768px)': {
      flexWrap: 'wrap',
    }
  },
  offerItem: {
    width: '24%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& img': {
      width: '100px',
    },
    '@media (max-width: 768px)': {
      width: '50%',
      marginBottom: '30px',
    },
    '@media (max-width: 425px)': {
      width: '100%',
    }
  },
  offerItemText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: '20px',
    marginTop: '10px'
  },
  courses: {
    marginTop: '50px',
  },
  coursesTitle: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: '50px',
    marginBottom: '60px',
    '@media (max-width: 768px)': {
      textAlign: 'center',
    },
    '@media (max-width: 425px)': {
      fontSize: '39px',
    },
  },
  coursesList: {
    display: 'flex',
    justifyContent: 'space-between',
    '@media (max-width: 425px)': {
      flexWrap: 'wrap',
    },
    
  },
  coursesListItem: {
    width: '48%',
    color: '#525252',
    border: '2px solid #E5E5E5',
    borderRadius: '8px',
    padding: '28px',
    boxSizing: 'border-box',
    '@media (max-width: 425px)': {
      width: '100%',
      marginBottom: '15px',
    },
    
  },
  coursesListItemTitle: {
    fontSize: '25px',
    fontWeight: 600,
  },
  coursesListItemDescription: {
    fontSize: '20px',
    marginTop: '10px',
  },
  footer: {
    marginTop: '100px',
    background: '#5F5F5F',
    padding: '25px 0px',
  },
  footerLink: {
    color: '#fff'
  },
  getAccessButton: {
    fontSize: '25px !important'
  }
}))