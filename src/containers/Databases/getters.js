import get from 'lodash/get';
import {GENERAL_PATH} from "./reducer";
import * as Enum from './enum';

const getStateData = (state) => get(state, GENERAL_PATH, {});

export const getDatabases = (state, field) => get(getStateData(state), Enum.DATABASES, []);
export const getCurrentDatabases = (state, field) => get(getStateData(state), Enum.CURRENT_DATABASES, []);