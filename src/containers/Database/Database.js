// noinspection JSValidateTypes

import React from "react";
import PropTypes from "prop-types";
import UserService from "../../service/user-service";
import connect from './Database.connect';
import styles from './Database.styles';
import withStyles from "@material-ui/core/styles/withStyles";
import {Link, withRouter} from "react-router-dom";
import {Redirect} from "react-router";
import {appRouter} from "../../service/router-service";
import * as Enum from "../Database/enum";
import get from "lodash/get";
import ModalWindow from "../../components/ModalWindow";
import CKEditor from "react-ckeditor-component/lib";
import CodeEditor from '@uiw/react-textarea-code-editor';
import Button from "../../components/Button";
import AdminNavigation from "../../components/AdminNavigation";
import {InputLabel, TextField, Typography} from "@material-ui/core";

const userService = UserService.factory();

class Database extends React.PureComponent{
    state = {
        modal: false,
        id: this.props.match.params.id,
        title: '',
        description: '',
        source_code: ''
    };

    componentDidMount = () => {
        const id = this.state.id
        this.props.actions.getDatabase(id);
    };

    updateDatabase = () => {
        this.props.actions.updateDatabase(this.state.id)
    };

    deleteDatabase = () => {
        this.props.actions.deleteDatabase(this.state.id)
        this.closeModal()
        this.forceUpdate()
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

    setTitle = (e) => {
        this.props.actions.databaseChangeField({destination: Enum.TITLE_FIELD, value: get(e, 'target.value', '')})
    };

    setDescription = (e) => {
        this.props.actions.databaseChangeField({destination: Enum.DESCRIPTION_FIELD, value: e.editor.getData()})
    };

    setCode = (e) => {
        this.props.actions.databaseChangeField({destination: Enum.SOURCE_CODE_FIELD, value: get(e, 'target.value', '')})
    };

    setDatabase = () => {
        this.setState({
            title: this.props.database.title,
            description: this.props.database.description,
            source_code: this.props.database.source_code
        })
    };

    render() {
        const {classes, auth} = this.props;
        const isAuth = userService.isAuth() && auth;
        this.setDatabase()
        console.log(this.props.database)

        if (!isAuth) return <Redirect to={appRouter.getAllCoursesRoute()} />;

        return(
            <div className={classes.root}>
                <Typography className={classes.title} variant="h6">Редактирование учебной базы данных</Typography>
                <Link className={classes.backButton}
                      to={appRouter.getDatabasesRoute()}>
                    Назад
                </Link>
                <form className={classes.formContainer}>
                    <TextField id="outlined-basic" label="Название" variant="outlined"
                               value={this.state.title || ''} onChange={this.setTitle}
                               className={classes.marginBottom}/>

                    <div className={classes.fieldContainer}>
                        <InputLabel className={classes.inputLabel}>
                            Описание для студента
                        </InputLabel>
                        <CKEditor events={{ "change": this.setDescription }}
                                  content={this.state.description}
                                  activeClass={classes.textareaContainer} />
                    </div>

                    <div className={classes.fieldContainer}>
                        <InputLabel className={classes.inputLabel}>
                            Код базы данных
                        </InputLabel>
                        <CodeEditor
                            language="sql"
                            placeholder="Enter SQL code."
                            value={this.state.source_code}
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
                </form>
                <div className={classes.btnContainer}>
                    <Button color="primary"
                            onClick={this.updateDatabase}>
                        Сохранить
                    </Button>
                    <Button type="delete"
                            onClick={this.showModal}>
                        Удалить
                    </Button>
                </div>
                <ModalWindow visible={this.state.modal} closeModal={this.closeModal}>
                    <div>
                        <div style={{width: '400px', paddingBottom: '20px'}}>
                            Вы уверены, что хотите удалить базу данных?
                        </div>
                        <div className={classes.btnContainer}>
                            <Button type="delete"
                                        onClick={this.deleteDatabase}>
                                Удалить
                            </Button>
                            <Button onClick={this.closeModal}>
                                Отмена
                            </Button>
                        </div>
                    </div>
                </ModalWindow>
            </div>
            // <div className={classes.dbContainer}>
            //     {this.props.database.id}
            //     {this.props.database.title}
            // </div>
        );
    }
}

Database.propTypes = {
    classes: PropTypes.object,
    actions: PropTypes.object,
    database: PropTypes.object,
    id: PropTypes.number,
    auth: PropTypes.bool,
};

export default withStyles(styles)(withRouter(connect(Database)))