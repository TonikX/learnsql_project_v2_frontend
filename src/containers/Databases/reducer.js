import createReducer from "../../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';

export const GENERAL_PATH = 'databases';

export const initialState = {
    [Enum.DATABASES]: [],
    [Enum.CURRENT_DATABASES]: []
};

const setDatabases = (state, {payload}) => ({
    ...state,
    [Enum.DATABASES]: payload,
});

const setCurrentDatabases = (state, {payload}) => ({
    ...state,
    [Enum.CURRENT_DATABASES]: payload,
});

export const reducer = createReducer(initialState, {
    [C.SET_DATABASES]: setDatabases,
    [C.SET_CURRENT_DATABASES]: setCurrentDatabases,
});