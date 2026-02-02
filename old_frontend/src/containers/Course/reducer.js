import createReducer from "../../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';

export const GENERAL_PATH = 'course';

export const initialState = {
    [Enum.TASKS]: [],
    [Enum.CURRENT_TASK_ERROR]: null,
    [Enum.COURSE_ROUTE_ID]: null,
    [Enum.CURRENT_TASK_ERROR_TABLE_DATA]: {},
    [Enum.METHODICAL_SUB_MATERIAL]: '',
    [Enum.CURRENT_COURSE_TAB]: 0,
    [Enum.COURSE_TASKS_ERRORS]: [],
};


const setCourseRouteId = (state, {payload}) => ({
    ...state,
    [Enum.COURSE_ROUTE_ID]: payload,
});

const setCourseId = (state, {payload}) => ({
    ...state,
    [Enum.COURSE_ID]: payload,
});

const setCourseTasks = (state, {payload}) => ({
    ...state,
    [Enum.TASKS]: payload,
});

const setCourseTask = (state, {payload}) => ({
    ...state,
    [Enum.CURRENT_TASK]: payload,
});

const setCourseMethodicalMaterials = (state, {payload}) => ({
    ...state,
    [Enum.METHODICAL_MATERIALS]: payload,
});
const setCurrentMethodicalMaterial = (state, {payload}) => ({
    ...state,
    [Enum.METHODICAL_MATERIAL]: payload,
});
const setMaterialId = (state, {payload}) => ({
    ...state,
    [Enum.METHODICAL_MATERIAL]: {id: payload},
});
const setCurrentMethodicalSubMaterial = (state, {payload}) => ({
    ...state,
    [Enum.METHODICAL_SUB_MATERIAL]: payload,
});


const setCurrentCourseTab = (state, {payload}) => ({
    ...state,
    [Enum.CURRENT_COURSE_TAB]: payload,
});

const setCourseStatistics = (state, {payload}) => ({
    ...state,
    [Enum.STATISTICS]: payload,
});

const setCourseTaskError = (state, {payload}) => ({
    ...state,
    [Enum.CURRENT_TASK_ERROR]: payload,
});
const removeCurrentTaskError = (state) => ({
    ...state,
    [Enum.CURRENT_TASK_ERROR]: null,
});

const setCourseTaskErrorTableData = (state, {payload}) => ({
    ...state,
    [Enum.CURRENT_TASK_ERROR_TABLE_DATA]: payload,
});
const removeCurrentTaskErrorTableData = (state) => ({
    ...state,
    [Enum.CURRENT_TASK_ERROR_TABLE_DATA]: {},
});

const setCourseTaskAnswer = (state, {payload}) => ({
    ...state,
    [Enum.CURRENT_TASK_ANSWER]: payload,
});
const removeCourseTaskAnswer = (state) => ({
    ...state,
    [Enum.CURRENT_TASK_ANSWER]: {},
});

const openFinishCourseModal = (state) => ({
    ...state,
    [Enum.IS_OPEN_FINISH_COURSE_MODAL]: true,
});
const closeFinishCourseModal = (state) => ({
    ...state,
    [Enum.IS_OPEN_FINISH_COURSE_MODAL]: false,
});

const setCourseTasksErrors = (state, {payload}) => ({
    ...state,
    [Enum.COURSE_TASKS_ERRORS]: {
        ...state[Enum.COURSE_TASKS_ERRORS],
        [payload.courseId]: {
            ...state[Enum.COURSE_TASKS_ERRORS][payload.courseId] || {},
            [payload.taskId]: [
                ...state[Enum.COURSE_TASKS_ERRORS][payload.courseId]?.[payload.taskId] || [],
                {
                    message: payload.message,
                    answer: payload.answer
                }
            ]
        }
    },
});

export const reducer = createReducer(initialState, {
    [C.SET_CURRENT_TASK_ERROR]: setCourseTaskError,
    [C.REMOVE_CURRENT_TASK_ERROR]: removeCurrentTaskError,
    [C.SET_COURSE_TASKS]: setCourseTasks,
    [C.SET_COURSE_TASK]: setCourseTask,
    [C.SET_COURSE_METHODICAL_MATERIALS]: setCourseMethodicalMaterials,
    [C.SET_COURSE_METHODICAL_MATERIAL]: setCurrentMethodicalMaterial,
    [C.SET_COURSE_METHODICAL_SUB_MATERIAL]: setCurrentMethodicalSubMaterial,
    [C.SET_CURRENT_COURSE_TAB]: setCurrentCourseTab,
    [C.SET_COURSE_STATISTICS]: setCourseStatistics,
    [C.SET_COURSE_ID]: setCourseId,
    [C.SET_COURSE_ROUTE_ID]: setCourseRouteId,
    [C.SET_CURRENT_TASK_ERROR_TABLE_DATA]: setCourseTaskErrorTableData,
    [C.REMOVE_CURRENT_TASK_ERROR_TABLE_DATA]: removeCurrentTaskErrorTableData,
    [C.SET_CURRENT_TASK_ANSWER]: setCourseTaskAnswer,
    [C.REMOVE_CURRENT_TASK_ANSWER]: removeCourseTaskAnswer,
    [C.OPEN_FINISH_COURSE_MODAL]: openFinishCourseModal,
    [C.CLOSE_FINISH_COURSE_MODAL]: closeFinishCourseModal,
    [C.GET_COURSE_METHODICAL_MATERIAL]: setMaterialId,
    [C.SET_COURSE_TASKS_ERRORS]: setCourseTasksErrors,
});