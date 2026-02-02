import React from 'react';
import PropTypes from "prop-types";
import get from "lodash/get";

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import withStyles from '@material-ui/core/styles/withStyles';

import * as Enum from '../enum';

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import connect from './ProfileInfoContainer.connect';
import styles from './ProfileInfoContainer.styles';

class ProfileInfoContainer extends React.PureComponent{
    state = {
        editMode: false,
    };

    editButtonClickHandler = () => {
        if (this.state.editMode){
            this.setEditModeFalse();
        } else {
            this.setEditModeTrue();
        }
    };

    setEditModeTrue = () => {
        this.setState({editMode: true});
    };

    setEditModeFalse = () => {
        this.setState({editMode: false});
    };

    changeField = (destination) => (e) => {
        this.props.actions.changeProfileField({destination, value: get(e, 'target.value', '')})
    };

    changeClickButtonHandler = () => {
        this.setEditModeFalse();
        this.props.actions.changeProfileInfo();
    };

    emailFieldFocus = () => {
        this.setState({emailFieldIsFocused: true});
    };

    emailFieldBlur = () => {
        this.setState({emailFieldIsFocused: false});
    };

    render() {
        const {classes, username, firstName, lastName, group, groupOptions, disableButton, isEmailError, email, isuNumber} = this.props;
        const {editMode} = this.state;

        const {emailFieldIsFocused} = this.state;

        const showEmailError = isEmailError && !emailFieldIsFocused;

        return(
            <>
                <IconButton onClick={this.editButtonClickHandler}
                            color={editMode ? 'primary' : 'default'}
                            className={classes.iconButton}
                >
                    <EditIcon />
                </IconButton>
                <TextField label="Логин"
                           className={classes.textField}
                           onChange={this.changeField(Enum.USERNAME_FIELD)}
                           value={username}
                           disabled
                />
                <TextField label="Email"
                           className={classes.textField}
                           onChange={this.changeField(Enum.EMAIL_FIELD)}
                           value={email}
                           error={showEmailError}
                           onFocus={this.emailFieldFocus}
                           onBlur={this.emailFieldBlur}
                           disabled={!editMode}
                />
                <TextField label="Имя"
                           className={classes.textField}
                           onChange={this.changeField(Enum.FIRST_NAME_FIELD)}
                           value={firstName}
                           disabled={!editMode}
                />
                <TextField label="Фамилия"
                           className={classes.textField}
                           onChange={this.changeField(Enum.LAST_NAME_FIELD)}
                           value={lastName}
                           disabled={!editMode}
                />

                <TextField label="Isu номер"
                           className={classes.textField}
                           onChange={this.changeField(Enum.ISU_NUMBER_FIELD)}
                           type="number"
                           value={isuNumber}
                           disabled={!editMode}
                />

                <FormControl>
                    <InputLabel id="group-selector-label">Номер группы</InputLabel>
                    <Select
                        labelId="group-selector-label"
                        onChange={this.changeField(Enum.GROUP_FIELD)}
                        value={group}
                        disabled={!editMode}
                    >
                        {groupOptions.map(group =>
                            <MenuItem value={group.id} key={`group-${group.id}`}>
                                {group.title} {group.period}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>

                {editMode &&
                    <Button color="primary"
                            variant="contained"
                            className={classes.button}
                            disabled={disableButton}
                            onClick={this.changeClickButtonHandler}
                    >
                        Изменить
                    </Button>
                }
            </>
        );
    }
}

ProfileInfoContainer.propTypes = {
    classes: PropTypes.object,
    actions: PropTypes.object,
    disableButton: PropTypes.bool,
    isEmailError: PropTypes.bool,
    email: PropTypes.string,
    lastName: PropTypes.string,
    firstName: PropTypes.string,
    group: PropTypes.number,
    groupOptions: PropTypes.array,
};

export default connect(withStyles(styles)(ProfileInfoContainer));