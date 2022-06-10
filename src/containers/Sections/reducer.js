import createReducer from "../../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';

export const GENERAL_PATH = 'sections';

export const initialState = {
    [Enum.SECTIONS]: [],
    [Enum.COURSES]: [],
    [Enum.CURRENT_SECTIONS]: [],
    [Enum.NUMBER_FIELD]: 0,
    [Enum.SECTION_NAME_FIELD]: '',
    [Enum.COURSE_FIELD]: [],
};

const changeField = (state, {payload}) => ({
    ...state,
    [payload.destination]: payload.value
});

const setSections = (state, {payload}) => ({
    ...state,
    [Enum.SECTIONS]: payload,
});

const setCourses = (state, {payload}) => ({
    ...state,
    [Enum.COURSES]: payload,
});

const setCurrentSections = (state, {payload}) => ({
    ...state,
    [Enum.CURRENT_SECTIONS]: payload,
});

export const reducer = createReducer(initialState, {
    [C.SET_SECTIONS]: setSections,
    [C.SET_COURSES]: setCourses,
    [C.SET_CURRENT_SECTIONS]: setCurrentSections,
    [C.SECTION_CHANGE_FIELD]: changeField,
});