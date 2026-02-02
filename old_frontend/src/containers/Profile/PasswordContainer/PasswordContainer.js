import React from 'react';
import PropTypes from "prop-types";
import get from "lodash/get";

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import withStyles from '@material-ui/core/styles/withStyles';

import * as Enum from '../enum';

import connect from './PasswordContainer.connect';
import styles from './PasswordContainer.styles';

class PasswordContainer extends React.PureComponent{
    state = {
        passwordFieldIsFocused: false
    };

    changeField = (destination) => (e) => {
        this.props.actions.changeProfileField({destination, value: get(e, 'target.value', '')})
    };

    passwordFieldFocus = () => {
        this.setState({passwordFieldIsFocused: true});
    };

    passwordFieldBlur = () => {
        this.setState({passwordFieldIsFocused: false});
    };

    clickButtonHandler = () => {
        this.props.actions.changePassword();
    };

    render() {
        const {classes, disableButton, isPasswordError} = this.props;
        const {passwordFieldIsFocused} = this.state;
        const showPasswordError = isPasswordError && !passwordFieldIsFocused;

        return(
            <>
                <TextField label="Старый пароль"
                           className={classes.textField}
                           onChange={this.changeField(Enum.OLD_PASSWORD_FIELD)}
                           type="password"
                />
                <TextField label="Пароль"
                           className={classes.textField}
                           onChange={this.changeField(Enum.PASSWORD_FIELD)}
                           type="password"
                />
                <TextField label="Повторите пароль"
                           className={classes.textField}
                           onChange={this.changeField(Enum.PASSWORD_REPEAT_FIELD)}
                           type="password"
                           error={showPasswordError}
                           onFocus={this.passwordFieldFocus}
                           onBlur={this.passwordFieldBlur}
                           helperText={showPasswordError && 'Пароли не совпадают'}
                />

                <Button color="primary"
                        variant="contained"
                        className={classes.button}
                        disabled={disableButton}
                        onClick={this.clickButtonHandler}
                >
                    Изменить пароль
                </Button>
            </>
        );
    }
}

PasswordContainer.propTypes = {
    classes: PropTypes.object,
    actions: PropTypes.object,
    disableButton: PropTypes.bool,
    groupOptions: PropTypes.array,
};

export default connect(withStyles(styles)(PasswordContainer));