import React from 'react';

import PropTypes from "prop-types";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';

import connect from './CourseFinishModal.connect';
import styles from './CourseFinishModal.styles';

class CourseFinishModal extends React.PureComponent{
    handleCloseDialog = () => {
        this.props.actions.closeFinishCourseModal();
    };

    render() {
        const {isOpen, classes} = this.props;
        
        return (
            <Dialog
                open={isOpen}
                onClose={this.handleCloseDialog}
                maxWidth={'sm'}
                fullWidth
                classes={{
                    paper: classes.dialog
                }}
            >
                <DialogTitle> Поздравляем! </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Вы успешно завершили курс!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseDialog}
                            color="secondary"
                            autoFocus>
                        Ок
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

CourseFinishModal.propTypes = {
    isOpen: PropTypes.bool,
    actions: PropTypes.object
}

export default withStyles(styles)(connect(CourseFinishModal));