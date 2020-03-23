import createReducer from "../../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';

export const GENERAL_PATH = 'signUp';

export const initialState = {
    [Enum.USERNAME_FIELD]: '',
    [Enum.FIRST_NAME_FIELD]: '',
    [Enum.LAST_NAME_FIELD]: '',
    [Enum.GROUP_FIELD]: '',
    [Enum.PASSWORD_FIELD]: '',
    [Enum.PASSWORD_REPEAT_FIELD]: '',
};

const changeField = (state, {payload}) => ({
    ...state,
    [payload.destination]: payload.value
});


export const reducer = createReducer(initialState, {
    [C.SIGN_UP_CHANGE_FIELD]: changeField,
});