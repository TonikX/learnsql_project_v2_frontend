import {createLogic} from "redux-logic";
import get from 'lodash/get';

import * as C from './constants';
import actions from '../../layout/actions';
import databaseActions from './actions';

import Service from './service';
import * as Enum from "./enum";
import {getFieldValue} from "./getters";

const service = new Service();

const getDatabase = createLogic({
    type: C.GET_DATABASE,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.GET_DATABASE_FETCHING}));

        service.getDatabase(action.payload)
            .then((res) => {
                dispatch(actions.fetchingSuccess());
                console.log(get(res, 'data', {}));
                dispatch(databaseActions.setDatabase(get(res, 'data', {})));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.GET_DATABASE_FETCHING}));
                return done();
            });
    }
});

const updateDatabase = createLogic({
    type: C.UPDATE_DATABASE,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();

        const title = getFieldValue(state, Enum.TITLE_FIELD);
        const description = getFieldValue(state, Enum.DESCRIPTION_FIELD);
        const source_code = getFieldValue(state, Enum.SOURCE_CODE_FIELD);

        dispatch(actions.fetchingTrue({destination: Enum.UPDATE_DATABASE_FETCHING}));

        service.updateDatabase(action.payload, title, description, source_code)
            .then((res) => {
                console.log("Обновляю бд", title, description, source_code)
                dispatch(actions.fetchingSuccess(['База данных обновлена']));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.UPDATE_DATABASE_FETCHING}));
                return done();
            });
    }
})

const deleteDatabase = createLogic({
    type: C.DELETE_DATABASE,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.DELETE_DATABASE_FETCHING}));

        service.deleteDatabase(action.payload)
            .then((res) => {
                console.log("Удаляю бд", action.payload)
                dispatch(actions.fetchingSuccess(['База данных удалена']));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.DELETE_DATABASE_FETCHING}));
                return done();
            });
    }
})

export default [
    getDatabase,
    updateDatabase,
    deleteDatabase,
];
