import createAction from "../../store/createAction";

import * as C from './constants';

const getTasks = createAction(C.GET_TASKS, 'payload');
const setTasks = createAction(C.SET_TASKS, 'payload');
const getTasksCount = createAction(C.GET_TASKS_COUNT, 'payload');
const setTasksCount = createAction(C.SET_TASKS_COUNT, 'payload');
const deleteTask = createAction(C.DELETE_TASK, 'payload');

export default {
    getTasks,
    getTasksCount,
    setTasks,
    setTasksCount,
    deleteTask
}