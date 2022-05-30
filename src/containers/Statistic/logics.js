import {createLogic} from "redux-logic";
import get from "lodash/get";
import Service from "./service";
import actions from '../../layout/actions';
import statisticActions from "./actions";
import {getCourseId, getCurrentPage} from "./getters";

const service = new Service();

const getStatistic = createLogic({
    type: statisticActions.getStatistic.type,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();
        const courseId =getCourseId(state)
        const currentPage = getCurrentPage(state)

        dispatch(actions.fetchingTrue({destination: "getStatistic"}));

        service.getStatistic(courseId,currentPage)
            .then((res) => {
                const statisticList = get(res, 'data.results', []);
                const allCount = Math.ceil(get(res, 'data.count', 0));
                dispatch(statisticActions.setStatistic(statisticList));
                dispatch(statisticActions.changeAllCount(allCount));
                dispatch(actions.fetchingSuccess());
                dispatch(actions.fetchingFalse({destination: "getStatistic"}));
                return done();
            })
    }

});

const getCourseStatisticDescription = createLogic(({
    type: statisticActions.getCourseStatistic.type,
    process({getState, action}, dispatch, done) {
        const state = getState();
        const courseId =getCourseId(state)

        service.getCourseStatistic(courseId)
            .then((res) => {
                console.log(res)
                const courseStatistic = get(res, 'data', [])
                dispatch(statisticActions.setCourseStatistic(courseStatistic));
                return done();

            })
    }
    }));



export default [
    getStatistic,
    getCourseStatisticDescription
]