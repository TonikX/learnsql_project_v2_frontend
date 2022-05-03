import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import actions from "./actions";
import {getRooms, getUsers} from './getters';

import {getAuth, getGroupOptions, getUser} from "../../layout/getters";
import layoutActions from "../../layout/actions";
const mapStateToProps = (state) => {
    return {
        rooms: getRooms(state),
        users: getUsers(state),
        userData: getUser(state)
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...actions, ...layoutActions}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
