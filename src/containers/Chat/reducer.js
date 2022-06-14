import createReducer from "../../store/createReducer";
import * as C from './constants';
import * as Enum from './enum';

export const GENERAL_PATH = `chat`;

export const initialState = {
    [Enum.USERS]: [],
    [Enum.ROOMS]: []
}

const setUserList = (state, {payload}) => ({
    ...state,
    [Enum.USERS]: payload
});

const setRoomList = (state, {payload}) => ({
    ...state,
    [Enum.ROOMS]: payload
});

const addRoom = (state, {payload}) => ({
    ...state,
    [Enum.ROOMS]: [...state.rooms, payload]
});

const updateRoom = (state, {payload})=> ({
    ...state,
    [Enum.ROOMS]: state.rooms.map(room => {
        if(room.id === payload.id){
            return payload;
        }
        return room;
    })
})

const updateAdmins = (state, {payload})=> ({
    ...state,
    [Enum.ROOMS]: state.rooms.map(room => {
        if(room.id === payload.id){
            return {
                ...room,
                administrators: payload.data
            };
        }
        return room;
    })
})
export const reducer = createReducer(initialState, {
    [C.SET_ROOMS]: setRoomList,
    [C.SET_USERS]: setUserList,
    [C.ADD_ROOM]: addRoom,
    [C.UPDATE_ROOM]: updateRoom,
    [C.SET_ADMINISTRATOR_ON_ROOM]: updateAdmins,
});
