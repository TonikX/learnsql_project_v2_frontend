import {createLogic} from "redux-logic";
import get from 'lodash/get';

import * as C from './constants';
import actions from '../../layout/actions';
import createTaskActions from './actions';

import Service from './service';
import * as Enum from "./enum";
import {getFieldValue} from "./getters";

const service = new Service();

const getThemesField = createLogic({
    type: C.GET_THEMES,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.GET_THEMES_FETCHING}));

        service.getThemesField()
            .then((res) => {
                dispatch(actions.fetchingSuccess());
                dispatch(createTaskActions.setThemesField(get(res, 'data.results', [])));
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

const getDatabasesField = createLogic({
    type: C.GET_DATABASES,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.GET_DATABASES_FETCHING}));

        service.getDatabasesField()
            .then((res) => {
                dispatch(actions.fetchingSuccess());
                dispatch(createTaskActions.setDatabasesField(get(res, 'data.results', [])));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.GET_DATABASES_FETCHING}));
                return done();
            });
    }
});

const createTask = createLogic({
    type: C.CREATE_TASK,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();

        const title = getFieldValue(state, Enum.TITLE_FIELD);
        const text = getFieldValue(state, Enum.TEXT_FIELD);
        const answer = getFieldValue(state, Enum.ANSWER_FIELD);
        const database = getFieldValue(state, Enum.DATABASE_FIELD);
        const difficulty = getFieldValue(state, Enum.DIFFICULTY_FIELD);
        const banned_words = getFieldValue(state, Enum.BANNED_WORDS);
        const required_words = getFieldValue(state, Enum.REQUIRED_WORDS);
        const number_of_attempts = getFieldValue(state, Enum.NUMBER_OF_ATTEMPTS);
        const should_check_runtime = getFieldValue(state, Enum.SHOULD_CHECK_RUNTIME);
        const allowed_runtime = getFieldValue(state, Enum.ALLOWED_RUNTIME);
        const help = getFieldValue(state, Enum.HELP_FILED);
        const themes_field = getFieldValue(state, Enum.THEMES_FIELD);

        dispatch(actions.fetchingTrue({destination: Enum.CREATE_TASK_FETCHING}));

        service.createCourse(title, text, answer, database, difficulty, banned_words, required_words, number_of_attempts,
            should_check_runtime, allowed_runtime, help, themes_field)
            .then((res) => {
                console.log("Создаю задание", title)
                dispatch(actions.fetchingSuccess(['Задание создано']));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.CREATE_TASK_FETCHING}));
                return done();
            });
    }
})

export default [
    getThemesField,
    getDatabasesField,
    createTask,
];
