import {createLogic} from "redux-logic";
import chatActions from './actions';
import * as C from './constants';
import Service from './service';


const service = new Service();

export const getListOfUsers = createLogic({
    type: C.GET_USERS,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();

        service.getUsers()
            .then((res) => {
                console.log(res)
                dispatch(chatActions.setUsers(res.data.User));
            })
            .catch((errors) => {
                 console.log(errors)
            })
            .then(() => {

            });
    }

});


export const getRoomsOfUsers = createLogic({
    type: C.GET_ROOMS,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();

        service.getRooms()
            .then((res) => {
                console.log(res.data)
                dispatch(chatActions.setRooms(res.data.results));
            })
            .catch((errors) => {
                 console.log(errors)
            })
            .then(() => {

            });
    }

});

export const createRoom = createLogic({
    type: C.CREATE_ROOM,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();

        service.createRooms(action.payload)
            .then((res) => {
                console.log(res.data)
                dispatch(chatActions.addRoom(res.data));
            })
            .catch((errors) => {
                 console.log(errors)
            })
            .then(() => {

            });
    }
});


export const addUserOnRoom = createLogic({
    type: C.UPDATE_ROOM,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();

        service.addUserOnRoom(action.payload.data, action.payload.id)
            .then((res) => {
                console.log(res.data)
                dispatch(chatActions.updateRoom(res.data));
            })
            .catch((errors) => {
                 console.log(errors)
            })
            .then(() => {

            });
    }
});

export const addAdminOnRoom = createLogic({
    type: C.ADD_ADMINISTRATOR_ON_ROOM,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();
        service.addAdminOnRoom(action.payload.data, action.payload.id)
            .then((res) => {
                dispatch(chatActions.setAdmin({data: res.data, id: action.payload.id}));
            })
            .catch((errors) => {
                 console.log(errors)
            })
            .then(() => {

            });
    }
});

export const delAdminOnRoom = createLogic({
    type: C.DEL_ADMIN_FROM_ROOM,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();
        service.delAdminOnRoom(action.payload.data, action.payload.id, action.payload.idAdmin)
            .then((res) => {
                dispatch(chatActions.setAdmin({data: res.data, id: action.payload.id}));
            })
            .catch((errors) => {
                 console.log(errors)
            })
            .then(() => {

            });
    }
});
export const putAdminOnRoom = createLogic({
    type: C.PUT_ADMIN_FOR_ROOM,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();
        service.putAdminOnRoom(action.payload.data, action.payload.id)
            .then((res) => {
                dispatch(chatActions.setAdmin({data: res.data, id: action.payload.id}));
            })
            .catch((errors) => {
                 console.log(errors)
            })
            .then(() => {

            });
    }
});

export default [
    getListOfUsers,
    getRoomsOfUsers,
    createRoom,
    addUserOnRoom,
    addAdminOnRoom,
    delAdminOnRoom,
    putAdminOnRoom
]
