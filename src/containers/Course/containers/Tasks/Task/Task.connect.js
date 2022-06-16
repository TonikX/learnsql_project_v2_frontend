import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "../../../actions";
import {
    getCurrentTask, getCurrentTaskError, getCurrentTaskSolution, getCurrentTaskErrorTableData,
    getCurrentTaskAnswer, getNextRoute, getThemes, getCourseTasksErrors, getCurrentRouteId
} from '../../../getters';
import {getUser} from "../../../../../layout/getters";
import layoutActions from "../../../../../layout/actions";

const mapStateToProps = (state) => {
    const solution = getCurrentTaskSolution(state);

    return {
        task: getCurrentTask(state),
        error: getCurrentTaskError(state),
        solution: solution,
        tableErrorData: getCurrentTaskErrorTableData(state),
        answer: getCurrentTaskAnswer(state),
        isDone: solution.length > 0,
        nextRoute: getNextRoute(state),
        themes: getThemes(state),
        errors: getCourseTasksErrors(state),
        courseId: getCurrentRouteId(state),
        userData: getUser(state)
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...actions, ...layoutActions}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
