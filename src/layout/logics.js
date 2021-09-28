import {createLogic} from "redux-logic";
import get from 'lodash/get';

import * as C from './constants';
import actions from './actions';

import UserService from "../service/user-service";
import Service from './service';

import * as Enum from "./enum";

const userService = new UserService();
const service = new Service();

const getGroupOptions = createLogic({
    type: C.GET_GROUP_OPTIONS,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.GROUP_OPTIONS_FETCHING}));

        service.getGroupOptions()
            .then((res) => {
                dispatch(actions.setGroupOptions(get(res, 'data.results', [])));
                dispatch(actions.fetchingSuccess());
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.GROUP_OPTIONS_FETCHING}));
                return done();
            });
    }
});

const getUserData = createLogic({
    type: C.GET_USER_DATA,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.USER_DATA_FETCHING}));

        service.getUserData()
            .then((res) => {
                dispatch(actions.setUserData(res.data));
                dispatch(actions.fetchingSuccess());
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.USER_DATA_FETCHING}));
                return done();
            });
    }
});

const refreshToken = createLogic({
    type: C.REFRESH_TOKEN,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.REFRESH_TOKEN}));

        service.refreshToken(action.payload)
            .then((res) => {
                const token = res?.data?.access_token
                const refresh_token = res?.data?.refresh_token
                userService.setToken(token)
                userService.setRefreshToken(refresh_token)
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.REFRESH_TOKEN}));
                return done();
            });
    }
});

export default [
    getGroupOptions,
    getUserData,
    refreshToken,
];
