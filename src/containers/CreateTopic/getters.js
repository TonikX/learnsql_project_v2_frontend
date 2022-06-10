import get from 'lodash/get';
import {GENERAL_PATH} from "./reducer";
import * as Enum from './enum';

const getStateData = (state) => get(state, GENERAL_PATH, {});

export const getThemes = (state, field) => get(getStateData(state), Enum.THEMES, []);
export const getSections = (state, field) => get(getStateData(state), Enum.SECTIONS, []);