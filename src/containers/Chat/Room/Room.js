import {WebSocketService} from "../websocket";
import styles from "./Room.styles";
import connect from "../Chat.connect";
import {useLocation, withRouter} from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles';
import React, {useEffect, useRef, useState} from "react";
import Typography from "@material-ui/core/Typography";
import ModalWindowWidthButton from "../../../components/ModalWindowWithButton/ModalWindowWithButton";
import RoomInfo from "../RoomInfo/RoomInfo";




function Room(state) {

    const {classes, room, userData} = state;
    const scrollRef = useRef();

    const [WebSocketInstance, setWebsocketInstance] = useState(new WebSocketService());

    const [messages, setMessages] = useState([]);

    const [messagesLoad, setMessagesLoad] = useState(false);

    const [myRightLikeAdmin, setMyRightLikeAdmin] = useState({
        admin: false,
        main_admin: false,
        can_add_user: false ,
        can_set_chat: false,
        can_delete_user: false

    })
    useEffect(() => {
        if (room) {
            for (let i = 0; i < room.administrators.length; i++) {
                if (room.administrators[i].user.id === userData.id) {
                    setMyRightLikeAdmin(prevState => ({
                        admin: true,
                        main_admin: room.administrators[i].main_admin,
                        can_add_user: room.administrators[i].can_add_user,
                        can_set_chat: room.administrators[i].can_set_chat,
                        can_delete_user: room.administrators[i].can_delete_user
                    }))
                }
            }
        }
    }, [])

    const addMessage = (message) => {
        setMessages((prev) => [...prev, message]);
        if (scrollRef) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                left: 0,
                behavior: 'smooth'
            });
        }
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

        return messages.map((message, i) => {
            const date = new Date(message.timestamp)
            if (message.author === currentUser) {
                return (
                    <div key={i} className={classes.roomMessage + ` ${classes.roomMessage_right}`}>
                        <div className={classes.roomMessageInfo}>
                        <span className={classes.roomMessageUserInfo}>
                                {message.author}
                        </span>
                            <span className={classes.roomMessageText}>
                                {message.content}
                            </span>
                            <span className={classes.roomMessageTime}>
                                {date.getHours()}:{date.getMinutes()}
                            </span>
                        </div>
                        <div className={classes.roomMessageAvatar}/>
                    </div>
                )
            } else {
                return (
                    <div key={i} className={classes.roomMessage + ` ${classes.roomMessage_left}`}>
                        <div className={classes.roomMessageAvatar}/>
                        <div className={classes.roomMessageInfo}>
                        <span className={classes.roomMessageUserInfo}>
                  {message.author}
                        </span>
                            <span className={classes.roomMessageText}>
                          {message.content}
                        </span>
                            <span className={classes.roomMessageTime}>
                                {date.getHours()}:{date.getMinutes()}
                            </span>
                        </div>
                    </div>
                )

            }
        })
    }
    const sendMessageHandler = (e) => {
        e.preventDefault();
        const messageObject = {
            from: userData.username,
            content: message,
            room: room.id
        };
        WebSocketInstance.newChatMessage(messageObject);
        setMessage('');
    }

    const [message, setMessage] = useState(``)


    const getRoomName = (room) => {
        if (room.is_room) {
            return room.name
        }
        const array = room.subscribers.filter(subscriber => subscriber.username !== userData.username);
        return array.length > 0 ? array[0].username : ""
    }


    useEffect(() => {
        console.log(room)
        WebSocketInstance.connect(
            {
                roomName: room.id,
                id: userData.id,
                // user: interlocutor ? interlocutor.id : null
            }
        );
        //
        waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(setMessages, addMessage);
            WebSocketInstance.fetchMessages(userData.username, room.name);
        });

        return () => {
            WebSocketInstance.close();
            setWebsocketInstance(null);
        }
    }, []);

    useEffect(() => {
        if (scrollRef) {
            if (!messagesLoad && messages.length > 0) {
                scrollRef.current.scrollTo({
                    top: scrollRef.current.scrollHeight,
                    left: 0,
                });
                setMessagesLoad(true)
            }

        }
    }, [scrollRef, messages])


    const roomInfoButton = (props) => {
        const {isOpen, setIsOpen} = props;
        return <div className={classes.roomAvatar} onClick={()=>setIsOpen(true)}/>
    }

    return (
        <div className={classes.room}>
            <div className={classes.roomPanel}>
                <div className={classes.roomInfoContainer}>
                    <ModalWindowWidthButton Button = {(props) => roomInfoButton(props)} blackout={true}>
                       <RoomInfo room={room} myRightLikeAdmin={myRightLikeAdmin}/>
                    </ModalWindowWidthButton>

                    <Typography variant="button" className={classes.roomNameContainer}>
                    <span className={classes.roomName}>
                        {getRoomName(room)}
                    </span>
                        <span className={classes.chatElSubs}>
                            {room.subscribers.length} участников
                    </span>
                    </Typography>
                </div>
            </div>
            <div className={classes.roomBody} ref={scrollRef}>
                <div className={classes.roomMessages}>
                    <div className={classes.roomMessageVoid}/>
                    {renderMessages(messages)}
                    <div className={classes.roomMessageVoid}/>
                </div>
            </div>
            <div className={classes.roomPanel + ` ${classes.messagePanel}`}>

                <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder={'Введите сообщение'}
                       className={classes.messageInput}/>
                <button
                    onClick={(e) => sendMessageHandler(e)}
                    className={classes.messageButton + ` ${message.length === 0 ? classes.messageButton_disabled : ''} `}
                    disabled={message.length === 0}

                >
                    Отправить
                </button>

            </div>
        </div>
    )

}


export default withStyles(styles)(connect(withRouter(Room)));
