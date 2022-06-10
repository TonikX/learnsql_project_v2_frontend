import get from 'lodash/get';
import {GENERAL_PATH} from "./reducer";
import * as Enum from './enum';

const getStateData = (state) => get(state, GENERAL_PATH, {});

export const getSections = (state, field) => get(getStateData(state), Enum.SECTIONS, []);
export const getCourses = (state, field) => get(getStateData(state), Enum.COURSES, []);
export const getCurrentSections = (state, field) => get(getStateData(state), Enum.CURRENT_SECTIONS, []);
export const getFieldValue = (state, field) => get(getStateData(state), field, '');