// noinspection JSValidateTypes

import React from "react";
import {Redirect} from "react-router";
import PropTypes from "prop-types";

import {appRouter} from '../../service/router-service';
import UserService from "../../service/user-service";
import {getPagesCount, getPagesArray} from "../../utils/index"

import connect from './Tasks.connect';
import styles from './Tasks.styles';

import withStyles from "@material-ui/core/styles/withStyles";
import {Link} from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import ModalWindow from "../../components/ModalWindow";
import Button from "../../components/Button";
import AdminNavigation from "../../components/AdminNavigation";
import TaskItem from "../../components/TaskItem";

const userService = UserService.factory();

class Tasks extends React.PureComponent {
    state = {
        modal: false,
        searchQuery: '',
        currentPage: 1,
        pagesArray: [],
        taskToDelete: null
    };

    componentDidMount = () => {
        this.props.actions.getTasks({page: 1})
        this.props.actions.getTasksCount()
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.currentPage !== prevState.currentPage) {
            this.props.actions.getTasks({page: this.state.currentPage})
        }
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

    deleteTask = (id) => {
        console.log('delete', id)
        this.setState(() => ({
            taskToDelete: id
        }))
        this.showModal()
    };

    confirmDelete = () => {
        this.props.actions.deleteTask(this.state.taskToDelete)
        this.closeModal()
        this.setState(() => ({
            taskToDelete: null
        }))

        this.props.actions.getTasksCount()
        this.actions.getTasks({page: this.state.currentPage})
    };

    render() {
        const {classes, tasks, tasks_count, auth} = this.props;
        console.log(tasks)
        console.log(tasks_count)

        const isAuth = userService.isAuth() && auth;
        if (!isAuth) return <Redirect to={appRouter.getAllCoursesRoute()}/>;

        this.state.pagesArray = getPagesArray(getPagesCount(tasks_count, 10))

        return (
            <div className={classes.wrapper}>
                <AdminNavigation/>
                <div className={classes.content}>
                    <SearchBar onKeyPress={event => {
                        if (event.key === 'Enter') {
                            this.setSearchQuery(event.target.value)
                        }
                    }}/>

                    {tasks_count !== 0
                        ? tasks.map(task =>
                            <TaskItem task={task}
                                      key={task.id}
                                      deleteTask={this.deleteTask}/>
                        )
                        : <div>Заданий нет</div>
                    }

                    <div className={classes.addButton}>
                        <Link to={appRouter.getCreateTaskRoute()}>
                            <Button color="primary">
                                ДОБАВИТЬ
                            </Button>
                        </Link>
                    </div>

                    <ModalWindow title="Удаление задания"
                                 visible={this.state.modal}
                                 closeModal={this.closeModal}>
                        <div>
                            <div className={classes.modalContainer}>
                                Вы уверены, что хотите удалить задание?
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
        )
    }
}

Tasks.propTypes = {
    classes: PropTypes.object,
    tasks: PropTypes.array,
    tasks_count: PropTypes.array,
    actions: PropTypes.object,
    auth: PropTypes.bool,
};

export default withStyles(styles)(connect(Tasks));