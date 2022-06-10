import {createLogic} from "redux-logic";
import get from 'lodash/get';

import * as C from './constants';
import actions from '../../layout/actions';
import courseListActions from './actions';

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
                dispatch(courseListActions.setCourses(get(res, 'data.results', [])));
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

const deleteCourse = createLogic({
    type: C.DELETE_COURSE,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.DELETE_COURSE_FETCHING}));

        service.deleteCourse(action.payload)
            .then((res) => {
                console.log("Удаляю курс", action.payload)
                dispatch(actions.fetchingSuccess(['Курс удален']));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.DELETE_COURSE_FETCHING}));
                return done();
            });
    }
})

export default [
    getCourses,
    deleteCourse
];
