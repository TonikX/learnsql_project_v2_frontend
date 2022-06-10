import {createLogic} from "redux-logic";
import get from 'lodash/get';

import * as C from './constants';
import actions from '../../layout/actions';
import sectionsActions from './actions';

import Service from './service';
import * as Enum from "./enum";
import {getFieldValue} from "../Themes/getters";
import homeActions from "../Courses/actions";
import courseListActions from "../CoursesList/actions";

const service = new Service();

const getSections = createLogic({
    type: C.GET_SECTIONS,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.GET_SECTIONS_FETCHING}));

        service.getSections()
            .then((res) => {
                dispatch(actions.fetchingSuccess());
                dispatch(sectionsActions.setSections(get(res, 'data.results', [])));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.GET_SECTIONS_FETCHING}));
                return done();
            });
    }
});

const getCurrentSections = createLogic({
    type: C.GET_CURRENT_SECTIONS,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.GET_CURRENT_SECTIONS_FETCHING}));

        service.getCurrentSections(action.payload.page)
            .then((res) => {
                dispatch(actions.fetchingSuccess());
                console.log(get(res, 'data.results', []));
                dispatch(sectionsActions.setCurrentSections(get(res, 'data.results', [])));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.GET_CURRENT_SECTIONS_FETCHING}));
                return done();
            });
    }
});

const getCourses = createLogic({
    type: C.GET_COURSES,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.GET_COURSES_FETCHING}));

        service.getCourses()
            .then((res) => {
                dispatch(actions.fetchingSuccess());
                dispatch(sectionsActions.setCourses(get(res, 'data.results', [])));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.GET_COURSES_FETCHING}));
                return done();
            });
    }
});

const deleteSection = createLogic({
    type: C.DELETE_SECTION,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.DELETE_SECTION_FETCHING}));

        service.deleteSection(action.payload)
            .then((res) => {
                console.log("Удаляю секцию", action.payload)
                dispatch(actions.fetchingSuccess(['Секция удалена']));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.DELETE_SECTION_FETCHING}));
                return done();
            });
    }
})

const createSection = createLogic({
    type: C.CREATE_SECTION,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();

        const number = getFieldValue(state, Enum.NUMBER_FIELD);
        const section_name = getFieldValue(state, Enum.SECTION_NAME_FIELD);
        const course = getFieldValue(state, Enum.COURSE_FIELD);

        dispatch(actions.fetchingTrue({destination: Enum.CREATE_SECTION_FETCHING}));

        service.createSection(number, section_name, course)
            .then((res) => {
                console.log("Создаю секцию", section_name)
                dispatch(actions.fetchingSuccess(['Секция создана']));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.CREATE_SECTION_FETCHING}));
                return done();
            });
    }
})

export default [
    getSections,
    getCurrentSections,
    deleteSection,
    createSection,
    getCourses
];
