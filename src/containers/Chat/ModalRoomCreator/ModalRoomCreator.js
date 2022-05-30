import React, {useEffect, useState} from 'react';
import styles from "../Chat.styles";
import connect from "../Chat.connect";
import {withRouter} from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';

function ModalRoomCreator(state){
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

    const addUser = (user) =>{
        console.log(userList.filter(el => el === user))
        setUserList(prev => [...prev, user] )
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
                <div className={classes.roomList}>
                    <input onChange={(e) => setSearchUser(e.target.value)} value={searchUser} style={{height: "30px"}}/>
                    <div className={classes.userList}>
                        {
                            userList.map((user, i) => (
                                <div key={i}  onClick={()=>setUserList(prev => prev.filter(el => el.id !== user.id))}>
                                    {user.username}
                                </div>
                            ))
                        }
                    </div>
                    <div className={classes.userList}>
                        {
                            searchUser !== "" &&
                            users.filter(user => user.username.indexOf(searchUser) > -1 && userList.indexOf(user) === -1).map((user, i) => (
                                <div key={i} onClick={()=>addUser(user)}>
                                    {user.username}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <button onClick={(e) => createRoom(e)} >Создать</button>
            </div>
        </div>
        </>
    )
}


export default  withStyles(styles)(connect(withRouter(ModalRoomCreator)));
