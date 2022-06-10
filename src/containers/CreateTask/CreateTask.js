// noinspection JSValidateTypes

import React from "react";
import {Redirect} from "react-router";
import PropTypes from "prop-types";

import {appRouter} from '../../service/router-service';
import UserService from "../../service/user-service";


import connect from './CreateTask.connect';
import styles from './CreateTask.styles';
import withStyles from "@material-ui/core/styles/withStyles";
import * as Enum from "../CreateTask/enum";
import get from "lodash/get";
import {Link} from "react-router-dom";
import Button from "../../components/Button";
import AdminNavigation from "../../components/AdminNavigation";
import CodeEditor from "@uiw/react-textarea-code-editor";
import {Checkbox, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography} from "@material-ui/core";

const userService = UserService.factory();

class CreateTask extends React.PureComponent {
    state = {
        runtime: false
    }

    componentDidMount = () => {
        this.props.actions.getThemesField()
        this.props.actions.getDatabasesField()
    };

    setTitle = (e) => {
        this.props.actions.taskChangeField({destination: Enum.TITLE_FIELD, value: get(e, 'target.value', '')})
    };
    setText = (e) => {
        this.props.actions.taskChangeField({destination: Enum.TEXT_FIELD, value: get(e, 'target.value', '')})
    };
    setAnswer = (e) => {
        this.props.actions.taskChangeField({destination: Enum.ANSWER_FIELD, value: get(e, 'target.value', '')})
    };
    setDatabaseField = (e) => {
        this.props.actions.taskChangeField({destination: Enum.DATABASE_FIELD, value: parseInt(get(e, 'target.value', ''))})
    };
    setDifficulty = (e) => {
        this.props.actions.taskChangeField({destination: Enum.DIFFICULTY_FIELD, value: parseInt(get(e, 'target.value', ''))})
    };
    setBannedWords = (e) => {
        this.props.actions.taskChangeField({destination: Enum.BANNED_WORDS, value: get(e, 'target.value', '').split(',')})
    };
    setRequiredWords = (e) => {
        this.props.actions.taskChangeField({destination: Enum.REQUIRED_WORDS, value: get(e, 'target.value', '').split(',')})
    };
    setAttempts = (e) => {
        this.props.actions.taskChangeField({destination: Enum.NUMBER_OF_ATTEMPTS, value: parseInt(get(e, 'target.value', ''))})
    };
    setShouldCheckRuntime = () => {
        const a = this.state.runtime
        this.setState({
            runtime: !a
        })
    };
    setRuntime = (e) => {
        this.props.actions.taskChangeField({destination: Enum.ALLOWED_RUNTIME, value: parseInt(get(e, 'target.value', ''))})
    };
    setHelp = (e) => {
        this.props.actions.taskChangeField({destination: Enum.HELP_FILED, value: get(e, 'target.value', '')})
    };
    setThemesField = (e) => {
        this.props.actions.courseChangeField({destination: Enum.THEMES_FIELD, value: [...e.target.selectedOptions].map(o => parseInt(o.value))})
    };

    createTask = () => {
        this.props.actions.courseChangeField({destination: Enum.SHOULD_CHECK_RUNTIME, value: this.state.runtime})
        this.props.actions.createTask()
    };

    // noinspection JSValidateTypes
    render() {
        const {classes, themes, databases, auth} = this.props;
        console.log(databases)

        const isAuth = userService.isAuth() && auth;
        if (!isAuth) return <Redirect to={appRouter.getAllCoursesRoute()}/>;

        return (
            <div className={classes.root}>
                <Typography className={classes.title} variant="h6">Создание задания</Typography>
                <Link className={classes.backButton}
                      to={appRouter.getTasksRoute()}>
                    Назад
                </Link>
                <form className={classes.formContainer}>
                    <TextField id="outlined-basic" label="Название"
                               variant="outlined" onChange={this.setTitle}
                               className={classes.marginBottom}/>
                    <TextField
                        id="standard-multiline-static"
                        rows={10}
                        label="Текст задания"
                        placeholder="Текст задания"
                        multiline
                        variant="outlined"
                        className={classes.marginBottom}
                        onChange={this.setText}
                    />

                    <div className={classes.fieldContainer}>
                        <InputLabel className={classes.inputLabel}>
                            Ответ
                        </InputLabel>
                        <CodeEditor
                            language="sql"
                            placeholder="Enter SQL code."
                            onChange={this.setAnswer}
                            padding={15}
                            style={{
                                width: '100%',
                                height: '300px',
                                fonSize: '18px',
                                marginBottom: '30px',
                                fontSize: 12,
                                backgroundColor: "#f5f5f5",
                                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                            }}
                        />
                    </div>

                    <div className={classes.selectContainer}>
                        <InputLabel id="demo-simple-select-autowidth-label"
                                    className={classes.selectTitle}>
                            База данных
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
                                databases.map(database =>
                                    <MenuItem value={database.id} key={database.id}>
                                        {database.title}
                                    </MenuItem>
                                )
                            }
                        </Select>
                    </div>

                    <div className={classes.selectContainer}>
                        <InputLabel id="demo-simple-select-autowidth-label" className={classes.selectTitle}>
                            Сложность задания
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            onChange={this.setDifficulty}
                            autoWidth
                            label="Сложность"
                            value={3}
                            className={classes.selectField}
                        >
                            <MenuItem value={1}>Очень просто</MenuItem>
                            <MenuItem value={2}>Легко</MenuItem>
                            <MenuItem value={3}>Средний уровень</MenuItem>
                            <MenuItem value={4}>Трудно</MenuItem>
                            <MenuItem value={5}>Очень трудно</MenuItem>
                        </Select>
                    </div>

                    <TextField
                        id="standard-multiline-static"
                        rows={5}
                        label="Запрещенные слова"
                        placeholder="Запрещенные слова"
                        multiline
                        variant="outlined"
                        className={classes.marginBottom}
                        onChange={this.setBannedWords}
                    />

                    <TextField
                        id="standard-multiline-static"
                        rows={5}
                        label="Обязательные слова"
                        placeholder="Обязательные слова"
                        multiline
                        variant="outlined"
                        className={classes.marginBottom}
                        onChange={this.setRequiredWords}
                    />

                    <TextField id="outlined-basic" label="Количество попыток"
                               variant="outlined" onChange={this.setAttempts}
                               className={classes.marginBottom}/>

                    <div className={classes.selectContainer}>
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
                    </div>

                    <FormControlLabel className={classes.marginBottom} control={<Checkbox color="default"/>} label="Проверка времени"/>

                    {this.state.runtime === true &&
                        <TextField id="outlined-basic" label="Время выполнения"
                                   variant="outlined" onChange={this.setRuntime}
                                   className={classes.marginBottom}/>
                    }

                    <TextField
                        id="standard-multiline-static"
                        rows={5}
                        label="Подсказка"
                        placeholder="Подсказка"
                        multiline
                        variant="outlined"
                        className={classes.marginBottom}
                        onChange={this.setHelp}
                    />
                </form>

                <div className={classes.btnContainer}>
                    <Link to={appRouter.getTasksRoute}>
                        <Button type="outlined"
                                onClick={this.createTask}>
                            Сохранить
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}

CreateTask.propTypes = {
    classes: PropTypes.object,
    themes: PropTypes.array,
    databases: PropTypes.array,
    actions: PropTypes.object,
    auth: PropTypes.bool,
};

export default withStyles(styles)(connect(CreateTask));