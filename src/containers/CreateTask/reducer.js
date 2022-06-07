import createReducer from "../../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';

export const GENERAL_PATH = 'create_task';

export const initialState = {
    [Enum.THEMES]: [],
    [Enum.DATABASES]: [],
    [Enum.TITLE_FIELD]: '',
    [Enum.TEXT_FIELD]: '',
    [Enum.ANSWER_FIELD]: '',
    [Enum.DATABASE_FIELD]: 0,
    [Enum.DIFFICULTY_FIELD]: 0,
    [Enum.BANNED_WORDS]: [],
    [Enum.REQUIRED_WORDS]: [],
    [Enum.NUMBER_OF_ATTEMPTS]: 10,
    [Enum.SHOULD_CHECK_RUNTIME]: false,
    [Enum.ALLOWED_RUNTIME]: 0,
    [Enum.HELP_FILED]: '',
    [Enum.THEMES_FIELD]: []
};

const setThemesField = (state, {payload}) => ({
    ...state,
    [Enum.THEMES]: payload,
});

const setDatabasesField = (state, {payload}) => ({
    ...state,
    [Enum.DATABASES]: payload,
});

const changeField = (state, {payload}) => ({
    ...state,
    [payload.destination]: payload.value
});

export const reducer = createReducer(initialState, {
    [C.SET_THEMES]: setThemesField,
    [C.TASK_CHANGE_FIELD]: changeField,
    [C.SET_DATABASES]: setDatabasesField,
});