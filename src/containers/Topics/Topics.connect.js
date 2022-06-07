import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "./actions";
import {getTopics, getCurrentTopics} from './getters';
import {getAuth} from "../../layout/getters";

const mapStateToProps = (state) => {
    return {
        // TODO - сделать disableButton
        topics: getTopics(state),
        current_topics: getCurrentTopics(state),
        auth: getAuth(state),
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
