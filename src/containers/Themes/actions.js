import createAction from "../../store/createAction";

import * as C from './constants';

const getThemes = createAction(C.GET_THEMES, 'payload');
const setThemes = createAction(C.SET_THEMES, 'payload');

export default {
    getThemes,
    setThemes,
}