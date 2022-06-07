import createAction from "../../store/createAction";

import * as C from './constants';

const getThemes = createAction(C.GET_THEMES, 'payload');
const setThemes = createAction(C.SET_THEMES, 'payload');
const getThemesCount = createAction(C.GET_THEMES_COUNT, 'payload');
const setThemesCount = createAction(C.SET_THEMES_COUNT, 'payload');
const createTheme = createAction(C.CREATE_THEME, 'payload');
const updateTheme = createAction(C.UPDATE_THEME, 'payload');
const deleteTheme = createAction(C.DELETE_THEME, 'payload');
const themeChangeField = createAction(C.THEME_CHANGE_FIELD, 'payload');

export default {
    getThemes,
    setThemes,
    getThemesCount,
    setThemesCount,
    createTheme,
    updateTheme,
    deleteTheme,
    themeChangeField,
}