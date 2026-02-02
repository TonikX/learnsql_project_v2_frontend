import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "../../actions";
import {getCourseId, getStatistics} from '../../getters';

const mapStateToProps = (state) => {
    return {
        courseId: getCourseId(state),
        statistics: getStatistics(state),
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
