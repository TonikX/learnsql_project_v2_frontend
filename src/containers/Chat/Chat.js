import React, {useEffect, useState} from 'react';
import {Redirect, Route, Switch, Link, withRouter} from "react-router-dom";

import connect from './Chat.connect';
import styles from "./Chat.styles";
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import * as Enum from "../Profile/enum";
import Room from "./Room/Room";
import ModalRoomCreator from "./ModalRoomCreator/ModalRoomCreator";
import Button from "@material-ui/core/Button";
import {useLocation} from "react-router";
import ModalWindowWidthButton from "../../components/ModalWindowWithButton/ModalWindowWithButton";
import RoomInfo from "./RoomInfo/RoomInfo";

const ROOM_JUST_CHAT = 'ROOM_JUST_CHAT';
const ROOM_BY_TASKS = 'ROOM_BY_TASKS';
const ROOM_BY_ARCHIVE = 'ROOM_BY_ARCHIVE';


function ChatRoom(state) {
    const [searchUsers, setSearchUsers] = useState(``);
    const [searchRooms, setSearchRooms] = useState(``);
    const {actions, rooms, userData, users, classes} = state;

    const [selectedRoom, setSelectedRoom] = useState(undefined);
    const [roomType, setRoomType] = useState(ROOM_JUST_CHAT);
    const location = useLocation();

    const [waitingRoom, setWaitingRoom] = useState(undefined);

    useEffect(()=>{
        if(location.taskId && !location.exist){
            const data = new FormData();
            data.append("type", "Room");
            data.append("name", location.required_words + ` - ${location.taskId}`);
            data.append("task", location.taskId);

            actions.createRoom(data);
            setWaitingRoom( location.taskId );
            setRoomType(ROOM_BY_TASKS)
        } else if (location.exist) {
            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i].task && rooms[i].task === location.taskId) {
                    setSelectedRoom(rooms[i].id)
                }
            }
        }

    }, [])

    useEffect(()=>{
        if(waitingRoom){
            setSelectedRoom(rooms.filter(room => room.task && room.task === waitingRoom)[0].id)
            setWaitingRoom(undefined)
        }
    }, [rooms])

    useEffect(() => {
        actions.getUsers();
        actions.getRooms();
        actions.getUserData();
    }, [])

    const getRoomName = (room) => {
        if (room.is_room) {
            return room.name
        }
        const array = room.subscribers.filter(subscriber => subscriber.username !== userData.username);
        return array.length > 0 ? array[0].username : ""
    }

    const createButton = (props) => {
         const {isOpen, setIsOpen} = props;
        return (
            <Button color={'primary'}
                    variant={'outlined'}
                    disabled={false}
                    onClick={()=>setIsOpen(true)}

            >
                Создать комнату
            </Button>
        )
    }

    return (
        <div className={classes.container}>
            <div className={classes.infoPanel}>
                <div className={classes.headerInfoPanel}>
                    <div className={classes.navButton + ` ${roomType === ROOM_JUST_CHAT && classes.navButtonSelect}`}
                         onClick={() => {
                             setRoomType(ROOM_JUST_CHAT)
                         }}>Чаты
                    </div>
                    <div className={classes.navButton + ` ${roomType === ROOM_BY_TASKS && classes.navButtonSelect}`}
                         onClick={() => {
                             setRoomType(ROOM_BY_TASKS)
                         }}>Задания
                    </div>
                </div>
                <TextField label={'Поиск'}
                           variant={'outlined'}
                           fullWidth
                           maxwidth={'100%'}
                           value={searchRooms}
                           onChange={e => setSearchRooms(e.target.value)}

                />
                <div className={classes.scrollListContainer}>
                    {
                        rooms && rooms.filter(room => room.name.indexOf(searchRooms) > -1).filter(room => roomType === ROOM_JUST_CHAT ? room.task === null : room.task).map((room, i) => (
                            <div

                                className={classes.chatEl + ` ${selectedRoom === room.id ? classes.chatElSelect : ''}`}
                                onClick={() => {
                                    setSelectedRoom(undefined)
                                    setTimeout(() => {
                                        setSelectedRoom(room.id)
                                    }, 0)
                                }}
                                key={i}
                            >
                                <div className={classes.avatar}>
                                    {
                                        getRoomName(room)[0]
                                    }
                                </div>
                                <div className={classes.chatElInfo}>
                                    <span className={classes.chatElName}>
                                            {getRoomName(room)}
                                    </span>
                                    <span className={classes.chatElSubs}>
                                            {room.subscribers.length} участников
                                    </span>
                                </div>

                            </div>
                        ))
                    }
                </div>
                <ModalWindowWidthButton Button = {(props) => createButton(props)} blackout={true}>
                       <ModalRoomCreator/>
                </ModalWindowWidthButton>

            </div>

            {
                selectedRoom && <Room room={rooms.filter(room => room.id === selectedRoom)[0]}/>
            }
        </div>
    )
}

export default withStyles(styles)(connect(withRouter(ChatRoom)));

