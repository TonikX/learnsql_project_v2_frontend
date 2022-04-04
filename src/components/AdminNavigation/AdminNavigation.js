import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import styles from "./AdminNavigation.styles"
import classNames from 'classnames'

import Link from "react-router-dom/Link"
import {appRouter} from "../../service/router-service";

class AdminNavigation extends React.PureComponent {

    render() {
        return(
            <div>
                <Link to={appRouter.getDatabasesLink()}>Базы данных</Link>
                <Link to={appRouter.getTasksLink()}>Задания</Link>
                <Link to={appRouter.getThemesLink()}>Темы</Link>
                <Link to={appRouter.getSetsLink()}>Наборы</Link>
                <Link to={appRouter.getCourseListLink()}>Курсы</Link>
                <Link to={appRouter.getMaterialsLink()}>Методические материалы</Link>
            </div>
        )
    }
}

export default withStyles(styles)(AdminNavigation);