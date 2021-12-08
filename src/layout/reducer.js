import createReducer from "../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';

export const GENERAL_PATH = 'main';

export const initialState = {
    [Enum.FETCHING]: {
        [Enum.REFRESH_TOKEN]: true,
    },
    [Enum.ERRORS]: [],
    [Enum.SUCCESS_MESSAGES]: [],
    [Enum.GROUP_OPTIONS]: [],
    [Enum.USER]: {},
    [Enum.IS_AUTH]: false,
};

const fetchingTrue = (state, {payload}) => ({
    ...state,
    [Enum.FETCHING]: {
        ...state[Enum.FETCHING],
        [payload.destination]: true
    },
});

const fetchingFalse = (state, {payload}) => ({
    ...state,
    [Enum.FETCHING]: {
        ...state[Enum.FETCHING],
        [payload.destination]: false
    }
});

const fetchingFailed = (state, {payload}) => ({
    ...state,
    [Enum.ERRORS]: payload,
});

const fetchingSuccess = (state, {payload}) => ({
    ...state,
    [Enum.SUCCESS_MESSAGES]: payload,
});

const setUserData = (state, {payload}) => ({
    ...state,
    [Enum.USER]: payload,
});

const setGroupOptions = (state, {payload}) => ({
    ...state,
    [Enum.GROUP_OPTIONS]: payload,
});

const setAuthTrue = (state) => ({
    ...state,
    [Enum.IS_AUTH]: true,
});

const setAuthFalse = (state) => ({
    ...state,
    [Enum.IS_AUTH]: false,
});

export const reducer = createReducer(initialState, {
    [C.FETCHING_TRUE]: fetchingTrue,
    [C.FETCHING_FALSE]: fetchingFalse,
    [C.FETCHING_FAILED]: fetchingFailed,
    [C.FETCHING_SUCCESS]: fetchingSuccess,
    [C.SET_USER_DATA]: setUserData,
    [C.SET_GROUP_OPTIONS]: setGroupOptions,
    [C.SET_AUTH_FALSE]: setAuthFalse,
    [C.SET_AUTH_TRUE]: setAuthTrue,
});