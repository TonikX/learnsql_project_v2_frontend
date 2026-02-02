import {createLogic} from "redux-logic";
import * as C from './constants';
import actions from '../../layout/actions';
import Service from './service';
import {getFieldValue} from "./getters";
import * as Enum from "./enum";
import get from "lodash/get";
import {getUser} from "../../layout/getters";
const service = new Service();

const sendFeedback = createLogic({
    type: C.SEND_FEEDBACK,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();
        const subject = getFieldValue(state, Enum.SUBJECT);
        const message = getFieldValue(state, Enum.MESSAGE);
        const user = getUser(state)['id']
        dispatch(actions.fetchingTrue({destination: Enum.FEEDBACK_FETCHING}));

        service.sendFeedback(subject, message, user)
            .then((res) => {
                dispatch(actions.fetchingSuccess(['Ваше сообщение успешно отправлено!']));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.FEEDBACK_FETCHING}));
                return done();
            });
    }
});

export default [
    sendFeedback,
];
