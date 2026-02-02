import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "../../actions";
import {isOpenCourseFinishModal} from '../../getters';

const mapStateToProps = (state) => {
    return {
        isOpen: isOpenCourseFinishModal(state),
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
