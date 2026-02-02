import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "./actions";
import layoutActions from "../../layout/actions";
import * as Enum from './enum';
import {getIsPasswordError, getIsEmailError} from '../../utils';
import {getFieldValue} from './getters';
import {getAuth, getGroupOptions} from '../../layout/getters';

const mapStateToProps = (state) => {
    const password = getFieldValue(state, Enum.PASSWORD_FIELD);
    const passwordRepeat = getFieldValue(state, Enum.PASSWORD_REPEAT_FIELD);
    const email = getFieldValue(state, Enum.EMAIL_FIELD);
    const isEmailError = getIsEmailError(email);

    return {
        disableButton: getFieldValue(state, Enum.USERNAME_FIELD).length === 0
                    || getFieldValue(state, Enum.FIRST_NAME_FIELD).length === 0
                    || getFieldValue(state, Enum.LAST_NAME_FIELD).length === 0
                    || getFieldValue(state, Enum.PASSWORD_FIELD).length === 0
                    || getFieldValue(state, Enum.PASSWORD_REPEAT_FIELD).length === 0
                    || getFieldValue(state, Enum.IS_STUDENT) && getFieldValue(state, Enum.GROUP_FIELD).length === 0
                    || getIsPasswordError(password, passwordRepeat)
                    || isEmailError
        ,
        groupOptions: getGroupOptions(state),
        isPasswordError: getIsPasswordError(password, passwordRepeat),
        isEmailError: isEmailError,
        auth: getAuth(state),
        username: getFieldValue(state, Enum.USERNAME_FIELD),
        isStudent: getFieldValue(state, Enum.IS_STUDENT),
        firstName: getFieldValue(state, Enum.FIRST_NAME_FIELD),
        lastName: getFieldValue(state, Enum.LAST_NAME_FIELD),
        password: password,
        passwordRepeat: passwordRepeat,
        group: getFieldValue(state, Enum.GROUP_FIELD),
        isuNumber: getFieldValue(state, Enum.ISU_NUMBER_FIELD),
        organization: getFieldValue(state, Enum.ORGANISATION_FIELD),
        period: getFieldValue(state, Enum.PERIOD_FIELD),
        periods: getFieldValue(state, Enum.PERIODS),
        organisations: getFieldValue(state, Enum.ORGANISATIONS),
        groups: getFieldValue(state, Enum.GROUPS),
        email: email,
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...actions, ...layoutActions}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
