import React from 'react'
import classNames from 'classnames'
import { useStyles } from './ModalWindow.styles'
import Close from '@material-ui/icons/Close';
import {Typography} from "@material-ui/core";

const ModalWindow = ({children, title, visible, closeModal}) => {
    const classes = useStyles()

    const rootClasses = [classes.modal]
    if (visible) {
        rootClasses.push(classes.active)
    }
    return (
        <div className={classNames(rootClasses)} onClick={() => closeModal()}>
            <div className={classes.content} onClick={e => e.stopPropagation()}>
                <div className={classes.cross}>
                    <Close onClick={() => closeModal()} />
                </div>
                <Typography className={classes.title} variant="h6">Создание главы методических материалов</Typography>
                {children}
            </div>
        </div>
    );
};

export default ModalWindow;