import get from "lodash/get";
import {GENERAL_PATH} from "./reducer";

const getStateData = (state) => get(state, GENERAL_PATH, {});
export const getStatisticList = (state) => get(getStateData(state), "statisticList", []);
export const getAllCount = (state) => get(getStateData(state),"allCount", 1)
export const getCurrentPage = (state) => get(getStateData(state),"currentPage", 1)
export const getCourseId = (state) => get(getStateData(state),"courseId", 5)
export const getCourseStatistic = (state) => get(getStateData(state),"courseStatistic", {})

