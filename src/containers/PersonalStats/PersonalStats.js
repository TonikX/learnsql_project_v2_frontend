import React from 'react';
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { withRouter } from 'react-router-dom';
import { Container, Paper, List, ListItem, Divider, Typography } from "@material-ui/core";

import { appRouter } from "../../service/router-service";
import UserService from "../../service/user-service";
import PersonalStatsService from "./service"

import connect from './PersonalStats.connect';

const userService = UserService.factory();

class PersonalStats extends React.PureComponent {
    state = {
        stats: null
    };

    async componentDidMount() {
        const statsService = new PersonalStatsService();
        const stats = (await statsService.getPersonalStats()).data;
        this.setState({ stats });
    }

    renderTasksAttempts() {
        const { stats } = this.state;
        if (stats && stats.task_attempts) {
            return (
                <List>
                    {stats.task_attempts.map((task, index) => (
                        <ListItem key={index}>
                            <Typography>{task.task__theme__title} - Попыток: {task.attempts}</Typography>
                        </ListItem>
                    ))}
                </List>
            );
        }
        return null;
    }

    renderCourseAttempts() {
        const { stats } = this.state;
        if (stats && stats.course_attempts) {
            return (
                <List>
                    {stats.course_attempts.map((course, index) => (
                        <ListItem key={index}>
                            <Typography>{course.user_course__course__title} - Попыток: {course.attempts}</Typography>
                        </ListItem>
                    ))}
                </List>
            );
        }
        return null;
    }

    render() {
        const { auth } = this.props;
        const isAuth = userService.isAuth() && auth;
        const { stats } = this.state;

        if (!isAuth) return <Redirect to={appRouter.getLandingPath()} />;

        return (
            <Container maxWidth="md">
                <Paper elevation={3} style={{ padding: 20, marginTop: 30 }}>
                    <Typography variant="h5">Персональная статистика студента {stats ? stats.username : 'Загрузка...'}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="h6">Темы с наибольшим количеством попыток сдать решение:</Typography>
                    {this.renderTasksAttempts()}
                    <Typography>Стоит обратить на них внимание и повторить материал</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="h6">Самый сложный пройденный курс:</Typography>
                    {this.renderCourseAttempts()}
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography>Всего отправлено решений: {stats ? stats.overall : 'Загрузка...'}</Typography>
                    <Typography>Успешных решений: {stats ? stats.success : 'Загрузка...'}</Typography>
                </Paper>
                <Typography style={{ marginTop: 20 }}>Из-за большой нагрузки, статистика обновляется раз в сутки</Typography>
            </Container>
        );
    }
}

PersonalStats.propTypes = {
    actions: PropTypes.object
};

export default connect(withRouter(PersonalStats));
