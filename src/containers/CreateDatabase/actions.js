import createAction from "../../store/createAction";

import * as C from './constants';

const createDatabase = createAction(C.CREATE_DATABASE, 'payload');
const databaseChangeField = createAction(C.DATABASE_CHANGE_FIELD, 'payload');

export default {
    createDatabase,
    databaseChangeField,
}