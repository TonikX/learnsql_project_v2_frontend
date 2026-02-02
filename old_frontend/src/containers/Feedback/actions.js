import createAction from "../../store/createAction";

import * as C from './constants';
const feedbackChangeField = createAction(C.FEEDBACK_CHANGE_FIELD, 'payload');
const sendFeedback = createAction(C.SEND_FEEDBACK, 'payload');


export default {
    feedbackChangeField,
    sendFeedback
}