import styles from "./RoomInfo.styles";
import connect from "../Chat.connect";
import {withRouter} from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles';
import React, {useState} from "react";
import ModalWindow from "../../../components/ModalWindow/ModalWindow";
import EditUser from "./EditUser/EditUser";





function RoomInfo(state) {

    const {classes, room, userData, myRightLikeAdmin} = state;
    const [modalWindowIsOpen, setModalWindowIsOpen] = useState(false);
    const [editUser, setEditUser] = useState(null);

    if (!room) {
        return <></>;
    }

    const isAdmin = (sub) =>{
        return room.administrators.filter(admin => admin.user.id === sub.id).length > 0;
    }

    const getUser = (sub) => {
        return {
            id: undefined,
            admin: false,
            main_admin: false,
            can_add_user: false,
            can_set_chat: false,
            can_delete_user: false,
            user: sub
        }
    }

    const getUserByAdmin = (admin) => {
        return {
            admin: true,
            main_admin: admin.main_admin,
            can_add_user: admin.can_add_user,
            can_set_chat: admin.can_set_chat,
            can_delete_user: admin.can_delete_user,
            id: admin.id,
            user: admin.user
        }
    }

    return (
        <div className={classes.container}>
            <ModalWindow isOpen={modalWindowIsOpen} setIsOpen={setModalWindowIsOpen} blackout={false} inCenter={true}>
                <EditUser editUser={editUser} room={room}/>
            </ModalWindow>
            <div className={classes.title}>
                <span className={classes.titleText}>
                    Информация
                </span>
                <span className={classes.line}/>
            </div>
            <div className={classes.header}>
                <div className={classes.avatar}>
                    {room.name[0]}
                </div>
                <div className={classes.chatElInfo}>
                    <span className={classes.chatElName}>
                        {room.name}
                    </span>
                    <span className={classes.chatElSubs}>
                        {room.subscribers.length} участников
                    </span>
                </div>
            </div>
            <span className={classes.line}/>
            <div className={classes.body}>
                <div className={classes.administrators}>
                    <span>Администраторы</span>
                    <div className={classes.list}>
                        {room.administrators.map((sub, i) => (
                            <div key={i} className={classes.elInBody}>
                                <div className={classes.left}>
                                    <div className={classes.avatar}>
                                        {sub.user.username[0]}
                                    </div>
                                    <div className={classes.infoEL}>
                            <span className={classes.elName}>
                                  {sub.user.username}
                            </span>
                                    </div>
                                </div>
                                <div className={classes.right}>
                                    <div className={classes.rightText}>
                                        {
                                            myRightLikeAdmin.main_admin ? (
                                                <span className={classes.edit}
                                                      onClick={()=> {
                                                          setEditUser(getUserByAdmin(sub))
                                                          setModalWindowIsOpen(true)
                                                      }}>
                                                    <span className={classes.point}/>
                                                </span> ): sub.main_admin ? 'Главный администратор' : ''
                                        }
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
                <div className={classes.subscribers}>
                    <span>Участники</span>
                    <div className={classes.list}>
                        {room.subscribers.filter((sub) => !isAdmin(sub)).map((sub, i) => (
                            <div key={i} className={classes.elInBody}>
                                <div className={classes.left}>
                                    <div className={classes.avatar}>
                                        {sub.username[0]}
                                    </div>
                                    <div className={classes.infoEL}>
                                        <span className={classes.elName}>
                                            {sub.username}
                                        </span>
                                    </div>
                                </div>
                                <div className={classes.right}>
                                    {
                                        myRightLikeAdmin.admin ? (
                                             <span className={classes.edit}
                                                      onClick={()=> {
                                                          setEditUser(getUser(sub))
                                                          setModalWindowIsOpen(true)
                                                      }}>
                                                    <span className={classes.point}/>
                                                </span>
                                        ): ''
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={classes.footer}>
                {
                    myRightLikeAdmin.main_admin ? '' : <span className={classes.textWarning}>Выйти из беседы</span>
                }
            </div>
        </div>
    )
}


export default withStyles(styles)(connect(withRouter(RoomInfo)));
