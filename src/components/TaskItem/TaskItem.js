import React from 'react'
import {useStyles} from './TaskItem.styles'
import {Link} from "react-router-dom";
import {appRouter} from "../../service/router-service";
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

const TaskItem = ({task, deleteTask}) => {
    const classes = useStyles()

    return (
        <div className={classes.dbItem}>
            <div className={classes.blueCircle}/>
            <div className={classes.content}>
                <div>{task.title}</div>
                <div style={{fontSize: '16px'}}>{task.task_text}</div>
            </div>
            <div className={classes.icons}>
                <Link className={classes.moreInfoButton}>
                    <RemoveRedEyeIcon/>
                </Link>
                <DeleteOutline
                    style={{cursor: 'pointer'}}
                    onClick={() => deleteTask(task.id)}/>
            </div>
        </div>
    )
}

export default TaskItem