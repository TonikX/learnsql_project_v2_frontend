import {createLogic} from "redux-logic";

import * as C from './constants';
import actions from '../../layout/actions';

import Service from './service';
import * as Enum from "./enum";
import {getFieldValue} from "./getters";

const service = new Service();

const createDatabase = createLogic({
    type: C.CREATE_DATABASE,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();

        const title = getFieldValue(state, Enum.TITLE_FIELD);
        const description = getFieldValue(state, Enum.DESCRIPTION_FIELD);
        const source_code = getFieldValue(state, Enum.SOURCE_CODE_FIELD);

        dispatch(actions.fetchingTrue({destination: Enum.CREATE_DATABASE_FETCHING}));

        service.createDatabase(title, description, source_code)
            .then((res) => {
                console.log("Создаю бд", title)
                dispatch(actions.fetchingSuccess(['Создана база данных']));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.CREATE_DATABASE_FETCHING}));
                return done();
            });
    }
})

export default [
    createDatabase,
];
