import createAction from "../../store/createAction";

const getStatistic = createAction('GET_STATISTIC');
 const setStatistic = createAction('SET_STATISTIC');
 const changeAllCount = createAction('CHANGE_ALL_COUNT');
 const changeCurrentPage = createAction('CHANGE_CURRENT_PAGE');
 const changeCourseId = createAction('CHANGE_COURSE_ID');


 const statisticActions = {
     getStatistic,
     setStatistic,
     changeAllCount,
     changeCurrentPage,
     changeCourseId
 }

export default statisticActions;