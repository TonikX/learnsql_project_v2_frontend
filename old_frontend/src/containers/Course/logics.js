import {createLogic} from "redux-logic";
import get from 'lodash/get';

import * as C from './constants';
import actions from '../../layout/actions';
import courseActions from './actions';

import Service from './service';
import * as Enum from "./enum";
import {
    getCourseId,
    getCurrentTaskId,
    getTaskId,
    getCurrentRouteId,
    getCurrentTaskSolution,
    getCurrentMethodicalMaterialId
} from "./getters";

const service = new Service();

const getCourseTasks = createLogic({
    type: C.GET_COURSE_TASKS,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();
        const courseId = getCourseId(state);

        if (courseId === null) return done();

        dispatch(actions.fetchingTrue({destination: Enum.GET_COURSE_TASKS_FETCHING}));

        service.getCourseTasks(courseId)
            .then((res) => {
                const tasks = get(res, 'data.results', []);
                const firstTaskId = getTaskId(tasks[0]);
                const currentTask = getCurrentTaskId(state);

                dispatch(courseActions.setCourseTasks(tasks));

                if (!currentTask){
                    dispatch(courseActions.getCourseTask(firstTaskId));
                    dispatch(courseActions.setCurrentRouteId(get(tasks, '0.id', null)));
                }
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.GET_COURSE_TASKS_FETCHING}));
                return done();
            });
    }
});

const getCourseTask = createLogic({
    type: C.GET_COURSE_TASK,
    latest: true,
    process({getState, action}, dispatch, done) {
        const taskId = action.payload;

        if (taskId === null) return done();

        dispatch(actions.fetchingTrue({destination: Enum.GET_COURSE_TASK_FETCHING}));

        dispatch(courseActions.setCurrentTaskError(null));
        dispatch(courseActions.setCurrentTaskErrorTableData({}));
        dispatch(courseActions.setCurrentTaskAnswer([]));

        service.getCourseTask(taskId)
            .then((res) => {
                dispatch(courseActions.setCourseTask(res.data));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.GET_COURSE_TASK_FETCHING}));
                return done();
            });
    }
});

const getCourseMethodicalMaterials = createLogic({
    type: C.GET_COURSE_METHODICAL_MATERIALS,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();
        const courseId = getCourseId(state);
        const subMaterial = getCurrentMethodicalMaterialId(state);

        if (courseId === null) return done();

        dispatch(actions.fetchingTrue({destination: Enum.GET_COURSE_METHODICAL_MATERIALS_FETCHING}));

        service.getCourseMethodicalMaterials(courseId)
            .then((res) => {
                const materials = get(res, 'data');
                const materialId = get(materials, [0, 'topics_of_this_section', 0,'id']);

                if (!subMaterial || subMaterial.length === 0){
                    dispatch(courseActions.getCourseMethodicalMaterial(materialId));
                }

                dispatch(courseActions.setCourseMethodicalMaterials(materials));
                dispatch(actions.fetchingSuccess());
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.GET_COURSE_METHODICAL_MATERIALS_FETCHING}));
                return done();
            });
    }
});

const getCourseMethodicalMaterial = createLogic({
    type: C.GET_COURSE_METHODICAL_MATERIAL,
    latest: true,
    process({getState, action}, dispatch, done) {
        const materialId = action.payload;

        if (!materialId) return done();

        dispatch(actions.fetchingTrue({destination: Enum.GET_COURSE_METHODICAL_MATERIAL_FETCHING}));

        service.getCourseMethodicalMaterial(materialId)
            .then((res) => {
                dispatch(courseActions.setCourseMethodicalMaterial(res.data));
                dispatch(actions.fetchingSuccess());
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.GET_COURSE_METHODICAL_MATERIAL_FETCHING}));
                return done();
            });
    }
});

const getCourseStatistics = createLogic({
    type: C.GET_COURSE_STATISTICS,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();
        const courseId = getCourseId(state);

        if (courseId === null) return done();

        dispatch(actions.fetchingTrue({destination: Enum.GET_COURSE_STATISTICS_FETCHING}));

        service.getCourseStatistics(courseId)
            .then((res) => {
                dispatch(courseActions.setCourseStatistics(res.data));
                dispatch(actions.fetchingSuccess());
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.GET_COURSE_STATISTICS_FETCHING}));
                return done();
            });
    }
});

const completeTask = createLogic({
    type: C.COMPLETE_TASK,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();
        const answer = action.payload;
        const routeId = getCurrentRouteId(state);
        const currentTaskId = getCurrentTaskId(state);
        const currentTaskSolution = getCurrentTaskSolution(state);

        if (currentTaskId === null || routeId === null) return done();

        dispatch(actions.fetchingTrue({destination: Enum.COMPLETE_TASK_FETCHING}));

        service.completeTask(routeId, currentTaskId, answer)
            .then((res) => {
                dispatch(actions.fetchingFalse({destination: Enum.COMPLETE_TASK_FETCHING}));
                dispatch(courseActions.removeCurrentTaskErrorTableData());
                dispatch(courseActions.removeCurrentTaskAnswer());

                const data = get(res, 'data', {});
                const progres = get(data, 'progres', 0);

                if (data.status === 'error'){
                    dispatch(courseActions.setCurrentTaskErrorTableData({
                        [Enum.ERROR_REF_RESULT]: get(data, Enum.ERROR_REF_RESULT, []),
                        [Enum.ERROR_STUDENT_RESULT]: get(data, Enum.ERROR_STUDENT_RESULT, []),
                    }));

                    dispatch(courseActions.setCourseTasksErrors({taskId: currentTaskId, courseId: routeId, message: data.message, answer}));
                } else {
                    if (progres === 1 && currentTaskSolution.length === 0){
                        dispatch(courseActions.openFinishCourseModal());
                    }

                    // dispatch(courseActions.setCourseTasksErrors({taskId: currentTaskId, courseId: routeId, message: 'Задание успешно выполнено!', answer}));
                    dispatch(actions.fetchingSuccess(['Задание успешно выполнено!']));
                    dispatch(courseActions.setCurrentTaskAnswer(get(data, 'student_result.1.1', [])));
                    dispatch(courseActions.removeCurrentTaskErrorTableData());
                    dispatch(courseActions.getCourseTasks());
                }

                dispatch(courseActions.removeCurrentTaskError());
            })
            .catch((err) => {
                dispatch(actions.fetchingFalse({destination: Enum.COMPLETE_TASK_FETCHING}));
                dispatch(courseActions.removeCurrentTaskErrorTableData());
                dispatch(courseActions.removeCurrentTaskAnswer());

                const error = get(err, '0', '');
                const errorMessage = get(error.split(","),'1', '');

                if (errorMessage.length > 0){
                    const message = errorMessage.replace(/[^A-Za-zА-Яа-яЁё\s]/g, "");

                    dispatch(courseActions.setCurrentTaskError(message));

                    dispatch(courseActions.setCourseTasksErrors({taskId: currentTaskId, courseId: routeId, message, answer}));

                    dispatch(actions.fetchingFailed([message]));
                }

                dispatch(courseActions.removeCurrentTaskErrorTableData());
            })
            .then(() => {
                return done();
            });
    }
});

export default [
    getCourseTask,
    getCourseTasks,
    getCourseMethodicalMaterial,
    getCourseMethodicalMaterials,
    getCourseStatistics,
    completeTask,
];
