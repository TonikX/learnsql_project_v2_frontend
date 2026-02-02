import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "../../actions";
import {getCourseId, getCurrentRouteId, getCurrentTaskId, getTasks} from '../../getters';
import {isFetchingByKey} from '../../../../layout/getters';
import * as Enum from '../../enum';

const mapStateToProps = (state) => {
    return {
        tasks: getTasks(state),
        courseId: getCourseId(state),
        currentTaskId: getCurrentTaskId(state),
        currentRouteId: getCurrentRouteId(state),
        isFetchingGet: isFetchingByKey(state, Enum.GET_COURSE_TASK_FETCHING) || isFetchingByKey(state, Enum.GET_COURSE_TASKS_FETCHING)
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
