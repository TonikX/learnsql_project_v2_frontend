import createAction from "../../store/createAction";

import * as C from './constants';

const getCourseTasks = createAction(C.GET_COURSE_TASKS, 'payload');
const setCourseTasks = createAction(C.SET_COURSE_TASKS, 'payload');

const getCourseTask = createAction(C.GET_COURSE_TASK, 'payload');
const setCourseTask = createAction(C.SET_COURSE_TASK, 'payload');

const getCourseStatistics = createAction(C.GET_COURSE_STATISTICS, 'payload');
const setCourseStatistics = createAction(C.SET_COURSE_STATISTICS, 'payload');

const openFinishCourseModal = createAction(C.OPEN_FINISH_COURSE_MODAL, 'payload');
const closeFinishCourseModal = createAction(C.CLOSE_FINISH_COURSE_MODAL, 'payload');

const getCourseMethodicalMaterials = createAction(C.GET_COURSE_METHODICAL_MATERIALS, 'payload');
const setCourseMethodicalMaterials = createAction(C.SET_COURSE_METHODICAL_MATERIALS, 'payload');

const getCourseMethodicalMaterial = createAction(C.GET_COURSE_METHODICAL_MATERIAL, 'payload');
const setCourseMethodicalMaterial = createAction(C.SET_COURSE_METHODICAL_MATERIAL, 'payload');

const setCurrentCourseTab = createAction(C.SET_CURRENT_COURSE_TAB, 'payload');

const setCurrentTaskAnswer = createAction(C.SET_CURRENT_TASK_ANSWER, 'payload');
const removeCurrentTaskAnswer = createAction(C.REMOVE_CURRENT_TASK_ANSWER, 'payload');

const setCurrentTaskError = createAction(C.SET_CURRENT_TASK_ERROR, 'payload');
const removeCurrentTaskError = createAction(C.REMOVE_CURRENT_TASK_ERROR, 'payload');

const setCurrentTaskErrorTableData = createAction(C.SET_CURRENT_TASK_ERROR_TABLE_DATA, 'payload');
const removeCurrentTaskErrorTableData = createAction(C.REMOVE_CURRENT_TASK_ERROR_TABLE_DATA, 'payload');

const setCourseId = createAction(C.SET_COURSE_ID, 'payload');
const setCurrentRouteId = createAction(C.SET_COURSE_ROUTE_ID, 'payload');
const completeTask = createAction(C.COMPLETE_TASK, 'payload');

const setCourseTasksErrors = createAction(C.SET_COURSE_TASKS_ERRORS, 'payload');

export default {
    setCourseTasksErrors,
    setCourseId,
    getCourseTask,
    setCourseTask,
    getCourseTasks,
    setCourseTasks,
    getCourseStatistics,
    setCourseStatistics,
    getCourseMethodicalMaterials,
    setCourseMethodicalMaterials,
    getCourseMethodicalMaterial,
    setCourseMethodicalMaterial,
    setCurrentCourseTab,
    completeTask,
    setCurrentTaskError,
    removeCurrentTaskError,
    setCurrentRouteId,
    setCurrentTaskErrorTableData,
    removeCurrentTaskErrorTableData,
    setCurrentTaskAnswer,
    removeCurrentTaskAnswer,
    openFinishCourseModal,
    closeFinishCourseModal,
}