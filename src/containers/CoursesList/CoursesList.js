// noinspection JSValidateTypes

import React from 'react';

import connect from "../CoursesList/CoursesList.connect";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../CoursesList/CoursesList.styles";
import PropTypes from "prop-types";
import UserService from "../../service/user-service";
import {Redirect} from "react-router";
import {appRouter} from "../../service/router-service";
import {Link} from "react-router-dom";

import SearchBar from "../../components/SearchBar/SearchBar";
import Button from "../../components/Button/Button";
import ModalWindow from "../../components/ModalWindow";
import Pagination from "../../components/Pagination/Pagination";
import CourseItem from "../../components/CouseItem";
import {getPagesArray, getPagesCount} from "../../utils";
import AdminNavigation from "../../components/AdminNavigation";

const userService = UserService.factory();

class CoursesList extends React.PureComponent {
    state = {
        modal: false,
        searchQuery: '',
        currentPage: 1,
        pagesArray: [],
        currentList: [],
        courseToDelete: null

    };

    componentDidMount() {
        this.props.actions.getCourses();
    };

    nextPage = () => {
        if (this.state.currentPage !== this.state.totalPagesNumber) {
            this.setState(() => ({
                currentPage: this.state.currentPage + 1
            }))
        }
    };
    prevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState(() => ({
                currentPage: this.state.currentPage - 1
            }))
        }

    };
    setPage = (p) => {
        this.setState(() => ({
            currentPage: p
        }))
    };

    showModal = () => {
        this.setState(() => ({
            modal: true
        }))
    };
    closeModal = () => {
        this.setState(() => ({
            modal: false
        }))
    };

    setSearchQuery = (value) => {
        this.setState(() => ({
            searchQuery: value
        }))
    };

    deleteCourse = (id) => {
        console.log('delete', id)
        this.setState(() => ({
            courseToDelete: id
        }))
        this.showModal()
    };

    confirmDelete = () => {
        this.props.actions.deleteCourse(this.state.courseToDelete)
        this.closeModal()
        this.setState(() => ({
            courseToDelete: null
        }))
        this.forceUpdate()
    }

    render() {
        const {classes, courses, auth} = this.props;

        const isAuth = userService.isAuth() && auth;
        if (!isAuth) return <Redirect to={appRouter.getAllCoursesRoute()}/>;

        this.state.pagesArray = getPagesArray(getPagesCount(courses.length, 10))

        console.log(this.props.courses)

        return (
            <div>
                <div className={classes.wrapper}>
                    <AdminNavigation/>
                    <div className={classes.content}>
                        <SearchBar onKeyPress={event => {
                            if (event.key === 'Enter') {
                                this.setSearchQuery(event.target.value)
                            }
                        }}/>

                        {courses.length !== 0
                            ? courses.map(course =>
                                <CourseItem course={course}
                                            key={course.id}
                                            deleteCourse={this.deleteCourse}/>
                            )
                            : <div>Курсов нет</div>
                        }

                        <div className={classes.addButton}>
                            <Link to={appRouter.getCreateCourseRoute()}>
                                <Button color="primary">
                                    ДОБАВИТЬ
                                </Button>
                            </Link>
                        </div>

                        <ModalWindow title="Удаление базы данных"
                                     visible={this.state.modal}
                                     closeModal={this.closeModal}>
                            <div>
                                <div className={classes.modalContainer}>
                                    Вы уверены, что хотите удалить курс?
                                </div>
                                <div className={classes.btnContainer}>
                                    <Button type="delete"
                                            onClick={this.confirmDelete}>
                                        Удалить
                                    </Button>
                                    <Button color="primary"
                                            onClick={this.closeModal}>
                                        Отмена
                                    </Button>
                                </div>
                            </div>
                        </ModalWindow>

                        <Pagination pagesArray={this.state.pagesArray}
                                    currentPage={this.state.currentPage}
                                    nextPage={this.nextPage}
                                    prevPage={this.prevPage}
                                    setPage={this.setPage}/>
                    </div>
                </div>
            </div>
        );
    }
}

CoursesList.propTypes = {
    classes: PropTypes.object,
    actions: PropTypes.object,
    courses: PropTypes.array,
    themes: PropTypes.array,
    auth: PropTypes.bool,
};

export default withStyles(styles)(connect(CoursesList));