import get from 'lodash/get';
import {GENERAL_PATH} from "./reducer";
import * as Enum from './enum';

const getStateData = (state) => get(state, GENERAL_PATH, {});

export const getThemes = (state, field) => get(getStateData(state), Enum.THEMES, []);
export const getThemesCount = (state, field) => get(getStateData(state), Enum.THEMES_COUNT, 0);
export const getFieldValue = (state, field) => get(getStateData(state), field, '');