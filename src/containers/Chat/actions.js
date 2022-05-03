import createAction from "../../store/createAction";

import * as C from './constants';

const getUsers = createAction(C.GET_USERS, 'payload');
const getRooms = createAction(C.GET_ROOMS, 'payload');

const setUsers = createAction(C.SET_USERS, 'payload');
const setRooms = createAction(C.SET_ROOMS, 'payload');

const createRoom = createAction(C.CREATE_ROOM, 'payload')
const addRoom = createAction(C.ADD_ROOM, 'payload')
const updateRoom = createAction(C.UPDATE_ROOM, 'payload')



export default {
    getUsers,
    getRooms,
    setUsers,
    setRooms,
    createRoom,
    addRoom,
    updateRoom

}
