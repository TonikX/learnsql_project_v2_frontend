import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "./actions";
import {getThemes, getThemesCount} from './getters';
import {getAuth} from "../../layout/getters";

const mapStateToProps = (state) => {
    return {
        themes: getThemes(state),
        themes_count: getThemesCount(state),
        auth: getAuth(state),
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
