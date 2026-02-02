import React from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from "react-router";
import PropTypes from "prop-types";
import get from "lodash/get";
import { ReCaptcha } from 'react-recaptcha-v3'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography  from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import withStyles from '@material-ui/core/styles/withStyles';

import {appRouter} from '../../service/router-service';
import UserService from "../../service/user-service";

import * as Enum from './enum';

import connect from './SignUp.connect';
import styles from './SignUp.styles';

const userService = UserService.factory();

class SignUp extends React.PureComponent{
    state = {
        passwordFieldIsFocused: false,
        captchaValid: false,
    };

    componentDidMount() {
        this.props.actions.signUpGetOrganizations();
        this.props.actions.signUpGetPeriods();
        // this.props.actions.getGroupOptions();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.period !== this.props.period || prevProps.organization !== this.props.organization){
            if (this.props.period.length && this.props.organization.length){
                this.props.actions.signUpGetGroups({
                    period: this.props.period,
                    organization: this.props.organization,
                });
            }
        }
    }

    componentWillUnmount() {
        this.props.actions.signUpPageDown();
    }

    changeField = (destination) => (e) => {
        this.props.actions.signUpChangeField({destination, value: get(e, 'target.value', '')})
    };

    changeIsStudent = (e, checked) => {
        this.props.actions.signUpChangeField({destination: Enum.IS_STUDENT, value: checked})
    };

    clickButtonHandler = () => {
        this.props.actions.signUp();
    };

    passwordFieldFocus = () => {
        this.setState({passwordFieldIsFocused: true});
    };

    passwordFieldBlur = () => {
        this.setState({passwordFieldIsFocused: false});
    };

    emailFieldFocus = () => {
        this.setState({emailFieldIsFocused: true});
    };

    emailFieldBlur = () => {
        this.setState({emailFieldIsFocused: false});
    };

    captchaValidTrue = () => {
        this.setState({captchaValid: true});
    };

    render() {
        const {classes, disableButton, groups, isPasswordError, auth, period, organization,
            username, firstName, lastName, password, passwordRepeat, email, isEmailError, isuNumber, organisations, periods, isStudent } = this.props;

        const {passwordFieldIsFocused, emailFieldIsFocused} = this.state;

        const showPasswordError = isPasswordError && !passwordFieldIsFocused;
        const showEmailError = isEmailError && !emailFieldIsFocused;

        const isAuth = userService.isAuth() && auth;

        if (isAuth) return <Redirect to={appRouter.getAllCoursesRoute()} />;

        return(
            <div className={classes.root}>
                <div className={classes.form}>
                    <div className={classes.row}>
                        <TextField label="Логин"
                                   className={classes.textField}
                                   onChange={this.changeField(Enum.USERNAME_FIELD)}
                                   value={username}
                        />
                        <TextField label="Email"
                                   className={classes.textField}
                                   onChange={this.changeField(Enum.EMAIL_FIELD)}
                                   value={email}
                                   error={showEmailError}
                                   onFocus={this.emailFieldFocus}
                                   onBlur={this.emailFieldBlur}
                        />
                    </div>

                    <div className={classes.row}>
                        <TextField label="Имя"
                                   className={classes.textField}
                                   onChange={this.changeField(Enum.FIRST_NAME_FIELD)}
                                   value={firstName}
                        />
                        <TextField label="Фамилия"
                                   className={classes.textField}
                                   onChange={this.changeField(Enum.LAST_NAME_FIELD)}
                                   value={lastName}
                        />
                    </div>

                    <div className={classes.row}>
                        <TextField label="Пароль"
                                   className={classes.textField}
                                   onChange={this.changeField(Enum.PASSWORD_FIELD)}
                                   type="password"
                                   value={password}
                        />
                        <TextField label="Повторите пароль"
                                   className={classes.textField}
                                   onChange={this.changeField(Enum.PASSWORD_REPEAT_FIELD)}
                                   type="password"
                                   error={showPasswordError}
                                   onFocus={this.passwordFieldFocus}
                                   onBlur={this.passwordFieldBlur}
                                   helperText={showPasswordError && 'Пароли не совпадают'}
                                   value={passwordRepeat}
                        />
                    </div>

                    <div className={classes.student}>
                        <Checkbox onChange={this.changeIsStudent} />
                        <Typography> Я студент </Typography>
                    </div>

                    {isStudent &&
                        <>

                            <div className={classes.row}>
                                <FormControl className={classes.selectField}>
                                    <InputLabel id="group-selector-label">Организация</InputLabel>
                                    <Select
                                      labelId="group-selector-label"
                                      onChange={this.changeField(Enum.ORGANISATION_FIELD)}>
                                        {organisations.map(organisation =>
                                          <MenuItem value={organisation} key={`group-${organisation}`}>
                                              {organisation}
                                          </MenuItem>
                                        )}
                                    </Select>
                                </FormControl>

                                <FormControl className={classes.selectField}>
                                    <InputLabel id="group-selector-label">Период обучения</InputLabel>
                                    <Select
                                      labelId="group-selector-label"
                                      onChange={this.changeField(Enum.PERIOD_FIELD)}>
                                        {periods.map(period =>
                                          <MenuItem value={period} key={`group-${period}`}>
                                              {period}
                                          </MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className={classes.row}>
                                {organization.length && period.length ?
                                    <>
                                        <FormControl className={classes.selectField}>
                                            <InputLabel id="group-selector-label">Группа</InputLabel>
                                            <Select
                                              labelId="group-selector-label"
                                              onChange={this.changeField(Enum.GROUP_FIELD)}>
                                                {groups.map(group =>
                                                  <MenuItem value={group.id} key={`group-${group.id}`}>
                                                      {group.title}
                                                  </MenuItem>
                                                )}
                                            </Select>
                                        </FormControl>
                                        <TextField label="Табельный номер"
                                             className={classes.textField}
                                             onChange={this.changeField(Enum.ISU_NUMBER_FIELD)}
                                             type="number"
                                             value={isuNumber}
                                        />
                                    </>
                                  : <></>
                                }
                            </div>
                        </>
                    }

                    <ReCaptcha
                        sitekey="your_site_key"
                        action='action_name'
                        verifyCallback={this.captchaValidTrue}
                    />

                    <Button color="primary"
                            variant="contained"
                            className={classes.button}
                            disabled={disableButton}
                            onClick={this.clickButtonHandler}
                    >
                        Зарегистрироваться
                    </Button>

                    <Typography className={classes.noAccount}>
                        Есть аккаунт?&nbsp;
                        <Link to={appRouter.getSignInRoute()}
                              className={classes.link}>
                            Войти
                        </Link>
                    </Typography>
                </div>
            </div>
        );
    }
}

SignUp.propTypes = {
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    password: PropTypes.string,
    email: PropTypes.string,
    passwordRepeat: PropTypes.string,
    group: PropTypes.number,
    classes: PropTypes.object,
    actions: PropTypes.object,
    disableButton: PropTypes.bool,
    isPasswordError: PropTypes.bool,
    isEmailError: PropTypes.bool,
    auth: PropTypes.bool,
    groupOptions: PropTypes.array,
};

export default connect(withStyles(styles)(SignUp));