import get from 'lodash/get';
import {GENERAL_PATH} from "./reducer";
import * as Enum from './enum';

const getStateData = (state) => get(state, GENERAL_PATH, {});
export const getCourseId = (state) => get(getStateData(state), Enum.COURSE_ID, '');



export const isOpenCourseFinishModal = (state) => get(getStateData(state), Enum.IS_OPEN_FINISH_COURSE_MODAL, false);
export const getCurrentCourseTab = (state) => get(getStateData(state), Enum.CURRENT_COURSE_TAB, 0);


export const getCourseTasksErrors = (state) => get(getStateData(state), Enum.COURSE_TASKS_ERRORS, []);
export const getTasks = (state) => get(getStateData(state), Enum.TASKS, '');
export const getCurrentTask = (state) => get(getStateData(state), Enum.CURRENT_TASK, {});
export const getCurrentTaskError = (state) => get(getStateData(state), Enum.CURRENT_TASK_ERROR, null);
export const getCurrentTaskAnswer = (state) => get(getStateData(state), Enum.CURRENT_TASK_ANSWER, []);
export const getCurrentTaskErrorTableData = (state) => get(getStateData(state), Enum.CURRENT_TASK_ERROR_TABLE_DATA, {});
export const getCurrentTaskId = (state) => get(getCurrentTask(state), 'id');
export const getCurrentRouteId = (state) => get(getStateData(state), Enum.COURSE_ROUTE_ID, '');
export const getThemes = (state) => get(getCurrentTask(state), 'themes', []);

export const getNextRoute = (state) => {
    const tasks = getTasks(state);
    const currentRouteId = getCurrentRouteId(state);
    let lastRouteId;
    let nextRoute = {};

    tasks.forEach(route => {
        if (lastRouteId === currentRouteId){
            nextRoute = route;
        }
        lastRouteId = route.id;
    });

    return nextRoute;
}


export const getCurrentRoute = (state) => get(getTasks(state).filter(route => route.id === getCurrentRouteId(state)), '0', {});
export const getCurrentTaskSolution = (state) => get(getCurrentRoute(state), 'solution', '') || '';
export const getTaskId = (task) => get(task, 'task_in_set.task', null);



export const getStatistics = (state) => get(getStateData(state), Enum.STATISTICS, {});



export const getMethodicalMaterials = (state) => get(getStateData(state), Enum.METHODICAL_MATERIALS, []);
export const getCurrentMethodicalMaterial = (state) => get(getStateData(state), Enum.METHODICAL_MATERIAL, {});
export const getCurrentMethodicalMaterialId = (state) => get(getCurrentMethodicalMaterial(state),'id', null);