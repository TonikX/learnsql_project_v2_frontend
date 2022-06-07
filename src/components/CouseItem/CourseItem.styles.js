import {createStyles, makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => createStyles({
  dbItem: {
    display: 'flex',
    border: '1px solid #979797',
    borderRadius: '10px',
    marginBottom: '30px',
    fontFamily: 'sans-serif',
    padding: '25px 20px',
    alignItems: 'center',
    fontSize: '18px'
  },
  blueCircle: {
    minWidth: '13px',
    height: '13px',
    background: '#1D51A3',
    borderRadius:'50%',
    marginRight: '15px'
  },
  info: {
    marginLeft: '40px'
  },
  moreInfoButton: {
    color: '#666',
    fontSize: '18px',
    cursor: 'pointer',
    marginRight: '15px'
  },
  icons: {
    marginRight: 0,
    marginLeft: 'auto'
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
}))