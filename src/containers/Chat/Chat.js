import React, {useEffect, useState} from 'react';
import {Redirect, Route, Switch, Link, withRouter} from "react-router-dom";
import {useLocation} from "react-router";
import {WebSocketService} from "./websocket";
import connect from './Chat.connect';
import styles from "./Chat.styles";
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import * as Enum from "../Profile/enum";
import Room from "./Room/Room";
import ModalRoomCreator from "./ModalRoomCreator/ModalRoomCreator";

const contentOnLeftPanel = {
    height: "300px",
    overflowY: "scroll",
    width: "200px",
    display: "grid",
    "gridAutoRows": "max-content",
    "gridGap": "20px",
    "boxShadow": "0 4px 64px rgb(0 0 0 / 10%)",
}




//extends React.PureComponent
function ChatRoom(state) {
    const [searchUsers, setSearchUsers] = useState(``);
    const [searchRooms, setSearchRooms] = useState(``);
    const {actions, rooms, userData, users, classes} = state;


    useEffect(() => {
        actions.getUsers();
        actions.getRooms();
        actions.getUserData();
    }, [])

    const getRoomName = (room) => {
        if(room.is_room){
            return room.name
        }
        const array = room.subscribers.filter(subscriber => subscriber.username !== userData.username);
        return array.length > 0 ? array[0].username : ""

    }

    return (
        <div className={classes.container}>
            <div className={classes.leftPanel}>
                <div className={classes.contentOnLeftPanel}>
                        <TextField
                            label="Пользователи"
                            value={searchUsers}
                            onChange={e => setSearchUsers(e.target.value)}
                            type="text"
                        />
                        <div className={classes.list}>
                            {
                                users && users.filter(user => user.username.indexOf(searchUsers) > -1).map((user, i) => (
                                    <Link
                                        className={classes.elOfList}
                                        key={i}
                                        to={{
                                            pathname: `/chat/${user.username}`,
                                            isDialog: true,
                                            interlocutor: user
                                        }}
                                    >
                                        {user.username}
                                    </Link>
                                ))
                            }
                        </div>

                </div>

                <div className={classes.roomList}>
                    <ModalRoomCreator/>
                    <TextField
                        label="Диалогам"
                        value={searchRooms}
                        onChange={e => setSearchRooms(e.target.value)}
                        type="text"
                    />
                    <div className={classes.list}>
                        {
                            rooms && rooms.filter(room => room.name.indexOf(searchRooms) > -1).map((room, i) => (
                                <Link
                                    className={classes.elOfList}
                                    key={i}
                                    to={{
                                        pathname: `/chat/${room.name}`,
                                        roomName: room.name,
                                        room
                                    }}
                                >
                                    {
                                        getRoomName(room)
                                    }
                                </Link>
                            ))
                        }
                    </div>
                </div>

            </div>


            <Switch>
                <Route path="/chat/:id" component={() => <Room/>}/>
            </Switch>

        </div>
    )
    // }
}

export default  withStyles(styles)(connect(withRouter(ChatRoom)));

