import createReducer from "../../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';

export const GENERAL_PATH = 'sendFeedback';

export const initialState = {
    [Enum.SUBJECT]: '',
    [Enum.MESSAGE]: '',
};

const changeField = (state, {payload}) => ({
    ...state,
    [payload.destination]: payload.value
});

export const reducer = createReducer(initialState, {
    [C.FEEDBACK_CHANGE_FIELD]: changeField,
});