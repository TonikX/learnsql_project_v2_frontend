import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "./actions";
import * as Enum from './enum';
import {getFieldValue} from './getters';
import {getAuth} from "../../layout/getters";
import {getIsEmailError} from "../../utils";

const mapStateToProps = (state) => {
    const email = getFieldValue(state, Enum.EMAIL_FIELD);

    return {
        disableButton: getIsEmailError(email)
            || email.length === 0,
        email: email,
        auth: getAuth(state),
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
