import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "./actions";
import {getDatabase} from './getters';
import {getAuth} from "../../layout/getters";
import * as Enum from "../Database/enum";

const mapStateToProps = (state) => {
    return {
        // TODO - сделать disableButton
        database: getDatabase(state),
        auth: getAuth(state),
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
