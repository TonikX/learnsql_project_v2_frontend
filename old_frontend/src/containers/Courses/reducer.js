import createReducer from "../../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';

export const GENERAL_PATH = 'home';

export const initialState = {
    [Enum.COURSES]: [],
    [Enum.MY_COURSES]: [],
};

const setCourses = (state, {payload}) => ({
    ...state,
    [Enum.COURSES]: payload,
});

const setMyCourses = (state, {payload}) => ({
    ...state,
    [Enum.MY_COURSES]: payload,
});

export const reducer = createReducer(initialState, {
    [C.SET_COURSES]: setCourses,
    [C.SET_MY_COURSES]: setMyCourses,
});