import createReducer from "../../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';

export const GENERAL_PATH = 'courses';

export const initialState = {
    [Enum.COURSES]: [],
    [Enum.THEMES]: [],
};

const setCourses = (state, {payload}) => ({
    ...state,
    [Enum.COURSES]: payload,
});

// const setThemes = (state, {payload}) => ({
//     ...state,
//     [Enum.THEMES]: payload,
// });

export const reducer = createReducer(initialState, {
    [C.SET_COURSES]: setCourses,
});