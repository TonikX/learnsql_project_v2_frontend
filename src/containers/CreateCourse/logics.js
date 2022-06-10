import {createLogic} from "redux-logic";
import get from 'lodash/get';

import * as C from './constants';
import actions from '../../layout/actions';
import createCourseActions from './actions';

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
                dispatch(createCourseActions.setThemesField(get(res, 'data.results', [])));
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

const createCourse = createLogic({
    type: C.CREATE_COURSE,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();

        const title = getFieldValue(state, Enum.TITLE_FIELD);
        const description = getFieldValue(state, Enum.DESCRIPTION_FIELD);
        const themes = getFieldValue(state, Enum.THEMES_FIELD);
        const type = getFieldValue(state, Enum.TYPE_FIELD);
        const difficulty = getFieldValue(state, Enum.DIFFICULTY_FIELD);
        const database_type = getFieldValue(state, Enum.DATABASE_TYPE_FIELD);
        const accesibility = getFieldValue(state, Enum.ACCESIBILITY);

        dispatch(actions.fetchingTrue({destination: Enum.CREATE_COURSE_FETCHING}));

        service.createCourse(title, description, themes, type, difficulty, database_type, accesibility)
            .then((res) => {
                console.log("Создаю курс", title)
                dispatch(actions.fetchingSuccess(['Создан курс']));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.CREATE_COURSE_FETCHING}));
                return done();
            });
    }
})

export default [
    getThemesField,
    createCourse,
];
