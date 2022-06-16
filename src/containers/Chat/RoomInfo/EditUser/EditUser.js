import React, {useState} from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import styles from "./EditUser.styles";
import connect from "../../Chat.connect";
import {withRouter} from "react-router-dom";

import moc from "./moc.svg";
import Button from "@material-ui/core/Button";
import {addAdminOnRoom} from "../../logics";

function EditUser (props) {
    const {editUser, classes, actions, room, myRightLikeAdmin} = props;

    const [rightsState, setRightsState] = useState({
        admin: editUser.admin,
        main_admin: editUser.main_admin,
        can_add_user: editUser.can_add_user,
        can_set_chat: editUser.can_set_chat,
        can_delete_user: editUser.can_delete_user
    });

    if (!editUser) {
        return <></>
    }

    const setRights = (field) => {
        if (field === 'admin' && rightsState[field]) {
            setRightsState(prevState => ({
                admin: false,
                main_admin: false,
                can_add_user: false,
                can_set_chat: false,
                can_delete_user: false
            }))
            return;
        }
         if (field === 'main_admin' && !rightsState[field]) {
            setRightsState(prevState => ({
                admin: true,
                main_admin: true,
                can_add_user: true,
                can_set_chat: true,
                can_delete_user: true
            }))
            return;
        }
        setRightsState(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }))
    }

    const createAdmin = () => {
        const data = new FormData();

        data.append("admin", rightsState.admin);
        data.append("main_admin", rightsState.main_admin);
        data.append("can_add_user", rightsState.can_add_user);
        data.append("can_set_chat", rightsState.can_set_chat);
        data.append("can_delete_user", rightsState.can_delete_user);
        data.append("user", editUser.user.id);
        data.append("main_admin_id", myRightLikeAdmin.id);

        actions.addAdmin({data, id: room.id});
    }

    const updateAdmin = () => {
        const data = new FormData();

        console.log("alo")

        data.append("id", editUser.id);
        data.append("admin", rightsState.admin);
        data.append("main_admin", rightsState.main_admin);
        data.append("can_add_user", rightsState.can_add_user);
        data.append("can_set_chat", rightsState.can_set_chat);
        data.append("can_delete_user", rightsState.can_delete_user);
        data.append("user", editUser.user.id);
        data.append("main_admin_id", myRightLikeAdmin.id);
        actions.updateAdmin({data, id: room.id})
    }

    const delAdmin = () => {
        const data = new FormData();
        data.append("id", editUser.id);
        actions.delAdmin({data, id: room.id, idAdmin: editUser.id})
    }

    const onSave = (e) => {
        e.preventDefault();
        console.log(rightsState)
        if(!editUser.id){
            createAdmin();
        } else {
            if(rightsState.admin){
                 updateAdmin()
            } else {
                delAdmin()
            }

        }
    }



    const delUser = () => {
        const data = new FormData();
        data.append("id", editUser.id);
        // actions.delAdmin({data, id: room.id});
    }

    const onDelete = (e) => {
        e.preventDefault();

        delUser()

    }

    const getRights = (text, field) => {
        return (
            <div className={classes.rights}>
                <div className={classes.switcher + ` ${rightsState[field] ? classes.switcher_turn : ''}`}
                     onClick={() => (rightsState.admin || field === 'admin') && setRights(field)}>
                        <span
                            className={classes.switcherTrigger + ` ${rightsState[field] ? classes.switcherTrigger_turn : ''}`}>
                            {
                                rightsState.admin || field === 'admin' ?
                                    <span className={classes.warn + ` ${ field === "main_admin" &&  myRightLikeAdmin.main_admin && rightsState.main_admin && classes.warn_show}`}>
                                        !
                                        <span className={classes.warnText}>
                                            Назначая пользователя главным администратором вы лишитесь этого статуса
                                        </span>
                                    </span>
                                    :
                                    <img src={moc}/>
                            }
                        </span>
                </div>
                <span className={classes.rightsText}>
                    {text}
                </span>
            </div>
        )
    }

    return (
        <div>
            <div className={classes.header}>
                <div className={classes.avatar}>
                    {editUser.user.username[0]}
                </div>
                <div className={classes.chatElInfo}>
                    <span className={classes.chatElName}>
                        {editUser.user.username}
                    </span>
                    <span className={classes.chatElSubs}>
                       Был в сети только что
                    </span>
                </div>
            </div>
            <div className={classes.body}>
                {getRights('Адинистратор', 'admin')}
                {getRights('Удаление пользователей', 'can_delete_user')}
                {getRights('Добавленин пользователей', 'can_add_user')}
                {getRights('Изменение чата', 'can_set_chat')}
                <span className={classes.mainAdminInfo}>

                    {getRights('Главный Администратор', 'main_admin')}
                </span>



            </div>
            <div className={classes.footer}>
                <Button color={'primary'}
                        variant={'outlined'}
                        className={classes.saveButton}
                        onClick={onSave}
                >
                    Сохранить
                </Button>
                <Button
                    // color={'primary'}
                    //     variant={'contained'}
                    variant="outlined" color="primary"
                    className={classes.deleteButton}
                >
                    Удалить
                </Button>
            </div>
        </div>
    )
}



export default withStyles(styles)(connect(withRouter(EditUser)));
