import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from './BidImageModal.styles';

class BigImageModal extends React.PureComponent{
    handleCloseDialog = () => {
        this.props.closeImage();
    };

    render() {
        const {isOpen, taskImage, classes} = this.props;
        
        return (
            <Dialog
                open={isOpen}
                onClose={this.handleCloseDialog}
                maxWidth={'xl'}
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> Структура базы данных </DialogTitle>
                <DialogContent>
                    <img src={taskImage} alt="" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseDialog}
                            color="secondary"
                            autoFocus>
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(BigImageModal);