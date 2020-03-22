import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "./actions";
import * as Enum from './enum';
import {getFieldValue, getGroupOptions} from './getters';

const mapStateToProps = (state) => {
    return {
        disableButton: getFieldValue(state, Enum.USERNAME_FIELD).length === 0
                    || getFieldValue(state, Enum.FIRST_NAME_FIELD).length === 0
                    || getFieldValue(state, Enum.LAST_NAME_FIELD).length === 0
                    || getFieldValue(state, Enum.PASSWORD_FIELD).length === 0
                    || getFieldValue(state, Enum.PASSWORD_REPEAT_FIELD).length === 0
                    // || getFieldValue(state, Enum.GROUP_FIELD).length === 0
        ,
        groupOptions: getGroupOptions(state),
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
