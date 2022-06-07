import React from "react"
import { useStyles } from "./AdminNavigation.styles"

import Link from "react-router-dom/Link"
import {appRouter} from "../../service/router-service";

export default () => {
    const classes = useStyles()
    return (
        <div className={classes.adminNavigation}>
            <Link className={classes.menuItem} to={appRouter.getDatabasesRoute()}>БАЗЫ ДАННЫХ</Link>
            <Link className={classes.menuItem} to={appRouter.getTasksRoute()}>ЗАДАНИЯ</Link>
            <Link className={classes.menuItem} to={appRouter.getThemesRoute()}>ТЕМЫ</Link>
            <Link className={classes.menuItem} to={appRouter.getCoursesRoute()}>КУРСЫ</Link>
            <Link className={classes.menuItem} to={appRouter.getTopicsRoute()}>ГЛАВЫ</Link>
            <Link className={classes.menuItem} to={appRouter.getSectionsRoute()}>РАЗДЕЛЫ</Link>
        </div>
    )
}