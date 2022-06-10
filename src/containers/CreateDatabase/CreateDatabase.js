// noinspection JSValidateTypes

import React from "react";
import {Redirect} from "react-router";
import PropTypes from "prop-types";

import {appRouter} from '../../service/router-service';
import UserService from "../../service/user-service";


import connect from './CreateDatabase.connect';
import styles from './CreateDatabase.styles';
import withStyles from "@material-ui/core/styles/withStyles";
import * as Enum from "../CreateDatabase/enum";
import get from "lodash/get";
import CKEditor from "react-ckeditor-component/lib";
import CodeEditor from '@uiw/react-textarea-code-editor';
import Button from "../../components/Button";
import AdminNavigation from "../../components/AdminNavigation";
import {Input, InputLabel, Link, TextField, Typography} from "@material-ui/core";
import {AttachFile} from "@material-ui/icons";

const userService = UserService.factory();

class CreateDatabase extends React.PureComponent {

    componentDidMount = () => {

    };

    setTitle = (e) => {
        this.props.actions.databaseChangeField({destination: Enum.TITLE_FIELD, value: get(e, 'target.value', '')})
    };

    setDescription = (e) => {
        this.props.actions.databaseChangeField({destination: Enum.DESCRIPTION_FIELD, value: e.editor.getData()})
    };

    setCode = (e) => {
        this.props.actions.databaseChangeField({destination: Enum.SOURCE_CODE_FIELD, value: get(e, 'target.value', '')})
    };

    createDatabase = () => {
        this.props.actions.createDatabase()
    };

    // noinspection JSValidateTypes
    render() {
        const {classes, auth} = this.props;
        const isAuth = userService.isAuth() && auth;
        if (!isAuth) return <Redirect to={appRouter.getAllCoursesRoute()}/>;

        return (
            <div className={classes.root}>
                <Typography className={classes.title} variant="h6">Создание учебной базы данных</Typography>
                <Link className={classes.backButton}
                      href={appRouter.getDatabasesRoute()}
                      color="inherit">
                    Назад
                </Link>
                <form className={classes.formContainer}>
                    <TextField id="outlined-basic" label="Название" variant="outlined" onChange={this.setTitle}
                               className={classes.marginBottom}/>

                    <div className={classes.fieldContainer}>
                        <InputLabel className={classes.inputLabel}>
                            Описание для студента
                        </InputLabel>
                        <CKEditor events={{ "change": this.setDescription }}
                                  activeClass={classes.textareaContainer} />
                    </div>

                    <div className={classes.fieldContainer}>
                        <InputLabel className={classes.inputLabel}>
                            Код базы данных
                        </InputLabel>
                        <CodeEditor
                            language="sql"
                            placeholder="Enter SQL code."
                            onChange={this.setCode}
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

                    <div className={classes.fileContainer}>
                        <InputLabel className={classes.fileTitle}>
                            Загрузка файла
                        </InputLabel>
                        <input className={classes.fileField}
                               type="file"/>
                    </div>

                    <div className={classes.fileContainer}>
                        <InputLabel className={classes.fileTitle}>
                            Изображение
                        </InputLabel>
                        <input className={classes.fileField}
                               type="file"/>
                    </div>
                </form>
                <div className={classes.btnContainer}>
                    <Link to={appRouter.getDatabasesRoute}>
                        <Button type="outlined"
                                onClick={this.createDatabase}>
                            Сохранить
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}

CreateDatabase.propTypes = {
    classes: PropTypes.object,
    databases: PropTypes.array,
    actions: PropTypes.object,
    auth: PropTypes.bool,
};

export default withStyles(styles)(connect(CreateDatabase));