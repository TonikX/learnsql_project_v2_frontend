import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "../actions";
import * as Enum from '../enum';
import {getFieldValue} from '../getters';
import {getAuth} from "../../../layout/getters";
import {getIsPasswordError} from "../../../utils";

const mapStateToProps = (state) => {
    const password = getFieldValue(state, Enum.NEW_PASSWORD_FIELD);
    const repeat_password = getFieldValue(state, Enum.REPEAT_NEW_PASSWORD_FIELD);

    return {
        disableButton: getIsPasswordError(password, repeat_password)
            || password.length === 0
            || repeat_password.length === 0,
        password: password,
        repeatPassword: repeat_password,
        auth: getAuth(state),
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
