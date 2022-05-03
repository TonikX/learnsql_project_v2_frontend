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

    const createRoom = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("type", "Room");
        data.append("is_room", "true");
        data.append("name", roomName);
        data.append('subscribers', [userData.id]);
        data.append('administrators',[userData.id]);

        actions.createRoom(data)
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
                <button onClick={(e) => createRoom(e)} >Создать</button>
            </div>
        </div>
        </>
    )
}


export default  withStyles(styles)(connect(withRouter(ModalRoomCreator)));
