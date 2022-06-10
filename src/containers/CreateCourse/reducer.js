import createReducer from "../../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';

export const GENERAL_PATH = 'create_course';

export const initialState = {
    [Enum.THEMES]: [1],
    [Enum.TITLE_FIELD]: '',
    [Enum.DESCRIPTION_FIELD]: '',
    [Enum.THEMES_FIELD]: [],
    [Enum.TYPE_FIELD]: 1,
    [Enum.DIFFICULTY_FIELD]: 3,
    [Enum.DATABASE_TYPE_FIELD]: 0,
    [Enum.ACCESIBILITY]: true,
};

const setThemesField = (state, {payload}) => ({
    ...state,
    [Enum.THEMES]: payload,
});

const changeField = (state, {payload}) => ({
    ...state,
    [payload.destination]: payload.value
});

export const reducer = createReducer(initialState, {
    [C.SET_THEMES]: setThemesField,
    [C.COURSE_CHANGE_FIELD]: changeField,
});