import {createLogic} from "redux-logic";
import get from 'lodash/get';

import * as C from './constants';
import actions from '../../layout/actions';
import tasksActions from './actions';

import Service from './service';
import * as Enum from "./enum";

const service = new Service();

const getTasks = createLogic({
    type: C.GET_TASKS,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.GET_TASKS_FETCHING}));

        service.getTasks(action.payload)
            .then((res) => {
                dispatch(actions.fetchingSuccess());
                console.log(get(res, 'data.results', []))
                dispatch(tasksActions.setTasks(get(res, 'data.results', [])));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.GET_TASKS_FETCHING}));
                return done();
            });
    }
});

const getTasksCount = createLogic({
    type: C.GET_TASKS_COUNT,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.GET_TASKS_COUNT_FETCHING}));

        service.getTasksCount()
            .then((res) => {
                dispatch(actions.fetchingSuccess());
                console.log(get(res, 'data.count', 0));
                dispatch(tasksActions.setTasksCount(get(res, 'data.count', 0)));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.GET_TASKS_COUNT_FETCHING}));
                return done();
            });
    }
});

const deleteTask = createLogic({
    type: C.DELETE_TASK,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.DELETE_TASK_FETCHING}));

        service.deleteTask(action.payload)
            .then((res) => {
                console.log("Удаляю задание", action.payload)
                dispatch(actions.fetchingSuccess(['Задание удалено']));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.DELETE_TASK_FETCHING}));
                return done();
            });
    }
})

export default [
    getTasks,
    getTasksCount,
    deleteTask
];
