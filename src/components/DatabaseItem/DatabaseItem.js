import React from 'react'
import {useStyles} from './DatabaseItem.styles'
import {Link} from "react-router-dom";
import {appRouter} from "../../service/router-service";
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

const DatabaseItem = ({database, deleteDatabase}) => {
    const classes = useStyles()

    return (
        <div className={classes.dbItem}>
            <div className={classes.blueCircle}/>
            <div>
                {database.title}
            </div>
            <div className={classes.icons}>
                <Link className={classes.moreInfoButton}
                      to={appRouter.getDatabaseRoute(database.id)}>
                    <RemoveRedEyeIcon/>
                </Link>
                <DeleteOutline
                    style={{cursor: 'pointer'}}
                    onClick={() => deleteDatabase(database.id)}/>
            </div>
        </div>
    )
}

export default DatabaseItem