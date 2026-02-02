import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {getIsEmailError} from '../../../utils';
import actions from "../actions";
import * as Enum from '../enum';
import {getFieldValue} from '../getters';
import {getGroupOptions, getUser} from '../../../layout/getters';

const mapStateToProps = (state) => {
    const email = getFieldValue(state, Enum.EMAIL_FIELD);
    const isEmailError = getIsEmailError(email);

    return {
        user: getUser(state),
        groupOptions: getGroupOptions(state),
        username: getFieldValue(state, Enum.USERNAME_FIELD),
        firstName: getFieldValue(state, Enum.FIRST_NAME_FIELD),
        lastName: getFieldValue(state, Enum.LAST_NAME_FIELD),
        group: getFieldValue(state, Enum.GROUP_FIELD),
        isuNumber: getFieldValue(state, Enum.ISU_NUMBER_FIELD),
        email: email,
        isEmailError: isEmailError,
        disableButton: getFieldValue(state, Enum.FIRST_NAME_FIELD)?.length === 0
            || getFieldValue(state, Enum.LAST_NAME_FIELD)?.length === 0
            || getFieldValue(state, Enum.GROUP_FIELD)?.length === 0
            || getFieldValue(state, Enum.ISU_NUMBER_FIELD)?.length !== 6
            || email?.length === 0
            || isEmailError
        ,
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
