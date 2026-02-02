import createAction from "../../store/createAction";

import * as C from './constants';

const getProfileInfo = createAction(C.GET_PROFILE_INFO, 'payload');
const setProfileInfo = createAction(C.SET_PROFILE_INFO, 'payload');

const changeProfileInfo = createAction(C.CHANGE_PROFILE_INFO, 'payload');
const changePassword = createAction(C.CHANGE_PASSWORD, 'payload');
const changeProfileField = createAction(C.CHANGE_PROFILE_FIELD, 'payload');

export default {
    getProfileInfo,
    setProfileInfo,
    changePassword,
    changeProfileInfo,
    changeProfileField,
}