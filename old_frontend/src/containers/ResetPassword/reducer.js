import createReducer from "../../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';

export const GENERAL_PATH = 'resetPassword';

export const initialState = {
    [Enum.NEW_PASSWORD_FIELD]: '',
    [Enum.REPEAT_NEW_PASSWORD_FIELD]: '',
    [Enum.TOKEN]: '',
};

const changeField = (state, {payload}) => ({
    ...state,
    [payload.destination]: payload.value
});

const pageDown = () => initialState;

export const reducer = createReducer(initialState, {
    [C.RESET_PASSWORD_CHANGE_FIELD]: changeField,
    [C.RESET_PASSWORD_PAGE_DOWN]: pageDown
});