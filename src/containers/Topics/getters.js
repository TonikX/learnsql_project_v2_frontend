import get from 'lodash/get';
import {GENERAL_PATH} from "./reducer";
import * as Enum from './enum';

const getStateData = (state) => get(state, GENERAL_PATH, {});

export const getTopics = (state, field) => get(getStateData(state), Enum.TOPICS, []);
export const getCurrentTopics = (state, field) => get(getStateData(state), Enum.CURRENT_TOPICS, []);