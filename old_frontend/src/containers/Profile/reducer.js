import createReducer from "../../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';

export const GENERAL_PATH = 'profile';

export const initialState = {
    [Enum.USERNAME_FIELD]: '',
    [Enum.FIRST_NAME_FIELD]: '',
    [Enum.LAST_NAME_FIELD]: '',
    [Enum.GROUP_FIELD]: '',
    [Enum.OLD_PASSWORD_FIELD]: '',
    [Enum.PASSWORD_FIELD]: '',
    [Enum.PASSWORD_REPEAT_FIELD]: '',
};

const changeField = (state, {payload}) => ({
    ...state,
    [payload.destination]: payload.value
});

export const reducer = createReducer(initialState, {
    [C.CHANGE_PROFILE_FIELD]: changeField,
});