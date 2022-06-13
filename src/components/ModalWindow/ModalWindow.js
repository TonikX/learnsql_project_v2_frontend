import styles from "./ModalWindow.styles";
import {withRouter} from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles';
import React, {useEffect, useState} from "react";

function ModalWindow(state) {

    const {classes, isOpen, setIsOpen, children, blackout, inCenter} = state;

    const [modalOpen, setModalOpen] = useState(false);
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        if(isOpen){
            setModalOpen(true)
            setTimeout(()=>{
                setAnimated(true)
            }, 100)
        } else{
            setAnimated(false)
            setTimeout(()=>{
                setModalOpen(false)
            }, 500)
        }
    }, [isOpen])

    if(!modalOpen){
        return <></>
    }

    return (
        <div className={classes.modalWindowContainer + ` ${animated ? classes.modalWindowContainer_open : ''}` + ` ${blackout ? classes.modalWindowContainer_blackout : ''}`} onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}>
            <div className={classes.modalWindowBody + ` ${animated ? classes.modalWindowBody_open : ''}` + ` ${blackout ? '' :  classes.modalWindowBody_shadow}` + ` ${inCenter ? classes.modalWindowBody_center : ''}`}>
                <div className={classes.modalWindowCloseButton}/>
                {children}
            </div>
        </div>
    )

}


export default withStyles(styles)(withRouter(ModalWindow));
