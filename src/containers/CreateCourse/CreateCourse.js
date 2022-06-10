// noinspection JSValidateTypes

import React from "react";
import {Redirect} from "react-router";
import PropTypes from "prop-types";

import {appRouter} from '../../service/router-service';
import UserService from "../../service/user-service";


import connect from './CreateCourse.connect';
import styles from './CreateCourse.styles';
import withStyles from "@material-ui/core/styles/withStyles";
import * as Enum from "../CreateCourse/enum";
import get from "lodash/get";
import Button from "../../components/Button";
import {Checkbox, FormControlLabel, InputLabel, Link, MenuItem, Select, TextField, Typography} from "@material-ui/core";

const userService = UserService.factory();

class CreateCourse extends React.PureComponent {
    state = {
        accesibility: true,
        themes: []
    }

    componentDidMount = () => {
        this.props.actions.getThemesField()
    };

    setTitle = (e) => {
        console.log(e.target.value)
        this.props.actions.courseChangeField({destination: Enum.TITLE_FIELD, value: get(e, 'target.value', '')})
    };
    setDescription = (e) => {
        console.log(e.target.value)
        this.props.actions.courseChangeField({destination: Enum.DESCRIPTION_FIELD, value: get(e, 'target.value', '')})
    };
    setThemesField = (e) => {
        this.props.actions.courseChangeField({
            destination: Enum.THEMES_FIELD,
            value: [...e.target.selectedOptions].map(o => parseInt(o.value))
        })
    };
    setType = (e) => {
        console.log(e.target.value)
        this.props.actions.courseChangeField({destination: Enum.TYPE_FIELD, value: get(e, 'target.value', '')})
    };
    setDifficulty = (e) => {
        console.log(e.target.value)
        this.props.actions.courseChangeField({
            destination: Enum.DIFFICULTY_FIELD,
            value: parseInt(get(e, 'target.value', ''))
        })
    };
    setDatabaseType = (e) => {
        console.log(e.target.value)
        this.props.actions.courseChangeField({destination: Enum.DATABASE_TYPE_FIELD, value: get(e, 'target.value', '')})
    };
    setAccesibility = () => {
        const a = this.state.accesibility
        this.setState({
            accesibility: !a
        })
        console.log(this.state)
    }

    createCourse = () => {
        console.log(this.state)
        this.props.actions.courseChangeField({destination: Enum.ACCESIBILITY, value: this.state.accesibility})
        this.props.actions.createCourse()
    };

    // noinspection JSValidateTypes
    render() {
        const {classes, themes, auth} = this.props;
        console.log(themes)

        const isAuth = userService.isAuth() && auth;
        if (!isAuth) return <Redirect to={appRouter.getAllCoursesRoute()}/>;

        return (
            <div className={classes.root}>
                <Typography className={classes.title} variant="h6">Создание курса</Typography>
                <Link className={classes.backButton}
                      href={appRouter.getCoursesRoute()}
                      color="inherit">
                    Назад
                </Link>
                <form className={classes.formContainer}>
                        <TextField id="outlined-basic" label="Название" variant="outlined" onChange={this.setTitle}
                                   className={classes.marginBottom}/>
                        <TextField
                            id="standard-multiline-static"
                            rows={15}
                            label="Описание"
                            placeholder="Описание"
                            multiline
                            variant="outlined"
                            className={classes.marginBottom}
                            onChange={this.setDescription}
                        />

                    <div className={classes.selectContainer}>
                        <InputLabel id="demo-simple-select-autowidth-label" className={classes.selectTitle}>Сложность
                            курса</InputLabel>
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

                    <div className={classes.selectContainer}>
                        <InputLabel id="demo-simple-select-autowidth-label" className={classes.selectTitle}>Тип
                            курса</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            onChange={this.setDifficulty}
                            autoWidth
                            label="Сложность"
                            value={"simple"}
                            className={classes.selectField}
                        >
                            <MenuItem value={"simple"}>Простой</MenuItem>
                            <MenuItem value={"with_individualization"}>С индивидуализацией</MenuItem>
                            <MenuItem value={"interactive_random"}>Случайный</MenuItem>
                        </Select>
                    </div>

                    <div className={classes.selectContainerThemes}>
                        <InputLabel className={classes.selectTitle}>
                            Темы курса
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

                    <FormControlLabel className={classes.marginBottom} control={<Checkbox color="default"/>} label="Доступность"/>

                </form>
                <div className={classes.btnContainer}>
                    <Link to={appRouter.getCoursesRoute}>
                        <Button type="outlined"
                                onClick={this.createCourse}>
                            Сохранить
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}

CreateCourse.propTypes = {
    classes: PropTypes.object,
    themes: PropTypes.array,
    actions: PropTypes.object,
    auth: PropTypes.bool,
};

export default withStyles(styles)(connect(CreateCourse));