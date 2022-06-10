import createAction from "../../store/createAction";

import * as C from './constants';

const getTopics = createAction(C.GET_TOPICS, 'payload');
const setTopics = createAction(C.SET_TOPICS, 'payload');
const getCurrentTopics = createAction(C.GET_CURRENT_TOPICS, 'payload');
const setCurrentTopics = createAction(C.SET_CURRENT_TOPICS, 'payload');
const deleteTopic = createAction(C.DELETE_TOPIC, 'payload');

export default {
    getTopics,
    setTopics,
    getCurrentTopics,
    setCurrentTopics,
    deleteTopic
}