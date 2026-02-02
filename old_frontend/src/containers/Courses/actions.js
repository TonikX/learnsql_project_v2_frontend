import createAction from "../../store/createAction";

import * as C from './constants';

const getCourses = createAction(C.GET_COURSES, 'payload');
const setCourses = createAction(C.SET_COURSES, 'payload');

const getMyCourses = createAction(C.GET_MY_COURSES, 'payload');
const setMyCourses = createAction(C.SET_MY_COURSES, 'payload');

const joinCourse = createAction(C.JOIN_COURSE, 'payload');

export default {
    getCourses,
    setCourses,
    getMyCourses,
    setMyCourses,
    joinCourse,
}