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

const ROOM_JUST_CHAT = 'ROOM_JUST_CHAT';
const ROOM_BY_TASKS = 'ROOM_BY_TASKS';
const ROOM_BY_ARCHIVE = 'ROOM_BY_ARCHIVE';


function ChatRoom(state) {
    const [searchUsers, setSearchUsers] = useState(``);
    const [searchRooms, setSearchRooms] = useState(``);
    const {actions, rooms, userData, users, classes} = state;

    const [selectedRoom, setSelectedRoom] = useState(null);
    const [roomType, setRoomType] = useState(ROOM_JUST_CHAT)

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

                                className={classes.chatEl + ` ${selectedRoom && room.id === selectedRoom.id ? classes.chatElSelect : ''}`}
                                onClick={() => {
                                    setSelectedRoom(null)
                                    setTimeout(() => {
                                        setSelectedRoom(room)
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
                <Button color={'primary'}
                        variant={'outlined'}
                    // className={classes.button}
                        disabled={false}
                >
                    Создать комнату
                </Button>
            </div>

            {
                selectedRoom && <Room room={selectedRoom}/>
            }


        </div>
    )
}

export default withStyles(styles)(connect(withRouter(ChatRoom)));

