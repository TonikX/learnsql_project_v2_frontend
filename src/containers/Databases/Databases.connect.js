import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "./actions";
import {getDatabases, getCurrentDatabases} from './getters';
import {getAuth} from "../../layout/getters";

const mapStateToProps = (state) => {
    return {
        // TODO - сделать disableButton
        databases: getDatabases(state),
        current_databases: getCurrentDatabases(state),
        auth: getAuth(state),
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
