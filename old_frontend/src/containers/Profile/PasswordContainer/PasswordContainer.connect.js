import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {getIsPasswordError} from '../../../utils';
import actions from "../actions";
import * as Enum from '../enum';
import {getFieldValue} from '../getters';

const mapStateToProps = (state) => {
    const password = getFieldValue(state, Enum.PASSWORD_FIELD);
    const passwordRepeat = getFieldValue(state, Enum.PASSWORD_REPEAT_FIELD);

    return {
        disableButton: getFieldValue(state, Enum.PASSWORD_REPEAT_FIELD).length === 0
            || password.length === 0
            || passwordRepeat.length === 0
            || getIsPasswordError(password, passwordRepeat)
        ,
        isPasswordError: getIsPasswordError(password, passwordRepeat),
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
