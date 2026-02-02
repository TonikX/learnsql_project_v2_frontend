import createAction from "../../store/createAction";

import * as C from './constants';

const signUpChangeField = createAction(C.SIGN_UP_CHANGE_FIELD, 'payload');
const signUpPageDown = createAction(C.SIGN_UP_PAGE_DOWN, 'payload');
const signUpClearAllFields = createAction(C.SIGN_UP_CLEAR_ALL_FIELDS, 'payload');

const signUpGetOrganizations = createAction(C.SIGN_UP_GET_ORGANIZATIONS, 'payload');
const signUpSetOrganizations = createAction(C.SIGN_UP_SET_ORGANIZATIONS, 'payload');

const signUpGetPeriods = createAction(C.SIGN_UP_GET_PERIODS, 'payload');
const signUpSetPeriods = createAction(C.SIGN_UP_SET_PERIODS, 'payload');

const signUpGetGroups = createAction(C.SIGN_UP_GET_GROUPS, 'payload');
const signUpSetGroups = createAction(C.SIGN_UP_SET_GROUPS, 'payload');

const signUp = createAction(C.SIGN_UP, 'payload');

export default {
    signUpChangeField,
    signUp,
    signUpPageDown,
    signUpClearAllFields,
    signUpGetOrganizations,
    signUpSetOrganizations,
    signUpGetPeriods,
    signUpSetPeriods,
    signUpGetGroups,
    signUpSetGroups,
}