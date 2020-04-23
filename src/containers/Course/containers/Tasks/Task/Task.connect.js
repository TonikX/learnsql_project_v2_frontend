import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "../../../actions";
import {getCurrentTask, getCurrentTaskError, getCurrentTaskSolution, getCurrentTaskErrorTableData, getCurrentTaskAnswer, getNextRoute} from '../../../getters';

const mapStateToProps = (state) => {
    const solution = getCurrentTaskSolution(state);

    return {
        task: getCurrentTask(state),
        error: getCurrentTaskError(state),
        solution: solution,
        tableErrorData: getCurrentTaskErrorTableData(state),
        answer: getCurrentTaskAnswer(state),
        isDone: solution.length > 0,
        nextRoute: getNextRoute(state)
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
