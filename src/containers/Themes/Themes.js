// noinspection JSValidateTypes

import UserService from "../../service/user-service";
import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../Themes/Themes.styles";
import connect from "../Themes/Themes.connect";
import {Redirect} from "react-router";
import {appRouter} from "../../service/router-service";
import {getPagesArray, getPagesCount, getSliceIndexes} from "../../utils";
import SearchBar from "../../components/SearchBar/SearchBar";
import ModalWindow from "../../components/ModalWindow";
import ThemeItem from "../../components/ThemeItem";
import * as Enum from "../Themes/enum";
import get from "lodash/get";
import Button from "../../components/Button";
import Pagination from "../../components/Pagination/Pagination";
import AdminNavigation from "../../components/AdminNavigation/AdminNavigation";
import {TextField} from "@material-ui/core";

const userService = UserService.factory();

class Themes extends React.PureComponent {
    state = {
        modalCreate: false,
        modalDelete: false,
        modalUpdate: false,
        searchQuery: '',
        pagesArray: [],
        currentPage: 1,
        themeToDelete: null,
        themeToUpdate: Object
    };

    componentDidMount = () => {
        this.props.actions.getThemes({page: 1})
        this.props.actions.getThemesCount()
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.currentPage !== prevState.currentPage) {
            this.props.actions.getThemes({page: this.state.currentPage})
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
        console.log("set page", p)
    };

    getSlice = (list) => {
        const indexes = getSliceIndexes(list.length, this.state.limit, this.state.currentPage)
        return list.slice(indexes.start, indexes.end)
    };

    showModalCreate = () => {
        this.setState(() => ({
            modalCreate: true
        }))
    };

    closeModalCreate = () => {
        this.setState(() => ({
            modalCreate: false
        }))
    };

    showModalDelete = () => {
        this.setState(() => ({
            modalDelete: true
        }))
    };

    closeModalDelete = () => {
        this.setState(() => ({
            modalDelete: false
        }))
    };

    showModalUpdate = (id) => {
        const theme = this.props.themes.find(theme => theme.id === id)
        console.log(theme)
        this.setState(() => ({
            modalUpdate: true,
            themeToUpdate: theme
        }))
    };

    closeModalUpdate = () => {
        this.setState(() => ({
            modalUpdate: false
        }))
    };

    setSearchQuery = (value) => {
        this.setState(() => ({
            searchQuery: value
        }))
    };

    deleteTheme = (id) => {
        console.log('delete', id)
        this.setState(() => ({
            themeToDelete: id
        }))
        this.showModalDelete()
    };

    confirmDelete = () => {
        this.props.actions.deleteTheme(this.state.themeToDelete)
        this.setState(() => ({
            themeToDelete: null
        }))
        this.closeModalDelete()
        this.props.actions.getThemesCount()
        this.props.actions.getThemes({page: this.state.currentPage})
    }

    setTitle = (e) => {
        console.log(e.target.value)
        this.props.actions.themeChangeField({destination: Enum.TITLE_FIELD, value: get(e, 'target.value', '')})
    };

    setPosition = (e) => {
        this.props.actions.themeChangeField({destination: Enum.POSITION_FIELD, value: get(e, 'target.value', '')})
    };

    createTheme = () => {
        this.props.actions.createTheme()
        this.closeModalCreate()
    };

    updateTheme = () => {
        this.props.actions.updateTheme(this.state.themeToUpdate.id)
        this.setState(() => ({
            themeToUpdate: null
        }))
        this.closeModalUpdate()
    };

    render() {
        const {classes, auth, themes, themes_count} = this.props;
        const {modalCreate, modalDelete, modalUpdate, searchQuery} = this.state
        let {currentPage} = this.state

        const isAuth = userService.isAuth() && auth;
        if (!isAuth) return <Redirect to={appRouter.getAllCoursesRoute()}/>;

        console.log(themes)
        console.log(themes_count)

        this.state.pagesArray = getPagesArray(getPagesCount(themes_count, 10))

        return (
            <div className={classes.wrapper}>
                <AdminNavigation/>
                <div className={classes.content}>
                    <SearchBar onKeyPress={event => {
                        if (event.key === 'Enter') {
                            this.setSearchQuery(event.target.value)
                        }
                    }}/>

                    {themes_count !== 0
                        ? themes.map(theme =>
                            <ThemeItem theme={theme}
                                       key={theme.id}
                                       deleteTheme={this.deleteTheme}
                                       updateTheme={this.showModalUpdate}/>
                        )
                        : <div>Тем нет</div>
                    }

                    <div className={classes.addButton}>
                        <Button type="outlined"
                                onClick={this.showModalCreate}>
                            ДОБАВИТЬ
                        </Button>
                    </div>

                    <ModalWindow title="Создание темы"
                                 visible={modalCreate}
                                 closeModal={this.closeModalCreate}>
                        <div>
                            <form className={classes.formContainer}>
                                <TextField id="outlined-basic" label="Название" variant="outlined" onChange={this.setTitle}
                                           className={classes.marginBottom}/>
                                <TextField id="outlined-basic" label="Позиция" variant="outlined" onChange={this.setPosition}
                                           className={classes.marginBottom}/>
                            </form>

                            <div className={classes.btnContainer}>
                                <Button type="outlined"
                                        onClick={this.createTheme}>
                                    Создать
                                </Button>
                                <Button className={classes.closeButton}
                                        onClick={this.closeModalCreate}>
                                    Закрыть
                                </Button>
                            </div>
                        </div>
                    </ModalWindow>

                    <ModalWindow title="Удаление темы"
                                 visible={modalDelete}
                                 closeModal={this.closeModalDelete}>
                        <div>
                            <div className={classes.modalContainer}>
                                Вы уверены, что хотите удалить тему?
                            </div>
                            <div className={classes.btnContainer}>
                                <Button type="delete"
                                        onClick={this.confirmDelete}>
                                    Удалить
                                </Button>
                                <Button color="primary"
                                        onClick={this.closeModalDelete}>
                                    Отмена
                                </Button>
                            </div>
                        </div>
                    </ModalWindow>

                    <ModalWindow title="Редактирование темы"
                                 visible={modalUpdate}
                                 closeModal={this.closeModalUpdate}>
                        <div>
                            <form className={classes.formContainer}>
                                <div className={classes.fieldContainer}>
                                    <div>
                                        Название
                                    </div>
                                    <input className={classes.inputContainer}
                                           type={"text"}
                                           onChange={this.setTitle}
                                           value={this.state.themeToUpdate.title || ''}/>
                                </div>

                                <div className={classes.fieldContainer}>
                                    <div>
                                        Позиция
                                    </div>
                                    <input className={classes.inputContainer}
                                           type={"number"}
                                           onChange={this.setPosition}
                                           value={this.state.themeToUpdate.position || ''}/>
                                </div>
                            </form>
                            <div className={classes.btnContainer}>
                                <Button type="outlined"
                                        onClick={this.updateTheme}>
                                    Сохранить
                                </Button>
                                <Button className={classes.closeButton}
                                        onClick={this.closeModalUpdate}>
                                    Закрыть
                                </Button>
                            </div>
                        </div>
                    </ModalWindow>

                    <Pagination pagesArray={this.state.pagesArray}
                                currentPage={currentPage}
                                nextPage={this.nextPage}
                                prevPage={this.prevPage}
                                setPage={this.setPage}/>
                </div>
            </div>
        );
    }
}

Themes.propTypes = {
    classes: PropTypes.object,
    actions: PropTypes.object,
    themes: PropTypes.array,
    themes_count: PropTypes.number,
    auth: PropTypes.bool,
};

export default withStyles(styles)(connect(Themes));