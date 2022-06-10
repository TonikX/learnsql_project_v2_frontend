import createReducer from "../../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';

export const GENERAL_PATH = 'create_topic';

export const initialState = {
    [Enum.THEMES]: [],
    [Enum.SECTIONS]: [],
    [Enum.SECTION_FIELD]: 0,
    [Enum.NUMBER_FIELD]: '',
    [Enum.NAME_FIELD]: '',
    [Enum.CONTENT_FIELD]: '',
    [Enum.THEMES_FIELD]: [],
};

const setThemes = (state, {payload}) => ({
    ...state,
    [Enum.THEMES]: payload,
});

const setSections = (state, {payload}) => ({
    ...state,
    [Enum.SECTIONS]: payload,
});

export const reducer = createReducer(initialState, {
    [C.SET_THEMES]: setThemes,
    [C.SET_SECTIONS]: setSections,
});