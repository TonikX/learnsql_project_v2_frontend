import {createLogic} from "redux-logic";
import get from 'lodash/get';

import * as C from './constants';
import actions from '../../layout/actions';
import homeActions from './actions';

import Service from './service';
import * as Enum from "./enum";

const service = new Service();

const getThemes = createLogic({
    type: C.GET_THEMES,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.GET_THEMES_FETCHING}));

        service.getThemes()
            .then((res) => {
                dispatch(actions.fetchingSuccess());
                dispatch(homeActions.setCourses(get(res, 'data.results', [])));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.GET_THEMES_FETCHING}));
                return done();
            });
    }
});

export default [
    getThemes,
];
