import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import connect from "./Feedback.connect";
import PropTypes from "prop-types";
import * as Enum from './enum';
import get from "lodash/get";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from './Feedback.styles'


class Feedback extends React.PureComponent {

    changeSubject = (e) => {
        this.props.actions.feedbackChangeField({destination: Enum.SUBJECT, value: get(e, 'target.value', '')})
    };

    changeMessage = (e) => {
        this.props.actions.feedbackChangeField({destination: Enum.MESSAGE, value: get(e, 'target.value', '')})
    };

    clickButtonHandler = () => {
        this.props.actions.sendFeedback();
    }

    render() {
        const {classes, disableButton} = this.props;
        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title}>Форма обратной связи</Typography>

                        <Typography className={classes.descriptionFeedback}>
                            Для улучшения качества сервиса, вы можете отправить нам пожелания, рекомендации, которые мы обязательно рассмотрим. Спасибо!
                        </Typography>
                            
                        <div>
                            <div align={'center'}>
                                <TextField label="Тема"
                                           className={classes.textField}
                                           onChange={this.changeSubject}
                                           variant="outlined"
                                />
                            </div>

                            <div align={'center'}>
                                <TextField label="Текст сообщения"
                                           className={classes.textField}
                                           id="outlined-basic"
                                           variant="outlined"
                                           multiline
                                           rows={6}
                                           onChange={this.changeMessage}
                                />
                            </div>
                        </div>
                        <div className={classes.row}>
                            <Button color="primary"
                                    variant="contained"
                                    className={classes.button}
                                    disabled={disableButton}
                                    onClick={this.clickButtonHandler}>
                                Отправить
                            </Button>
                        </div>

                    </CardContent>
                </Card>
            </div>
        )
    }
}

Feedback.propTypes = {
    classes: PropTypes.object,
    actions: PropTypes.object,
    disableButton: PropTypes.bool,
}

export default withStyles(styles)(connect(Feedback))