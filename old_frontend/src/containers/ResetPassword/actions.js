import createAction from "../../store/createAction";

import * as C from './constants';

const resetPasswordChangeField = createAction(C.RESET_PASSWORD_CHANGE_FIELD, 'payload');
const resetPassword = createAction(C.RESET_PASSWORD, 'payload');
const confirmNewPassword = createAction(C.CONFIRM_NEW_PASSWORD, 'payload');

const resetPasswordPageDown = createAction(C.RESET_PASSWORD_PAGE_DOWN, 'payload');

export default {
    resetPasswordChangeField,
    resetPassword,
    confirmNewPassword,
    resetPasswordPageDown,
}