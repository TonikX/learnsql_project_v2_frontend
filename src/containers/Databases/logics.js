import {createLogic} from "redux-logic";
import get from 'lodash/get';

import * as C from './constants';
import actions from '../../layout/actions';
import databasesActions from './actions';

import Service from './service';
import * as Enum from "./enum";

const service = new Service();

const getDatabases = createLogic({
    type: C.GET_DATABASES,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.GET_DATABASES_FETCHING}));

        service.getDatabases()
            .then((res) => {
                dispatch(actions.fetchingSuccess());
                dispatch(databasesActions.setDatabases(get(res, 'data.results', [])));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.GET_DATABASES_FETCHING}));
                return done();
            });
    }
});

const getCurrentDatabases = createLogic({
    type: C.GET_CURRENT_DATABASES,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.GET_CURRENT_DATABASES_FETCHING}));

        service.getCurrentDatabases(action.payload)
            .then((res) => {
                dispatch(actions.fetchingSuccess());
                dispatch(databasesActions.setCurrentDatabases(get(res, 'data.results', [])));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.GET_CURRENT_DATABASES_FETCHING}));
                return done();
            });
    }
});

const deleteDatabase = createLogic({
    type: C.DELETE_DATABASE,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.DELETE_DATABASE_FETCHING}));

        service.deleteDatabase(action.payload)
            .then((res) => {
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
    getDatabases,
    deleteDatabase,
    getCurrentDatabases,
];
