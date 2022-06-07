// noinspection JSValidateTypes

import React from "react";
import {Redirect} from "react-router";
import PropTypes from "prop-types";

import {appRouter} from '../../service/router-service';
import UserService from "../../service/user-service";
import connect from './CreateTopic.connect';
import styles from './CreateTopic.style';

import withStyles from "@material-ui/core/styles/withStyles";
import AdminNavigation from "../../components/AdminNavigation";
import Button from "../../components/Button/Button";
import * as Enum from "../CreateTopic/enum";
import get from "lodash/get";
import CKEditor from "react-ckeditor-component/lib";
import {InputLabel, MenuItem, Select, TextField, Typography, Link} from "@material-ui/core";

const userService = UserService.factory();

class CreateTopic extends React.PureComponent {
    state = {
        modal: false,
        databases_count: 0,
        searchQuery: '',
        currentPage: 1,
        pagesArray: [],
        currentList: [],
        dbToDelete: null

    };

    componentDidMount() {
        this.props.actions.getThemes()
        this.props.actions.getSections()
    }

    setSectionField = (e) => {
        this.props.actions.topicChangeField({destination: Enum.SECTION_FIELD, value: parseInt(get(e, 'target.value', ''))})
    };
    setNumber = (e) => {
        this.props.actions.topicChangeField({destination: Enum.NUMBER_FIELD, value: get(e, 'target.value', '')})
    };
    setName = (e) => {
        this.props.actions.topicChangeField({destination: Enum.NAME_FIELD, value: get(e, 'target.value', '')})
    };
    setContent = (e) => {
        this.props.actions.topicChangeField({destination: Enum.CONTENT_FIELD, value: get(e, 'target.value', '')})
    };
    setThemesField = (e) => {
        this.props.actions.courseChangeField({destination: Enum.THEMES_FIELD, value: [...e.target.selectedOptions].map(o => parseInt(o.value))})
    };

    createTopic = () => {
        this.props.actions.createTopic()
    };

    // noinspection JSValidateTypes
    render() {
        const {classes, sections, themes, auth} = this.props;

        const isAuth = userService.isAuth() && auth;
        if (!isAuth) return <Redirect to={appRouter.getAllCoursesRoute()}/>;

        console.log(sections, themes)

        return (
            <div className={classes.root}>
                <Typography className={classes.title} variant="h6">Создание главы методических материалов</Typography>
                <Link className={classes.backButton}
                      to={appRouter.getTopicsRoute()}>
                    Назад
                </Link>
                <form className={classes.formContainer}>

                    <div className={classes.selectContainer}>
                        <InputLabel id="demo-simple-select-autowidth-label"
                                    className={classes.selectTitle}>
                            Секция
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            onChange={this.setSectionField}
                            autoWidth
                            label="Секция"
                            value={1}
                        >
                            {
                                sections.map(section =>
                                    <MenuItem value={section.id} key={section.id}>
                                        {section.section_name}
                                    </MenuItem>
                                )
                            }
                        </Select>
                    </div>

                    <TextField id="outlined-basic" label="Номер главы" variant="outlined" onChange={this.setNumber}
                               className={classes.marginBottom}/>
                    <TextField id="outlined-basic" label="Название" variant="outlined" onChange={this.setName}
                               className={classes.marginBottom}/>

                    <div className={classes.fieldContainer}>
                        <InputLabel className={classes.inputLabel}>
                            Описание для студента
                        </InputLabel>
                        <CKEditor events={{ "change": this.setContent }}
                                  activeClass={classes.textareaContainer} />
                    </div>

                    <div className={classes.selectContainerThemes}>
                        <InputLabel className={classes.selectTitle}>
                            Темы
                        </InputLabel>
                        <Select
                            multiple
                            native
                            value={1}
                            onChange={this.setThemesField}
                            label="Темы"
                            inputProps={{
                                id: 'select-multiple-native',
                            }}
                        >
                            {themes.map((theme) => (
                                <option key={theme.id} value={theme.id}>
                                    {theme.title}
                                </option>
                            ))}
                        </Select>
                        <Link style={{paddingLeft: '10px', fontSize: '16px'}} to={appRouter.getThemesRoute()}>
                            Создать тему
                        </Link>
                    </div>
                </form>

                <div className={classes.btnContainer}>
                    <Link to={appRouter.getTopicsRoute()}>
                        <Button type="outlined"
                                onClick={this.createTopic}>
                            Сохранить
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}

CreateTopic.propTypes = {
    classes: PropTypes.object,
    sections: PropTypes.array,
    themes: PropTypes.array,
    actions: PropTypes.object,
    auth: PropTypes.bool,
};

export default withStyles(styles)(connect(CreateTopic));