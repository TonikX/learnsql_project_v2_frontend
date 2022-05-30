import {createLogic} from "redux-logic";
import get from "lodash/get";
import Service from "./service";
import actions from '../../layout/actions';
import statisticActions from "./actions";

const service = new Service();

const getStatistic = createLogic({
    type: statisticActions.getStatistic.type,
    latest: true,
    process({getState, action}, dispatch, done) {
      //  dispatch(actions.fetchingTrue({destination: Enum.GET_COURSES_FETCHING}));

        service.getStatistic()
            .then((res) => {
                console.log(res)
                dispatch(actions.fetchingSuccess());
                const statisticList = get(res, 'data.results', []);
                dispatch(statisticActions.setStatistic(statisticList));
                return done();

            })
    }

})
export default [
    getStatistic,
]