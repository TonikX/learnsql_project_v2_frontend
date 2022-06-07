import createAction from "../../store/createAction";

import * as C from './constants';

const createTopic = createAction(C.CREATE_TOPIC, 'payload');
const topicChangeField = createAction(C.TOPIC_CHANGE_FIELD, 'payload');
const getSections = createAction(C.GET_SECTIONS, 'payload');
const setSections = createAction(C.SET_SECTIONS, 'payload');
const getThemes = createAction(C.GET_THEMES, 'payload');
const setThemes = createAction(C.SET_THEMES, 'payload');

export default {
    createTopic,
    topicChangeField,
    getSections,
    setSections,
    getThemes,
    setThemes
}