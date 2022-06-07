import createAction from "../../store/createAction";

import * as C from './constants';

const getSections = createAction(C.GET_SECTIONS, 'payload');
const setSections = createAction(C.SET_SECTIONS, 'payload');
const getCurrentSections = createAction(C.GET_CURRENT_SECTIONS, 'payload');
const setCurrentSections = createAction(C.SET_CURRENT_SECTIONS, 'payload');
const deleteSection = createAction(C.DELETE_SECTION, 'payload');
const createSection = createAction(C.CREATE_SECTION, 'payload');
const sectionChangeField = createAction(C.SECTION_CHANGE_FIELD, 'payload');
const getCourses = createAction(C.GET_COURSES, 'payload');
const setCourses = createAction(C.SET_COURSES, 'payload');

export default {
    getSections,
    setSections,
    getCurrentSections,
    setCurrentSections,
    sectionChangeField,
    deleteSection,
    createSection,
    getCourses,
    setCourses
}