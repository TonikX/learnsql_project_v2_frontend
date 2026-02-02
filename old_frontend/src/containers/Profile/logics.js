import {createLogic} from "redux-logic";

import * as C from './constants';
import actions from '../../layout/actions';
import profileActions from './actions';

import Service from './service';

import * as Enum from "./enum";
import {getFormDataForChangeInfo, getFormDataForChangePassword} from "./getters";

const service = new Service();

const changeProfileInfo = createLogic({
    type: C.CHANGE_PROFILE_INFO,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();
        const formData = getFormDataForChangeInfo(state);

        dispatch(actions.fetchingTrue({destination: Enum.CHANGE_PROFILE_FETCHING}));

        service.changeProfileInfo(formData)
            .then((res) => {
                dispatch(profileActions.changeProfileField({destination: Enum.PASSWORD_FIELD, value: ''}));
                dispatch(profileActions.changeProfileField({destination: Enum.PASSWORD_REPEAT_FIELD, value: ''}));
                dispatch(profileActions.changeProfileField({destination: Enum.OLD_PASSWORD_FIELD, value: ''}));

                dispatch(actions.setUserData(res.data));
                dispatch(actions.fetchingSuccess(['Данные успешно изменены.']));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.CHANGE_PROFILE_FETCHING}));
                return done();
            });
    }
});

const changePassword = createLogic({
    type: C.CHANGE_PASSWORD,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();
        const formData = getFormDataForChangePassword(state);

        dispatch(actions.fetchingTrue({destination: Enum.CHANGE_PASSWORD_FETCHING}));

        service.changePassword(formData)
            .then((res) => {
                dispatch(actions.fetchingSuccess(['Пароль успешно изменен.']));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.CHANGE_PASSWORD_FETCHING}));
                return done();
            });
    }
});

export default [
    changeProfileInfo,
    changePassword
];
