import createAction from "../../store/createAction";

import * as C from './constants';

const getCourses = createAction(C.GET_COURSES, 'payload');
const setCourses = createAction(C.SET_COURSES, 'payload');
const deleteCourse = createAction(C.DELETE_COURSE, 'payload');

export default {
    getCourses,
    setCourses,
    deleteCourse,
}