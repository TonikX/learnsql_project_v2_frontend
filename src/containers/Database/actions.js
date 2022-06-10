import createAction from "../../store/createAction";

import * as C from './constants';

const getDatabase = createAction(C.GET_DATABASE, 'payload');
const setDatabase = createAction(C.SET_DATABASE, 'payload');
const updateDatabase = createAction(C.UPDATE_DATABASE, 'payload');
const deleteDatabase = createAction(C.DELETE_DATABASE, 'payload');
const databaseChangeField = createAction(C.DATABASE_CHANGE_FIELD, 'payload');

export default {
    getDatabase,
    setDatabase,
    updateDatabase,
    deleteDatabase,
    databaseChangeField,
}