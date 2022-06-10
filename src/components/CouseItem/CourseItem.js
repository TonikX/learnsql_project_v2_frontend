import React from 'react'
import { useStyles } from './CourseItem.styles'
import {Link} from "react-router-dom";
import {appRouter} from "../../service/router-service";
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

const CourseItem = ({course, deleteCourse}) => {
  const classes = useStyles()

  return (
      <div className={classes.dbItem}>
          <div className={classes.blueCircle}/>
              <div>
                  {course.title}
              </div>
              <div className={classes.icons}>
                  <Link className={classes.moreInfoButton}
                        // to={appRouter.getDatabaseRoute(course.id)}\
                      >
                      <RemoveRedEyeIcon/>
                  </Link>
                  <DeleteOutline
                      style={{ cursor: 'pointer' }}
                      onClick={() => deleteCourse(course.id)}/>
              </div>
      </div>
  )
}

export default CourseItem