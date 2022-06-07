import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "./actions";
import {getThemesField, getDatabasesField} from './getters';
import {getAuth} from "../../layout/getters";

const mapStateToProps = (state) => {
    return {
        themes: getThemesField(state),
        databases: getDatabasesField(state),
        auth: getAuth(state),
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
