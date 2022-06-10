import createAction from "../../store/createAction";

import * as C from './constants';

const createTask = createAction(C.CREATE_TASK, 'payload');
const taskChangeField = createAction(C.TASK_CHANGE_FIELD, 'payload');
const getThemesField = createAction(C.GET_THEMES, 'payload');
const setThemesField = createAction(C.SET_THEMES, 'payload');
const getDatabasesField = createAction(C.GET_DATABASES, 'payload');
const setDatabasesField = createAction(C.SET_DATABASES, 'payload');

export default {
    createTask,
    taskChangeField,
    getThemesField,
    setThemesField,
    getDatabasesField,
    setDatabasesField
}