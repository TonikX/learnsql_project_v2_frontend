import React, {useEffect, useState} from 'react';
import styles from "./ModalRoomCreator.styles";
import connect from "../Chat.connect";
import {withRouter} from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

function ModalRoomCreator(state) {
    const [roomName, setRoomName] = useState(``);
    const [isOpen, setIsOpen] = useState(false);
    const {actions, rooms, userData, users, classes} = state;
    const [userList, setUserList] = useState([]);
    const [searchUser, setSearchUser] = useState('');

    const createRoom = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("type", "Room");
        data.append("is_room", "True");
        data.append("name", roomName);
        data.append('subscribers', userList.map(user => user.id));

        actions.createRoom(data)
    }

    const addUser = (user) => {
        console.log(userList.filter(el => el === user))
        setUserList(prev => [...prev, user])
    }
    return (
        <>
            <div className={classes.modalContent}>
                <div className={classes.title}>
                    Создание комнаты
                </div>
                <TextField
                    label={"Название комнаты"}
                    value={roomName}
                    onChange={e => setRoomName(e.target.value)}
                    type="text"
                    className={classes.roomName}
                />
                <div className={classes.roomList}>
                    <div className={classes.searchBlock}>
                        <TextField label={'Поиск'}
                                   variant={'outlined'}
                                   fullWidth
                                   maxwidth={'100%'}
                                   value={searchUser}
                             onChange={(e) => setSearchUser(e.target.value)}

                        />
                        {
                            searchUser !== "" &&
                            <div className={classes.scrollList + ` ${classes.searchedUsers}`}>
                                {
                                    users.filter(user => user.username.indexOf(searchUser) > -1 && userList.indexOf(user)
                                        === -1).map((user, i) => (
                                        <div key={i} onClick={() => {
                                            setSearchUser('');
                                            addUser(user)
                                        }} className={classes.searchedUser}>
                                            {user.username}
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </div>

                    <div className={classes.scrollList + ` ${classes.selectedUsers}`}>
                        {
                            userList.map((user, i) => (

                                <div key={i} onClick={() => {
                                    setUserList(prev => prev.filter(el => el.id !== user.id))
                                }} className={classes.elInBody}>
                                    <div className={classes.left}>
                                        <div className={classes.avatar}>
                                            {user.username[0]}
                                        </div>
                                        <div className={classes.infoEL}>
                                        <span className={classes.elName}>
                                            {user.username}
                                        </span>
                                        </div>
                                    </div>
                                    <div className={classes.right}>

                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <Button color={'primary'}
                        variant={'outlined'}
                        disabled={roomName.length === 0 || userList.length === 0}
                        onClick={(e) => createRoom(e)}

                >
                    Создать комнату
                </Button>

            </div>
        </>
    )
}


export default withStyles(styles)(connect(withRouter(ModalRoomCreator)));
