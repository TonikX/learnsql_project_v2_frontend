import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "./actions";
import {getSections, getCurrentSections, getCourses} from './getters';
import {getAuth} from "../../layout/getters";

const mapStateToProps = (state) => {
    return {
        // TODO - сделать disableButton
        sections: getSections(state),
        courses: getCourses(state),
        current_sections: getCurrentSections(state),
        auth: getAuth(state),
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
