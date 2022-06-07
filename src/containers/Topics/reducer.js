import createReducer from "../../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';

export const GENERAL_PATH = 'topics';

export const initialState = {
    [Enum.TOPICS]: [],
    [Enum.CURRENT_TOPICS]: []
};

const setTopics = (state, {payload}) => ({
    ...state,
    [Enum.TOPICS]: payload,
});

const setCurrentTopics = (state, {payload}) => ({
    ...state,
    [Enum.CURRENT_TOPICS]: payload,
});

export const reducer = createReducer(initialState, {
    [C.SET_TOPICS]: setTopics,
    [C.SET_CURRENT_TOPICS]: setCurrentTopics,
});