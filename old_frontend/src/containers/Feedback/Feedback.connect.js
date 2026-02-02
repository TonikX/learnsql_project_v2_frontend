import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "./actions";
import {getUser} from "../../layout/getters";
import {getFieldValue} from "./getters";
import * as Enum from "./enum";

const mapStateToProps = (state) => {
    return {
        disableButton: getFieldValue(state, Enum.SUBJECT).length === 0
                    || getFieldValue(state, Enum.MESSAGE).length === 0,
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
