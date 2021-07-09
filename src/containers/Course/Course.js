import React from 'react';
import get from 'lodash/get';
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { withRouter } from 'react-router-dom';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import withStyles from '@material-ui/core/styles/withStyles';
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

import StatisticsIcon from "@material-ui/icons/BarChartOutlined";
import MethodicalIcon from "@material-ui/icons/LibraryBooksOutlined";
import TasksIcon from "@material-ui/icons/RateReviewOutlined";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import TasksTab from './containers/Tasks';
import MethodicalMaterialsTab from './containers/Methodical';
import StatisticsTab from './containers/Statistics';
import CourseFinishModal from './containers/CourseFinishModal';
import CourseProfile from './containers/CourseProfile';

import { appRouter } from "../../service/router-service";
import UserService from "../../service/user-service";

import connect from './Course.connect';
import styles from './Course.styles';
import { Backdrop, Button, Modal, Tooltip, Typography } from '@material-ui/core';

const userService = UserService.factory();

class Course extends React.PureComponent {
    state = {
        openModal: !this.props.testedUser,
        passed: localStorage.getItem("passed") || false,
    }

    componentDidMount() {
        const pathname = this.props.location.pathname;

        if (pathname.includes('materials')) {
            this.props.actions.setCurrentCourseTab(1);
        }

        if (pathname.includes('tasks')) {
            this.props.actions.setCurrentCourseTab(2);
        }

        this.props.actions.setCourseId(get(this, 'props.match.params.id', null));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const courseId = get(this, 'props.match.params.id', null);
        const lastCourseId = get(prevProps, 'match.params.id', null);

        if (courseId !== lastCourseId) {
            this.props.actions.setCourseId(courseId);
        }
    }

    changeTabHandler = (event, tabNumber) => {
        const { courseId } = this.props;
        this.props.actions.setCurrentCourseTab(tabNumber);

        switch (tabNumber) {
            default:
            case 0:
                this.props.history.push(appRouter.getCourseStatisticsLink(courseId));
                break;
            case 1:
                this.props.history.push(appRouter.getCourseMaterialsLink(courseId));
                break;
            case 2:
                this.props.history.push(appRouter.getCourseTasksLink(courseId));
                break;
        }
    };

    renderTabMenu = () => {
        const { classes, currentCourseTab, history, match: { params } } = this.props;

        return (
            <div className={classes.tabMenu}>
                <Tabs value={currentCourseTab}
                    onChange={this.changeTabHandler}
                    className={classes.tabs}
                >
                    <Tab label={'Статистика'}
                        className={classes.tab}
                        icon={<StatisticsIcon />}
                        classes={{
                            wrapper: classes.tabRoot,
                            selected: classes.tabSelected,
                        }}
                    />
                    <Tab label={'Методические материалы'}
                        className={classes.tab}
                        icon={<MethodicalIcon />}
                        classes={{
                            wrapper: classes.tabRoot,
                            selected: classes.tabSelected,
                        }}
                    />
                    <Tab label={'Задания'}
                        className={classes.tab}
                        icon={<TasksIcon />}
                        classes={{
                            wrapper: classes.tabRoot,
                            selected: classes.tabSelected,
                        }}
                    />
                    <Tab label={'Профиль курса'}
                        className={classes.tab}
                        icon={<AccountBoxIcon />}
                        classes={{
                            wrapper: classes.tabRoot,
                            selected: classes.tabSelected,
                        }}
                    />
                </Tabs>
                <Tooltip title="Пройдите тестирование для построения индивидуального маршрута обучения">
                    <Button color="secondary" onClick={() => history.push(`/testing/${params.id}`)}>
                        Пройти опрос
                    </Button>
                </Tooltip>
            </div>
        );
    };

    renderTabContent = () => {
        const { currentCourseTab } = this.props;

        switch (currentCourseTab) {
            case 0:
                return <StatisticsTab />;
            case 1:
                return <MethodicalMaterialsTab />;
            case 2:
                return <TasksTab />;
            case 3:
                return <CourseProfile />;
            default:
                return <></>;
        }

    };

    render() {
        const { classes, auth, history, match: { params: { id } } } = this.props;
        const isAuth = userService.isAuth() && auth;

        if (!isAuth) return <Redirect to={appRouter.getSignInRoute()} />;

        return (
            <>
                <Box className={classes.courseTabContent}>
                    <Paper className={classes.paper}>
                        {this.renderTabMenu()}

                        {this.renderTabContent()}
                    </Paper>
                </Box>

                <CourseFinishModal />

                <Modal
                    open={this.state.openModal && !this.state.passed}
                    onClose={() => this.setState({ openModal: false })}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                    className={classes.modal}
                >
                    <Paper className={classes.modalPaper}>
                        <Typography variant="h5">Хотите пройти опрос?</Typography>
                        <Typography variant="caption">Это позволит построить индивидуальный маршрут обучения</Typography>
                        <div>
                            <Button variant="contained" color="primary" onClick={() => history.push('/testing/' + id)}>Пройти</Button>
                            <Button variant="contained" color="secondary" onClick={() => this.setState({ openModal: false })}>Отмена</Button>
                        </div>
                    </Paper>
                </Modal>
            </>
        );
    }
}

Course.propTypes = {
    actions: PropTypes.object
};

export default withStyles(styles)(connect(withRouter(Course)));