import get from 'lodash/get';
import {GENERAL_PATH} from "./reducer";
import * as Enum from './enum';

const getStateData = (state) => get(state, GENERAL_PATH, {});


export const getUsers = (state) => get(getStateData(state), Enum.USERS, []);
export const getRooms = (state) => get(getStateData(state), Enum.ROOMS, []);
