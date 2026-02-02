import {createLogic} from "redux-logic";

import * as C from './constants';
import resetPasswordActions from './actions';
import actions from '../../layout/actions';

import Service from './service';

import {getFieldValue} from "./getters";
import * as Enum from "./enum";

const service = new Service();

const resetPassword = createLogic({
    type: C.RESET_PASSWORD,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();

        const email = getFieldValue(state, Enum.EMAIL_FIELD);

        dispatch(actions.fetchingTrue({destination: Enum.RESET_PASSWORD_FETCHING}));

        service.resetPassword(email)
            .then((res) => {
                dispatch(actions.fetchingSuccess(['Проверьте почту']));
                dispatch(resetPasswordActions.resetPasswordChangeField({
                    destination: Enum.EMAIL_FIELD,
                    value: ''
                }));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.RESET_PASSWORD_FETCHING}));
                return done();
            });
    }
});

const confirmNewPassword = createLogic({
    type: C.CONFIRM_NEW_PASSWORD,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();

        const password = getFieldValue(state, Enum.NEW_PASSWORD_FIELD);
        const repeatPassword = getFieldValue(state, Enum.REPEAT_NEW_PASSWORD_FIELD);
        const token = getFieldValue(state, Enum.TOKEN);
        const uid = getFieldValue(state, Enum.UID);

        dispatch(actions.fetchingTrue({destination: Enum.CONFIRM_NEW_PASSWORD_FETCHING}));

        service.confirmNewPassword(password, repeatPassword, token, uid)
            .then((res) => {
                dispatch(actions.fetchingSuccess(['Вы успешно изменили пароль']));
                dispatch(resetPasswordActions.resetPasswordChangeField({
                    destination: Enum.REPEAT_NEW_PASSWORD_FIELD,
                    value: ''
                }));
                dispatch(resetPasswordActions.resetPasswordChangeField({
                    destination: Enum.NEW_PASSWORD_FIELD,
                    value: ''
                }));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.CONFIRM_NEW_PASSWORD_FETCHING}));
                return done();
            });
    }
});

export default [
    resetPassword,
    confirmNewPassword
];
