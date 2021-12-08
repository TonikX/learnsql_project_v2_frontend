import createAction from "../store/createAction";
import * as C from "./constants";

const fetchingTrue = createAction(C.FETCHING_TRUE, 'payload');
const fetchingFalse = createAction(C.FETCHING_FALSE, 'payload');
const fetchingFailed = createAction(C.FETCHING_FAILED, 'payload');
const fetchingSuccess = createAction(C.FETCHING_SUCCESS, 'payload');
const refreshToken = createAction(C.REFRESH_TOKEN, 'payload');

const getUserData = createAction(C.GET_USER_DATA, 'payload');
const setUserData = createAction(C.SET_USER_DATA, 'payload');

const getGroupOptions = createAction(C.GET_GROUP_OPTIONS, 'payload');
const setGroupOptions = createAction(C.SET_GROUP_OPTIONS, 'payload');

const setAuthTrue = createAction(C.SET_AUTH_TRUE, 'payload');
const setAuthFalse = createAction(C.SET_AUTH_FALSE, 'payload');

export default {
    refreshToken,
    fetchingTrue,
    fetchingFalse,
    fetchingFailed,
    fetchingSuccess,
    getUserData,
    setUserData,
    getGroupOptions,
    setGroupOptions,
    setAuthTrue,
    setAuthFalse,
}
