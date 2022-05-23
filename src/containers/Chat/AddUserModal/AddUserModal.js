import React, {useEffect, useState} from 'react';
import styles from "../Chat.styles";
import connect from "../Chat.connect";
import {Link, withRouter} from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import {addUserOnRoom} from "../logics";

function AddUserModal(state){
    const {actions, rooms, userData, users, classes, thisRoom} = state;
    const [roomName, setRoomName] = useState(thisRoom.name);
    const [isOpen, setIsOpen] = useState(false);
    const [searchUsers, setSearchUsers] = useState(``);
    const [userForAdd, setUsersForAdd] = useState([]);

    const update = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("type", "Room");
        data.append("is_room", "true");
        data.append("name", roomName);
        data.append('subscribers', JSON.stringify({
            data: [...thisRoom.subscribers.map(user => user.id), ...userForAdd.map(user => user.id)]
        }));
        data.append('administrators',JSON.stringify({
            data: [...thisRoom.administrators]
        }));

        actions.updateRoom({data, id: thisRoom.id})
    }
    return (
        <>
            <button onClick={()=>setIsOpen(true)}>
                Создать комнату
            </button>
            <div
                onClick={(e)=> e.target === e.currentTarget && setIsOpen(false)}
                className={ `${classes.modal} ${isOpen ? classes.modal_show : ``}`}>
                <div className={classes.modalContent}>
                    <TextField
                        label={"Название комнаты"}
                        value={roomName}
                        onChange={e => setRoomName(e.target.value)}
                        type="text"
                    />
                    <div style={{maxHeight: "200px", display: "grid", "grid-gap": "29px"}}>
                        <TextField
                            label="Пользователи"
                            value={searchUsers}
                            onChange={e => setSearchUsers(e.target.value)}
                            type="text"
                        />
                        <div className={classes.list}>
                            {
                                users && users.filter(user => user.username.indexOf(searchUsers) > -1).map((user, i) => (
                                    <div
                                        onClick={()=>setUsersForAdd(prev => [...prev, user])}
                                        className={classes.elOfList}
                                        key={i}
                                    >
                                        {user.username}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div style={{maxHeight: "200px", display: "grid", "grid-gap": "29px"}}>
                        <div className={classes.list}>
                            {
                                userForAdd && userForAdd.filter(user => user.username.indexOf(searchUsers) > -1).map((user, i) => (
                                    <div
                                        onClick={()=>setUsersForAdd(prev => prev.filter(el => el.id !== user.id))}
                                        className={classes.elOfList}
                                        key={i}
                                    >
                                        {user.username}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <button onClick={(e) => update(e)} >Изменить</button>
                </div>
            </div>
        </>
    )
}


export default  withStyles(styles)(connect(withRouter(AddUserModal)));
