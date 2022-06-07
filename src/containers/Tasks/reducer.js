import createReducer from "../../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';

export const GENERAL_PATH = 'tasks';

export const initialState = {
    [Enum.TASKS]: [],
    [Enum.TASKS_COUNT]: [],
};

const setTasks = (state, {payload}) => ({
    ...state,
    [Enum.TASKS]: payload,
});

const setTasksCount = (state, {payload}) => ({
    ...state,
    [Enum.TASKS_COUNT]: payload,
});

export const reducer = createReducer(initialState, {
    [C.SET_TASKS]: setTasks,
    [C.SET_TASKS_COUNT]: setTasksCount,
});