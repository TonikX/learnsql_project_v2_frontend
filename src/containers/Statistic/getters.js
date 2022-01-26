import get from "lodash/get";
import {GENERAL_PATH} from "./reducer";

const getStateData = (state) => get(state, GENERAL_PATH, {});
export const getStatistic = (state) => get(getStateData(state), "statisticList", []);
