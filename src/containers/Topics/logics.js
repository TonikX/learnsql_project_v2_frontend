import {createLogic} from "redux-logic";
import get from 'lodash/get';

import * as C from './constants';
import actions from '../../layout/actions';
import topicsActions from './actions';

import Service from './service';
import * as Enum from "./enum";

const service = new Service();

const getTopics = createLogic({
    type: C.GET_TOPICS,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.GET_TOPICS_FETCHING}));

        service.getTopics()
            .then((res) => {
                dispatch(actions.fetchingSuccess());
                dispatch(topicsActions.setTopics(get(res, 'data.results', [])));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.GET_TOPICS_FETCHING}));
                return done();
            });
    }
});

const getCurrentTopics = createLogic({
    type: C.GET_CURRENT_TOPICS,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.GET_CURRENT_TOPICS_FETCHING}));

        service.getCurrentTopics(action.payload)
            .then((res) => {
                dispatch(actions.fetchingSuccess());
                dispatch(topicsActions.setCurrentTopics(get(res, 'data.results', [])));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.GET_CURRENT_TOPICS_FETCHING}));
                return done();
            });
    }
});

const deleteTopic = createLogic({
    type: C.DELETE_TOPIC,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.DELETE_TOPICS_FETCHING}));

        service.deleteTopic(action.payload)
            .then((res) => {
                dispatch(actions.fetchingSuccess(['База данных удалена']));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.DELETE_TOPICS_FETCHING}));
                return done();
            });
    }
})

export default [
    getTopics,
    getCurrentTopics,
    deleteTopic,
];
