import get from 'lodash/get';
import {GENERAL_PATH} from "./reducer";
import * as Enum from './enum';

const getStateData = (state) => get(state, GENERAL_PATH, {});

export const getThemesField = (state, field) => get(getStateData(state), Enum.THEMES, []);
export const getDatabasesField = (state, field) => get(getStateData(state), Enum.DATABASES, []);
export const getFieldValue = (state, field) => get(getStateData(state), field, '');