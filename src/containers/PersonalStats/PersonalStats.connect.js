import {connect} from 'react-redux';
import {getAuth} from "../../layout/getters";

const mapStateToProps = (state) => {
    return {
        auth: getAuth(state),
    };
};

export default connect(mapStateToProps);
