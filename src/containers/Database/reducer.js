import createReducer from "../../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';

export const GENERAL_PATH = 'database';

export const initialState = {
    [Enum.DATABASE]: {},
    [Enum.TITLE_FIELD]: '',
    [Enum.DESCRIPTION_FIELD]: '',
    [Enum.SOURCE_CODE_FIELD]: '',
};

const changeField = (state, {payload}) => ({
    ...state,
    [payload.destination]: payload.value
});

const setDatabase = (state, {payload}) => ({
    ...state,
    [Enum.DATABASE]: payload,
});
export const reducer = createReducer(initialState, {
    [C.SET_DATABASE]: setDatabase,
    [C.DATABASE_CHANGE_FIELD]: changeField,
});