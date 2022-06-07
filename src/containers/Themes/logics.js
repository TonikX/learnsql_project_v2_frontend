import {createLogic} from "redux-logic";
import get from 'lodash/get';

import * as C from './constants';
import actions from '../../layout/actions';
import themeActions from './actions';

import Service from './service';
import * as Enum from "./enum";
import {getFieldValue} from "./getters";

const service = new Service();

const getThemes = createLogic({
    type: C.GET_THEMES,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.GET_THEMES_FETCHING}));

        service.getThemes(action.payload)
            .then((res) => {
                dispatch(actions.fetchingSuccess());
                dispatch(themeActions.setThemes(get(res, 'data.results', [])));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.GET_THEMES_FETCHING}));
                return done();
            });
    }
});

const getThemesCount = createLogic({
    type: C.GET_THEMES_COUNT,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.GET_THEMES_COUNT_FETCHING}));

        service.getThemesCount(action.payload)
            .then((res) => {
                dispatch(actions.fetchingSuccess());
                dispatch(themeActions.setThemesCount(get(res, 'data.count', 0)));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.GET_THEMES_COUNT_FETCHING}));
                return done();
            });
    }
});

const createTheme = createLogic({
    type: C.CREATE_THEME,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();

        const title = getFieldValue(state, Enum.TITLE_FIELD);
        const position = getFieldValue(state, Enum.POSITION_FIELD);

        dispatch(actions.fetchingTrue({destination: Enum.CREATE_THEMES_FETCHING}));

        service.createTheme(title, position)
            .then((res) => {
                console.log("Создаю тему", title)
                dispatch(actions.fetchingSuccess(['Создана тема']));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.CREATE_THEMES_FETCHING}));
                return done();
            });
    }
})

const deleteTheme = createLogic({
    type: C.DELETE_THEME,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.DELETE_THEME_FETCHING}));

        service.deleteTheme(action.payload)
            .then((res) => {
                console.log("Удаляю тему", action.payload)
                dispatch(actions.fetchingSuccess(['Тема удалена']));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.DELETE_THEME_FETCHING}));
                return done();
            });
    }
})
const updateTheme = createLogic({
    type: C.UPDATE_THEME,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();

        const title = getFieldValue(state, Enum.TITLE_FIELD);
        const position = getFieldValue(state, Enum.POSITION_FIELD);

        dispatch(actions.fetchingTrue({destination: Enum.UPDATE_THEME_FETCHING}));

        service.updateDatabase(action.payload, title, position)
            .then((res) => {
                dispatch(actions.fetchingSuccess(['Тема обновлена']));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.UPDATE_THEME_FETCHING}));
                return done();
            });
    }
})


export default [
    getThemes,
    getThemesCount,
    createTheme,
    deleteTheme,
    updateTheme,
];
