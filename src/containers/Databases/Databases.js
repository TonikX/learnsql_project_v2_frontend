// noinspection JSValidateTypes

import React from "react";
import {Redirect} from "react-router";
import PropTypes from "prop-types";

import {appRouter} from '../../service/router-service';
import UserService from "../../service/user-service";
import {getPagesCount, getPagesArray} from "../../utils/index"

import connect from './Databases.connect';
import styles from './Databases.styles';

import withStyles from "@material-ui/core/styles/withStyles";
import {Link} from "react-router-dom";
import DatabaseItem from "../../components/DatabaseItem"
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import ModalWindow from "../../components/ModalWindow";
import Button from "../../components/Button";
import AdminNavigation from "../../components/AdminNavigation";

const userService = UserService.factory();

class Databases extends React.PureComponent {
    state = {
        modal: false,
        databases_count: 0,
        searchQuery: '',
        currentPage: 1,
        pagesArray: [],
        currentList: [],
        dbToDelete: null

    };

    componentDidMount = () => {
        this.props.actions.getDatabases()
        console.log(this.state.currentPage)
        this.props.actions.getCurrentDatabases({page: this.state.currentPage})
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

    // getSlice = (list) => {
    //     const indexes = getSliceIndexes(list.length, this.state.limit, this.state.currentPage)
    //     return list.slice(indexes.start, indexes.end)
    // };

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

    deleteDatabase = (id) => {
        this.setState(() => ({
            dbToDelete: id
        }))
        this.showModal()
    };

    confirmDelete = () => {
        this.props.actions.deleteDatabase(this.state.dbToDelete)
        this.closeModal()
        this.setState(() => ({
            dbToDelete: null
        }))
        this.forceUpdate()
    }

    // noinspection JSValidateTypes
    render() {
        const {classes, databases, current_databases, auth} = this.props;

        const isAuth = userService.isAuth() && auth;
        if (!isAuth) return <Redirect to={appRouter.getAllCoursesRoute()}/>;


        this.state.pagesArray = getPagesArray(getPagesCount(databases.length, 10))
        console.log(current_databases)


        return (
            <div className={classes.wrapper}>
                <AdminNavigation/>
                <div className={classes.content}>
                    <SearchBar onKeyPress={event => {
                        if (event.key === 'Enter') {
                            this.setSearchQuery(event.target.value)
                        }
                    }}/>

                    {databases.length !== 0
                        ? databases.map(database =>
                            <DatabaseItem database={database}
                                          key={database.id}
                                          deleteDatabase={this.deleteDatabase}/>
                        )
                        : <div>Баз данных нет</div>
                    }

                    <div className={classes.addButton}>
                        <Link to={appRouter.getCreateDatabaseRoute()}>
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
                                Вы уверены, что хотите удалить базу данных?
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

Databases.propTypes = {
    classes: PropTypes.object,
    databases: PropTypes.array,
    current_databases: PropTypes.array,
    actions: PropTypes.object,
    auth: PropTypes.bool,
};

export default withStyles(styles)(connect(Databases));