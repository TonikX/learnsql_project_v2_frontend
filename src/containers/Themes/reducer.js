import createReducer from "../../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';

export const GENERAL_PATH = 'themes';

export const initialState = {
    [Enum.THEMES]: [],
    [Enum.THEMES_COUNT]: 0,
    [Enum.TITLE_FIELD]: '',
    [Enum.POSITION_FIELD]: 0,
};

const changeField = (state, {payload}) => ({
    ...state,
    [payload.destination]: payload.value
});

const setThemes = (state, {payload}) => ({
    ...state,
    [Enum.THEMES]: payload,
});

const setThemesCount = (state, {payload}) => ({
    ...state,
    [Enum.THEMES_COUNT]: payload,
});

export const reducer = createReducer(initialState, {
    [C.SET_THEMES]: setThemes,
    [C.SET_THEMES_COUNT]: setThemesCount,
    [C.THEME_CHANGE_FIELD]: changeField,
});