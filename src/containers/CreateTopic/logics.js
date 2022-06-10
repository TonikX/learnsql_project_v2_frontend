import {createLogic} from "redux-logic";
import get from 'lodash/get';

import * as C from './constants';
import actions from '../../layout/actions';
import topicsActions from './actions';

import Service from './service';
import * as Enum from "./enum";
import {getFieldValue} from "../CreateCourse/getters";

const service = new Service();

const getThemes = createLogic({
    type: C.GET_THEMES,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.GET_THEMES_FETCHING}));

        service.getThemes()
            .then((res) => {
                dispatch(actions.fetchingSuccess());
                dispatch(topicsActions.setThemes(get(res, 'data.results', [])));
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

const getSections = createLogic({
    type: C.GET_SECTIONS,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.GET_SECTIONS_FETCHING}));

        service.getSections()
            .then((res) => {
                dispatch(actions.fetchingSuccess());
                dispatch(topicsActions.setSections(get(res, 'data.results', [])));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.GET_SECTIONS_FETCHING}));
                return done()
            });
    }
});

const createTopic = createLogic({
    type: C.CREATE_TOPIC,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();

        const section = getFieldValue(state, Enum.SECTION_FIELD);
        const number = getFieldValue(state, Enum.NUMBER_FIELD);
        const name = getFieldValue(state, Enum.NAME_FIELD);
        const content = getFieldValue(state, Enum.CONTENT_FIELD);
        const themes = getFieldValue(state, Enum.THEMES_FIELD);

        dispatch(actions.fetchingTrue({destination: Enum.CREATE_TOPIC_FETCHING}));

        service.createCourse(section, number, name, content, themes)
            .then((res) => {
                console.log("Создаю топик", name)
                dispatch(actions.fetchingSuccess(['Создана тема']));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.CREATE_TOPIC_FETCHING}));
                return done();
            });
    }
});

export default [
    getThemes,
    getSections,
    createTopic,
];
