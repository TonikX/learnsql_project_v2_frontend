import styles from "./ModalWindowWithButton.styles";
import {withRouter} from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles';
import React, {useState} from "react";
import ModalWindow from "../ModalWindow/ModalWindow";

function ModalWindowWidthButton(state) {

    const {Button, children, blackout} = state;

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button setIsOpen={setIsOpen} isOpen={isOpen}/>
            <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} blackout={blackout}>
                {children}
            </ModalWindow>
        </>
    )
}


export default withStyles(styles)(withRouter(ModalWindowWidthButton));
