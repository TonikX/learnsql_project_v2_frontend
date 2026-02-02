import React from 'react';
import {Redirect} from "react-router";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import get from 'lodash/get';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography  from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import {appRouter} from '../../service/router-service';
import UserService from "../../service/user-service";

import * as Enum from './enum';

import connect from './ResetPassword.connect';
import styles from './ResetPassword.styles';

const userService = UserService.factory();

class ResetPassword extends React.PureComponent{
    componentWillUnmount() {
        this.props.actions.resetPasswordPageDown();
    }

    changeEmail = (e) => {
        this.props.actions.resetPasswordChangeField({destination: Enum.EMAIL_FIELD, value: get(e, 'target.value', '')})
    };

    clickButtonHandler = () => {
        this.props.actions.resetPassword();
    };

    render() {
        const {classes, disableButton, auth, email} = this.props;
        const isAuth = userService.isAuth() && auth;

        if (isAuth) return <Redirect to={appRouter.getAllCoursesRoute()} />;

        return(
            <div className={classes.root}>
                <div className={classes.form}>
                    <TextField label="Email"
                               className={classes.textField}
                               onChange={this.changeEmail}
                               value={email}
                    />
                    <Button color="primary"
                            variant="contained"
                            className={classes.button}
                            disabled={disableButton}
                            onClick={this.clickButtonHandler}
                    >
                        Восстановить пароль
                    </Button>

                    <Typography className={classes.noAccount}>
                        Есть аккаунт?&nbsp;
                        <Link to={appRouter.getSignInRoute()}
                              className={classes.link}>
                            Войти
                        </Link>
                    </Typography>
                    <Typography className={classes.noAccount}>
                        Нет аккаунта?&nbsp;
                        <Link to={appRouter.getSignUpRoute()}
                              className={classes.link}>
                            Регистрация
                        </Link>
                    </Typography>
                </div>
            </div>
        );
    }
}

ResetPassword.propTypes = {
    classes: PropTypes.object,
    actions: PropTypes.object,
    disableButton: PropTypes.bool,
    auth: PropTypes.bool,
};

export default withStyles(styles)(connect(ResetPassword));