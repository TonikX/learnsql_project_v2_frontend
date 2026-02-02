import React from 'react';
import {Redirect} from "react-router";
import PropTypes from "prop-types";
import get from 'lodash/get';
import {Link} from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import {appRouter} from '../../../service/router-service';
import UserService from "../../../service/user-service";

import * as Enum from '../enum';

import connect from './ResetPasswordConfirm.connect';
import styles from './ResetPasswordConfirm.styles';
import Typography from "@material-ui/core/Typography";

const userService = UserService.factory();

class ResetPasswordConfirm extends React.PureComponent{
    componentDidMount() {
        const params = get(this, 'props.match.params', {});

        this.props.actions.resetPasswordChangeField({destination: Enum.UID, value: params.uid})
        this.props.actions.resetPasswordChangeField({destination: Enum.TOKEN, value: params.token})
    }

    componentWillUnmount() {
        this.props.actions.resetPasswordPageDown();
    }

    changeField = (field) => (e) => {
        this.props.actions.resetPasswordChangeField({destination: field, value: get(e, 'target.value', '')})
    };

    clickButtonHandler = () => {
        this.props.actions.confirmNewPassword();
    };

    render() {
        const {classes, disableButton, auth, password, repeatPassword} = this.props;
        const isAuth = userService.isAuth() && auth;

        if (isAuth) return <Redirect to={appRouter.getAllCoursesRoute()} />;

        return(
            <div className={classes.root}>
                <div className={classes.form}>
                    <TextField label="Пароль"
                               className={classes.textField}
                               onChange={this.changeField(Enum.NEW_PASSWORD_FIELD)}
                               value={password}
                               type="password"
                    />
                    <TextField label="Повторите пароль"
                               className={classes.textField}
                               onChange={this.changeField(Enum.REPEAT_NEW_PASSWORD_FIELD)}
                               value={repeatPassword}
                               type="password"
                    />
                    <Button color="primary"
                            variant="contained"
                            className={classes.button}
                            disabled={disableButton}
                            onClick={this.clickButtonHandler}
                    >
                        Подтвердить новый пароль
                    </Button>

                    <Typography className={classes.noAccount}>
                        Вспомнили пароль?&nbsp;
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

ResetPasswordConfirm.propTypes = {
    classes: PropTypes.object,
    actions: PropTypes.object,
    disableButton: PropTypes.bool,
    auth: PropTypes.bool,
};

export default withStyles(styles)(connect(ResetPasswordConfirm));