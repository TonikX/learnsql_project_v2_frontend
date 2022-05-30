import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import actions from "./actions";
import {getStatistic} from "./getters";

const mapStateToProps = (state) => {
    return {
        statistic: getStatistic(state),

    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);