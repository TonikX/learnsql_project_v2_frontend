import createReducer from "../../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';

export const GENERAL_PATH = 'home';

export const initialState = {
    [Enum.THEMES]: [],
};

const setThemes = (state, {payload}) => ({
    ...state,
    [Enum.THEMES]: payload,
});

export const reducer = createReducer(initialState, {
    [C.SET_THEMES]: setThemes,
});