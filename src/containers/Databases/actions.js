import createAction from "../../store/createAction";

import * as C from './constants';

const getDatabases = createAction(C.GET_DATABASES, 'payload');
const getCurrentDatabases = createAction(C.GET_CURRENT_DATABASES, 'payload');
const setCurrentDatabases = createAction(C.SET_CURRENT_DATABASES, 'payload');
const setDatabases = createAction(C.SET_DATABASES, 'payload');
const deleteDatabase = createAction(C.DELETE_DATABASE, 'payload');

export default {
    getDatabases,
    getCurrentDatabases,
    setDatabases,
    deleteDatabase,
    setCurrentDatabases
}