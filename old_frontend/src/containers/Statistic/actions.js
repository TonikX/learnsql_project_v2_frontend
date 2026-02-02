import {createAction} from "@reduxjs/toolkit";

const getStatistic = createAction('GET_STATISTIC');
const setStatistic = createAction('SET_STATISTIC');
const changeAllCount = createAction('CHANGE_ALL_COUNT');
const changeCurrentPage = createAction('CHANGE_CURRENT_PAGE');
const changeCourseId = createAction('CHANGE_COURSE_ID');
const getCourseStatistic = createAction('GET_COURSE_STATISTIC');
const setCourseStatistic = createAction('SET_COURSE_STATISTIC');

const statisticActions = {
    getStatistic,
    setStatistic,
    changeAllCount,
    changeCurrentPage,
    changeCourseId,
    getCourseStatistic,
    setCourseStatistic
}

export default statisticActions;