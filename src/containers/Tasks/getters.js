import get from 'lodash/get';
import {GENERAL_PATH} from "./reducer";
import * as Enum from './enum';

const getStateData = (state) => get(state, GENERAL_PATH, {});

export const getTasks = (state, field) => get(getStateData(state), Enum.TASKS, []);
export const getTasksCount = (state, field) => get(getStateData(state), Enum.TASKS_COUNT, 0);