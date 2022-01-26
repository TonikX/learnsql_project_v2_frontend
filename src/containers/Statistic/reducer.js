import createReducer from "../../store/createReducer";
import actions from "./actions";
export const GENERAL_PATH = 'statistic';

export const initialState = {
statisticList: [],
    allCount: 0,
    currentPage: 1,
    courseId: 5,

}

const setStatisticList  = (state, {payload}) => ({
  ...state,
  statisticList: payload
});

const changeAllCount  = (state, {payload}) => ({
    ...state,
    allCount: payload
});

const changeCurrentPage  = (state, {payload}) => ({
    ...state,
    currentPage: payload
});

const changeCourseId  = (state, {payload}) => ({
    ...state,
    courseId: payload
});



export const reducer = createReducer(initialState, {
    [actions.setStatistic.type]:  setStatisticList,
    [actions.changeAllCount.type]:  changeAllCount,
    [actions.changeCurrentPage.type]:  changeCurrentPage,
    [actions.changeCourseId.type]:  changeCourseId,
});