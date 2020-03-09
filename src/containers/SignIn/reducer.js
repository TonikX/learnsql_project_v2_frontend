import createReducer from "../../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';

export const GENERAL_PATH = 'signIn';

export const initialState = {
    [Enum.LOGIN_FIELD]: '',
    [Enum.PASSWORD_FIELD]: '',
};

const changeField = (state, {payload}) => {
    console.log('changeField', {
        ...state,
        [payload.destination]: payload.value
    });
    return ({
        ...state,
        [payload.destination]: payload.value
    });
};

export const reducer = createReducer(initialState, {
    [C.SIGN_IN_CHANGE_FIELD]: changeField
});