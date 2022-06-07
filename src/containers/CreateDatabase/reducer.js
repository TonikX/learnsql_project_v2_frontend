import createReducer from "../../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';

export const GENERAL_PATH = 'database/create';

export const initialState = {
    [Enum.TITLE_FIELD]: '',
    [Enum.DESCRIPTION_FIELD]: '',
    [Enum.SOURCE_CODE_FIELD]: '',
};

const changeField = (state, {payload}) => ({
    ...state,
    [payload.destination]: payload.value
});

export const reducer = createReducer(initialState, {
    [C.DATABASE_CHANGE_FIELD]: changeField,
});