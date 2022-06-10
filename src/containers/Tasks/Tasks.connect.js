import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "./actions";
import {getTasks, getTasksCount} from './getters';
import {getAuth} from "../../layout/getters";

const mapStateToProps = (state) => {
    return {
        tasks: getTasks(state),
        tasks_count: getTasksCount(state),
        auth: getAuth(state),
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
