import React from 'react'
import {useStyles} from './TopicItem.styles'
import {Link} from "react-router-dom";
import {appRouter} from "../../service/router-service";
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

const TopicItem = ({topic, deleteTopic}) => {
    const classes = useStyles()

    return (
        <div className={classes.item}>
            <div className={classes.blueCircle}/>
            <div>
                {topic.topic_name}
            </div>
            <div className={classes.icons}>
                <Link className={classes.moreInfoButton}
                      to={appRouter.getDatabaseRoute(topic.id)}>
                    <RemoveRedEyeIcon/>
                </Link>
                <DeleteOutline
                    style={{cursor: 'pointer'}}
                    onClick={() => deleteTopic(topic.id)}/>
            </div>
        </div>
    )
}

export default TopicItem