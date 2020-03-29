import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "./actions";
import layoutActions from "../../layout/actions";
import {getGroupOptions, getUser} from "../../layout/getters";

const mapStateToProps = (state) => {
    return {
        user: getUser(state),
        groupOptions: getGroupOptions(state),
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...actions, ...layoutActions}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
