import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "./actions";
import {getSections, getThemes} from './getters';
import {getAuth} from "../../layout/getters";

const mapStateToProps = (state) => {
    return {
        // TODO - сделать disableButton
        sections: getSections(state),
        themes: getThemes(state),
        auth: getAuth(state),
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
