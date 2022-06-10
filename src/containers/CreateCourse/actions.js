import createAction from "../../store/createAction";

import * as C from './constants';

const createCourse = createAction(C.CREATE_COURSE, 'payload');
const courseChangeField = createAction(C.COURSE_CHANGE_FIELD, 'payload');
const getThemesField = createAction(C.GET_THEMES, 'payload');
const setThemesField = createAction(C.SET_THEMES, 'payload');

export default {
    createCourse,
    courseChangeField,
    getThemesField,
    setThemesField,
}