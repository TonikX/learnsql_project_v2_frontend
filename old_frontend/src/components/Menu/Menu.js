import React from 'react';
import Link from "react-router-dom/Link";
import {withRouter} from "react-router-dom";

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import QuestionIcon from '@material-ui/icons/HelpOutlineOutlined';
import SchoolIcon from '@material-ui/icons/SchoolOutlined';
import FeedbackIcon from '@material-ui/icons/Feedback';

import withStyles from '@material-ui/core/styles/withStyles';

import {appRouter} from "../../service/router-service";

import styles from './Menu.styles';
import MenuItem from "@material-ui/core/MenuItem";

class Menu extends React.PureComponent{
    render() {
        const {classes, isOpen, myCourses} = this.props;
        const {pathname} = this.props.location;

        return(
            <Drawer
                variant="persistent"
                anchor="left"
                open={isOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <List className={classes.menuList}>
                    <Link to={appRouter.getAllCoursesRoute()} className={classes.link}>
                        <MenuItem
                            selected={pathname === '/'}
                            classes={{
                                selected: classes.selectedMenuItem,
                                root: classes.menuItem,
                            }}
                        >
                            <HomeIcon className={classes.icon} />
                            &nbsp;Главная
                        </MenuItem>
                    </Link>
                </List>

                <Divider className={classes.divider}/>

                {myCourses.length > 0 &&
                    <>
                        <List className={classes.menuList}>
                            {myCourses.map(course =>
                                <Link to={appRouter.getCourseStatisticsLink(course.course)} className={classes.link} key={`course-link-${course.id}`}>
                                    <MenuItem
                                        selected={pathname.includes(`/course/${course.course}`)}
                                        classes={{
                                            selected: classes.selectedMenuItem,
                                            root: classes.menuItem,
                                        }}
                                    >
                                        <SchoolIcon className={classes.icon}/>
                                        &nbsp;{course.course_title}
                                    </MenuItem>
                                </Link>
                            )}
                        </List>
                        <Divider className={classes.divider}/>
                    </>
                }

                <List className={classes.menuList}>
                    <Link to={appRouter.getFAQLink()} className={classes.link}>
                        <MenuItem
                            selected={pathname === appRouter.getFAQLink()}
                            classes={{
                                selected: classes.selectedMenuItem,
                                root: classes.menuItem,
                            }}
                        >
                            <QuestionIcon className={classes.icon}/>
                            &nbsp;FAQ
                        </MenuItem>
                    </Link>
                </List>
                <List className={classes.menuList}>
                    <Link to={appRouter.getFeedbackLink()} className={classes.link}>
                        <MenuItem
                            selected={pathname === appRouter.getFeedbackLink()}
                            classes={{
                                selected: classes.selectedMenuItem,
                                root: classes.menuItem,
                            }}
                        >
                            <FeedbackIcon className={classes.icon}/>
                            &nbsp;Обратная связь
                        </MenuItem>
                    </Link>
                </List>
            </Drawer>
        );
    }
}

export default withStyles(styles)(withRouter(Menu));