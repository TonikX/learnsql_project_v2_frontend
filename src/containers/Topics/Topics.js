// noinspection JSValidateTypes

import React from "react";
import {Redirect} from "react-router";
import PropTypes from "prop-types";

import {appRouter} from '../../service/router-service';
import UserService from "../../service/user-service";
import {getPagesCount, getPagesArray} from "../../utils/index"

import connect from './Topics.connect';
import styles from './Topics.styles';

import withStyles from "@material-ui/core/styles/withStyles";
import {Link} from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import ModalWindow from "../../components/ModalWindow";
import Button from "../../components/Button";
import AdminNavigation from "../../components/AdminNavigation";
import TopicItem from "../../components/TopicItem";

const userService = UserService.factory();

class Topics extends React.PureComponent {
    state = {
        modal: false,
        databases_count: 0,
        searchQuery: '',
        currentPage: 1,
        pagesArray: [],
        currentList: [],
        topicToDelete: null

    };

    componentDidMount = () => {
        this.props.actions.getTopics()
        this.props.actions.getCurrentTopics({page: this.state.currentPage})
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

    deleteTopic = (id) => {
        this.setState(() => ({
            topicToDelete: id
        }))
        this.showModal()
    };

    confirmDelete = () => {
        this.props.actions.deleteTopic(this.state.topicToDelete)
        this.setState(() => ({
            topicToDelete: null
        }))
        this.closeModal()
        this.forceUpdate()
    }

    // noinspection JSValidateTypes
    render() {
        const {classes, topics, current_topics, auth} = this.props;
        console.log(topics)

        const isAuth = userService.isAuth() && auth;
        if (!isAuth) return <Redirect to={appRouter.getAllCoursesRoute()}/>;

        this.state.pagesArray = getPagesArray(getPagesCount(topics.length, 10))

        return (
            <div className={classes.wrapper}>
                <AdminNavigation/>
                <div className={classes.content}>
                    <SearchBar onKeyPress={event => {
                        if (event.key === 'Enter') {
                            this.setSearchQuery(event.target.value)
                        }
                    }}/>

                    {current_topics.length !== 0
                        ? current_topics.map(topic =>
                            <TopicItem topic={topic}
                                       key={topic.id}
                                       deleteTopic={this.deleteTopic}/>
                        )
                        : <div>Разделов нет</div>
                    }

                    <div className={classes.addButton}>
                        <Link to={appRouter.getCreateTopicRoute()}>
                            <Button color="primary">
                                ДОБАВИТЬ
                            </Button>
                        </Link>
                    </div>

                    <ModalWindow title="Удаление раздела"
                                 visible={this.state.modal}
                                 closeModal={this.closeModal}>
                        <div>
                            <div className={classes.modalContainer}>
                                Вы уверены, что хотите удалить главу?
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
        );
    }
}

Topics.propTypes = {
    classes: PropTypes.object,
    topics: PropTypes.array,
    current_topics: PropTypes.array,
    actions: PropTypes.object,
    auth: PropTypes.bool,
};

export default withStyles(styles)(connect(Topics));