import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "./actions";
import {getCourses, getMyCourses} from './getters';
import {getAuth} from "../../layout/getters";

const mapStateToProps = (state) => {
    return {
        courses: getCourses(state),
        myCourses: getMyCourses(state),
        auth: getAuth(state),
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
