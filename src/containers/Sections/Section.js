// noinspection JSValidateTypes

import React from "react";
import {Redirect} from "react-router";
import PropTypes from "prop-types";

import {appRouter} from '../../service/router-service';
import UserService from "../../service/user-service";
import {getPagesCount, getPagesArray} from "../../utils/index"

import connect from './Section.connect';
import styles from './Section.style';

import withStyles from "@material-ui/core/styles/withStyles";
import {Link} from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import ModalWindow from "../../components/ModalWindow";
import Button from "../../components/Button";
import AdminNavigation from "../../components/AdminNavigation";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import * as Enum from "../Sections/enum";
import get from "lodash/get";
import {InputLabel, MenuItem, Select, TextField} from "@material-ui/core";

const userService = UserService.factory();

class Sections extends React.PureComponent {
    state = {
        modalDelete: false,
        modalCreate: false,
        databases_count: 0,
        searchQuery: '',
        currentPage: 1,
        pagesArray: [],
        currentList: [],
        totalPagesNumber: 0,
        sectionToDelete: null

    };

    componentDidMount = () => {
        this.props.actions.getSections()
        this.props.actions.getCourses()
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

    setSearchQuery = (value) => {
        this.setState(() => ({
            searchQuery: value
        }))
    };

    setNumber = (e) => {
        console.log(e.target.value)
        this.props.actions.sectionChangeField({destination: Enum.NUMBER_FIELD, value: get(e, 'target.value', '')})
    };

    setName = (e) => {
        console.log(e.target.value)
        this.props.actions.sectionChangeField({destination: Enum.SECTION_NAME_FIELD, value: get(e, 'target.value', '')})
    };

    setCourse = (e) => {
        console.log(e.target.value)
        this.props.actions.topicChangeField({destination: Enum.COURSE_FIELD, value: parseInt(get(e, 'target.value', ''))})
    };

    deleteSection = (id) => {
        this.setState(() => ({
            sectionToDelete: id
        }))
        this.showModalDelete()
    };

    confirmDelete = () => {
        this.props.actions.deleteSection(this.state.sectionToDelete)
        this.closeModalDelete()
        this.setState(() => ({
            sectionToDelete: null
        }))
    }

    createTheme = () => {
        this.props.actions.createSection()
        this.closeModalCreate()
    };

    // noinspection JSValidateTypes
    render() {
        const {classes, sections, courses, auth} = this.props;
        console.log(courses)

        const isAuth = userService.isAuth() && auth;
        if (!isAuth) return <Redirect to={appRouter.getAllCoursesRoute()}/>;

        this.state.totalPagesNumber = getPagesCount(sections.length, 10)
        this.state.pagesArray = getPagesArray(this.state.totalPagesNumber)

        return (
            <div className={classes.wrapper}>
                <AdminNavigation/>
                <div className={classes.content}>
                    <SearchBar onKeyPress={event => {
                        if (event.key === 'Enter') {
                            this.setSearchQuery(event.target.value)
                        }
                    }}/>

                    {sections.length !== 0
                        ? sections.map(section =>
                            <div className={classes.sectionItem}>
                                <div className={classes.blueCircle}/>
                                <div className={classes.itemContent}>
                                    <div>{section.section_name}</div>
                                    <ul>
                                        {section.topics_of_this_section.map(topics =>
                                            <li style={{fontSize: '16px'}}>{topics.topic_name}</li>
                                        )}
                                    </ul>
                                </div>
                                <div className={classes.icons}>
                                    <Link className={classes.moreInfoButton}>
                                        <RemoveRedEyeIcon/>
                                    </Link>
                                    <DeleteOutline
                                        style={{cursor: 'pointer'}}
                                        onClick={this.deleteSection}/>
                                </div>
                            </div>
                        )
                        : <div>Секций нет</div>
                    }

                    <div className={classes.addButton}>
                        <Button color="primary" onClick={this.showModalCreate}>
                            ДОБАВИТЬ
                        </Button>
                    </div>

                    <ModalWindow title="Создание раздела"
                                 visible={this.state.modalCreate}
                                 closeModal={this.closeModalCreate}>
                        <div>
                            <form className={classes.formContainer}>
                                <TextField id="outlined-basic" label="Название" variant="outlined" onChange={this.setName}
                                           className={classes.marginBottom}/>

                                <TextField id="outlined-basic" label="Номер" variant="outlined" onChange={this.setNumber}
                                           className={classes.marginBottom}/>

                                <div className={classes.selectContainer}>
                                    <InputLabel id="demo-simple-select-autowidth-label"
                                                className={classes.selectTitle}>
                                        Курс
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        onChange={this.setDatabaseField}
                                        autoWidth
                                        label="База данных"
                                        value={1}
                                        className={classes.selectField}
                                    >
                                        {
                                            courses.map(course =>
                                                <MenuItem value={course.id} key={course.id}>
                                                    {course.title}
                                                </MenuItem>
                                            )
                                        }
                                    </Select>
                                </div>
                            </form>

                            <div className={classes.btnContainer}>
                                <Button type="outlined"
                                        onClick={this.createSection}>
                                    Создать
                                </Button>
                                <Button className={classes.closeButton}
                                        onClick={this.closeModalCreate}>
                                    Закрыть
                                </Button>
                            </div>
                        </div>
                    </ModalWindow>

                    <ModalWindow title="Удаление секции"
                                 visible={this.state.modal}
                                 closeModal={this.closeModalDelete}>
                        <div>
                            <div className={classes.modalContainer}>
                                Вы уверены, что хотите удалить раздел?
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

Sections.propTypes = {
    classes: PropTypes.object,
    sections: PropTypes.array,
    courses: PropTypes.array,
    actions: PropTypes.object,
    auth: PropTypes.bool,
};

export default withStyles(styles)(connect(Sections));