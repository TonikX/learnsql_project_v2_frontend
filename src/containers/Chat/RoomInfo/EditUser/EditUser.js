import React, {useState} from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import styles from "./EditUser.styles";
import connect from "../../Chat.connect";
import {withRouter} from "react-router-dom";

import moc from "./moc.svg";
import Button from "@material-ui/core/Button";

function EditUser (props) {
    const {editUser, classes} = props;
    const [o ,setO] = useState(false);

    const [rightsState, setRightsState] = useState({
        admin: false,
        main_admin: false,
        can_add_user: false,
        can_set_chat: false,
        can_delete_user: false
    });

    if (!editUser) {
        return <></>
    }

    const setRights = (field) => {
        console.log(rightsState)
        console.log("alo")
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
        console.log("alo after")
        setRightsState(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }))
    }

    const getRights = (text, field) => {
        return (
            <div className={classes.rights}>
                <div className={classes.switcher + ` ${rightsState[field] ? classes.switcher_turn : ''}`}
                     onClick={() => (rightsState.admin || field === 'admin') && setRights(field)}>
                        <span
                            className={classes.switcherTrigger + ` ${rightsState[field] ? classes.switcherTrigger_turn : ''}`}>
                            {
                                rightsState.admin || field === 'admin' ? '' : <img src={moc}/>
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
                    {editUser.username[0]}
                </div>
                <div className={classes.chatElInfo}>
                    <span className={classes.chatElName}>
                        {editUser.username}
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
                {getRights('Главный Администратор', 'main_admin')}

            </div>
            <Button color={'primary'}
                    variant={'outlined'}
                    className={classes.saveButton}
            >
                Сохранить
            </Button>

            <div className={classes.footer}>
                <Button
                    // color={'primary'}
                    //     variant={'contained'}
                    variant="outlined" color="error"
                        className={classes.deleteButton}
                >
                    Удалить
                </Button>
            </div>
        </div>
    )
}



export default withStyles(styles)(connect(withRouter(EditUser)));
