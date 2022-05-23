import {WebSocketService} from "../websocket";
import styles from "../Chat.styles";
import connect from "../Chat.connect";
import {useLocation, withRouter} from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles';
import React,{useEffect, useState} from "react";
import AddUserModal from "../AddUserModal/AddUserModal";

function Room(state) {

    const [roomIsLoad, setRoomIsLoad] = useState(false);
    const {userData, classes} = state;

    const [WebSocketInstance, setWebsocketInstance] = useState(new WebSocketService());

    const location = useLocation();
    const [interlocutor, setInterlocutor] = useState();
    const [messages, setMessages] = useState([]);
    const [room, setRoom] = useState(null)
    const getRoomNameByUsernames = (yourUsername) => {
        return userData.username > yourUsername ? `${userData.username}_and_${yourUsername}` : `${yourUsername}_and_${userData.username}`
    };


    const [roomName, setRoomName] = useState( "")
    const [roomLabel, setRoomLabel] = useState("")

    useEffect(()=>{
        if(location.interlocutor || location.roomName){
            setInterlocutor(location.interlocutor)
            setRoomName(location.roomName ? location.roomName : getRoomNameByUsernames(location.interlocutor.username))
            setRoomLabel(location.roomName ? location.roomName : location.interlocutor.username)
            setRoom(location.room)
            console.log(location.room)
            setRoomIsLoad(true)
        } else {
            state.history.push('/chat');
        }
    }, [])


    useEffect(() => {
        if(!roomIsLoad) {
            return;
        }
        console.log(userData)
        WebSocketInstance.connect(
            {
                roomName,
                id: userData.id,
                user: interlocutor ? interlocutor.id : null
            }
        );
        //
        waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(setMessages, addMessage);
            WebSocketInstance.fetchMessages(userData.username, roomName);
        });

    }, [roomIsLoad]);


    const addMessage = (message) => {
        setMessages((prev) => [...prev, message]);
    };


    const waitForSocketConnection = (callback) => {
        setTimeout(
            function () {
                if (WebSocketInstance.state() === 1) {
                    console.log("Connection is made");
                    callback();
                    return;
                } else {
                    console.log("wait for connection...");
                    waitForSocketConnection(callback);
                }
            }, 100);
    };

    const renderMessages = (messages) => {
        const currentUser = userData.username;
        return messages.map((message, i) => (
            <li
                key={i}
                className={message.author === currentUser ? 'sent' : 'replies'}>
                {/*<img src="http://emilcarlsson.se/assets/mikeross.png" />*/}
                <p>
                    author: {message.author}
                    <br/>
                    {message.content}
                    <br/>
                    <small className={message.author === currentUser ? 'sent' : 'replies'}>
                        {Math.round((new Date().getTime() - new Date(message.timestamp).getTime()) / 60000)} minutes ago
                    </small>
                </p>
            </li>
        ));
    }


    const sendMessageHandler = (e) => {
        e.preventDefault();
        const messageObject = {
            from: userData.username,
            content: message,
            room: roomName
        };
        WebSocketInstance.newChatMessage(messageObject);
        setMessage('');
    }


    const [message, setMessage] = useState(``)

    useEffect(() => {
        return () => {
            if(roomIsLoad){
                WebSocketInstance.close();
                setWebsocketInstance(null)
            }
        }
    }, [])


    const getSubscribersOfRoom = () => {
        if(!room){
            return null;
        }
        if(!room.is_room){
            return <span>{room.subscribers[0].username}</span>;
        }
        return <>
            {
                room.name
            }
            <br/>
            {
                room.subscribers.map((subscriber, i) => (
                    <span key={i}>{subscriber.username},{" "}</span>
                ))
            }
        </>
    }

    const isAdmin = () => {
        if(location.isDialog || !room){
            console.log("not admin")
            return null;
        }

        if(room.administrators.includes(userData.id)){
            return <AddUserModal thisRoom ={room}/>
        }

        return null;
    }

    return (
        <div style={{
            width: "100%",
            padding: "20px",
            display: "flex",
            "flexDirection": "column",
            justifyContent: "space-between"
        }}>
            <div style={{height: `10%`, display: "flex"}}>
                <div>
                    {getSubscribersOfRoom()}
                </div>
                <div>
                    {isAdmin()}
                </div>
            </div>


            <div style={{height: `80%`, overflowY: "scroll"}}>
                {renderMessages(messages)}
            </div>

            <div className={{height: `10%`, display: "flex", alignItems: "flex-end"}}>
                <input placeholder={`Введите сообщение`} value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button onClick={(e) => sendMessageHandler(e)}>Отправить</button>
            </div>


        </div>
    )
}


export default  withStyles(styles)(connect(withRouter(Room)));
