import {createLogic} from "redux-logic";
import get from 'lodash/get';

import * as C from './constants';
import actions from '../../layout/actions';
import homeActions from './actions';

import Service from './service';
import * as Enum from "./enum";

const service = new Service();

const getCourses = createLogic({
    type: C.GET_COURSES,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.GET_COURSES_FETCHING}));

        service.getCourses()
            .then((res) => {
                dispatch(actions.fetchingSuccess());
                dispatch(homeActions.setCourses(get(res, 'data.results', [])));
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

const getMyCourses = createLogic({
    type: C.GET_MY_COURSES,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.GET_MY_COURSES_FETCHING}));

        service.getMyCourses()
            .then((res) => {
                dispatch(actions.fetchingSuccess());
                dispatch(homeActions.setMyCourses(get(res, 'data.results', [])));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.GET_MY_COURSES_FETCHING}));
                return done();
            });
    }
});

const joinCourse = createLogic({
    type: C.JOIN_COURSE,
    latest: true,
    process({getState, action}, dispatch, done) {
        const courseId = action.payload;

        dispatch(actions.fetchingTrue({destination: Enum.JOIN_COURSE_FETCHING}));

        service.joinCourse(courseId)
            .then((res) => {
                dispatch(actions.fetchingSuccess(['Вы успешно присоединились к курсу!']));
                dispatch(homeActions.getMyCourses());
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.JOIN_COURSE_FETCHING}));
                return done();
            });
    }
});

export default [
    getCourses,
    getMyCourses,
    joinCourse,
];
