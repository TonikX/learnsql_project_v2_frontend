import {createStyles, makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => createStyles({
  searchBar: {
    width: '99%',
    background: 'rgba(229,229,229,0.25)',
    border: '1px',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
    marginBottom: '30px',
    padding: '12px',
    fontSize: '18px'
  }
}))