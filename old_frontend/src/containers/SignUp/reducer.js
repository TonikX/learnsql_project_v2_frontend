import createReducer from "../../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';
import {GROUPS, ORGANISATIONS, PERIODS} from "./enum";

export const GENERAL_PATH = 'signUp';

export const initialState = {
    [Enum.USERNAME_FIELD]: '',
    [Enum.FIRST_NAME_FIELD]: '',
    [Enum.LAST_NAME_FIELD]: '',
    [Enum.GROUP_FIELD]: '',
    [Enum.PASSWORD_FIELD]: '',
    [Enum.PASSWORD_REPEAT_FIELD]: '',
    [Enum.EMAIL_FIELD]: '',
    [Enum.PERIODS]: [],
    [Enum.ORGANISATIONS]: [],
    [Enum.GROUPS]: [],
};

const changeField = (state, {payload}) => ({
    ...state,
    [payload.destination]: payload.value
});

const setOrganisations = (state, {payload}) => ({
    ...state,
    [Enum.ORGANISATIONS]: payload
});

const setPeriods = (state, {payload}) => ({
    ...state,
    [Enum.PERIODS]: payload
});

const setGroups = (state, {payload}) => ({
    ...state,
    [Enum.GROUPS]: payload
});

const pageDown = () => initialState;

export const reducer = createReducer(initialState, {
    [C.SIGN_UP_CHANGE_FIELD]: changeField,
    [C.SIGN_UP_PAGE_DOWN]: pageDown,
    [C.SIGN_UP_CLEAR_ALL_FIELDS]: pageDown,
    [C.SIGN_UP_CLEAR_ALL_FIELDS]: pageDown,
    [C.SIGN_UP_SET_GROUPS]: setGroups,
    [C.SIGN_UP_SET_ORGANIZATIONS]: setOrganisations,
    [C.SIGN_UP_SET_PERIODS]: setPeriods,
});