import React from 'react';
import PropTypes from "prop-types";
import get from 'lodash/get';
import {Redirect} from "react-router";
import {Link} from "react-router-dom";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// import DateRangeIcon from '@material-ui/icons/DateRange';

import {appRouter} from "../../service/router-service";
import UserService from "../../service/user-service";

import connect from './Courses.connect';
import styles from './Courses.styles';
import ReactStars from "react-rating-stars-component/dist/react-stars";
// import moment from "moment";

const userService = UserService.factory();

const tasksTypes = {
    1: 'статическая выдача заданий',
    2: 'индивидуальный маршрут между заданиями',
    3: 'задания подбираются случайным образом'
}

class Courses extends React.PureComponent{
    componentDidMount() {
        this.props.actions.getCourses();
        this.props.actions.getMyCourses();
    }

    joinCourse = (courseId) => () => {
        this.props.actions.joinCourse(courseId);
    };

    render() {
        const {classes, auth, courses, myCourses, isMy} = this.props;
        const isAuth = userService.isAuth() && auth;

        if (!isAuth) return <Redirect to={appRouter.getLandingPath()} />;

        return(
            <div className={classes.root}>
                {courses.map(course => {
                    const isMyCourse = myCourses.find(myCourse => myCourse.course === course.id);

                    if (isMy && !isMyCourse) return <></>
                    return (
                        <Card className={classes.card} key={`course-${course.id}`}>
                            <CardContent key={course.id}>
                                <Typography className={classes.title} key={course.id}>
                                    {get(course, 'title', '')}
                                </Typography>
                                <Typography className={classes.ratingSubtitle}>
                                    <b className={classes.subTitle}>Сложность курса:</b> <ReactStars edit={false} value={course.difficulty} size={30} />
                                </Typography>
                                <Typography>
                                    <b className={classes.subTitle}>Выбор заданий в курсе:</b> {tasksTypes[course.type]}
                                </Typography>
                                <Typography>
                                    <b className={classes.subTitle}>Статистика по курсу:</b>
                                    всего решений - {course.course_stats_brief.overall}, успешных решений - {course.course_stats_brief.successful}
                                </Typography>
                                <Typography className={classes.themesSubtitle}>
                                    Темы курса:
                                </Typography>
                                <div className={classes.themeGrid}>
                                    {course.themes.map(theme => (
                                      <Typography> {theme} </Typography>
                                    ))}
                                </div>
                            </CardContent>
                            <CardActions className={classes.actions} key={course.id}>
                                <Typography className={classes.dates}>
                                    {/*<div className={classes.date}>*/}
                                    {/*    <DateRangeIcon color="primary"/> Старт:&nbsp;*/}
                                    {/*    <span className={classes.startDate}>{isMyCourse && moment(isMyCourse.date_start).format('DD.MM.YYYY')}</span>*/}
                                    {/*</div>*/}
                                    {/*<div className={classes.date}>*/}
                                    {/*    <DateRangeIcon color="primary"/> Финиш:&nbsp;*/}
                                    {/*    <span className={classes.startDate}>{isMyCourse && moment(isMyCourse.date_end).format('DD.MM.YYYY')}</span>*/}
                                    {/*</div>*/}
                                </Typography>
                                {isMyCourse ?
                                    <Link
                                        to={appRouter.getCourseStatisticsLink(course.id)}
                                        className={classes.link}>
                                        <Button color="primary"
                                                size="small"
                                                className={classes.button}
                                                variant="contained"
                                        >
                                            На страницу курса
                                            <KeyboardArrowRightIcon />
                                        </Button>
                                    </Link>
                                    :
                                    <Button color="primary"
                                            variant="contained"
                                            onClick={this.joinCourse(course.id)}
                                            className={classes.button}
                                            size="small"
                                    >
                                        Присоединиться
                                    </Button>
                                }
                            </CardActions>
                        </Card>
                    );
                })}
            </div>
        );
    }
}

Courses.propTypes = {
    classes: PropTypes.object,
    actions: PropTypes.object,
    courses: PropTypes.array,
    myCourses: PropTypes.array,
    auth: PropTypes.bool,
};

export default withStyles(styles)(connect(Courses));