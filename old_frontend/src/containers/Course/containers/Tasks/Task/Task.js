import React from 'react';
import PropTypes from "prop-types";
import get from 'lodash/get';
import Highlight from 'react-highlight.js';

import Scrollbars from "react-custom-scrollbars";

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

import ArrowForward from '@material-ui/icons/ArrowForward';
import withStyles from '@material-ui/core/styles/withStyles';

import * as Enum from '../../../enum';
import {getTaskId} from "../../../getters";

import connect from './Task.connect';
import styles from './Task.styles';
import BigImageModal from "../../BigImageModal";


class Task extends React.PureComponent{
    constructor(props) {
        super();

        this.state = {
            answer: props.solution,
            openBigImage: false
        }
    }

    openBigImageClickHandler = () => {
        this.setState({openBigImage: true});
    }

    closeBigImageClickHandler = () => {
        this.setState({openBigImage: false});
    }

    answerChangeHandler = (event) => {
        this.setState({answer: get(event, 'target.value')});
    };

    clearAnswerField = () => {
        this.setState({answer: ''});
    };

    answerButtonClickHandler = () => {
        this.props.actions.completeTask(this.state.answer);
    };

    goToNextTaskClickHandler = () => {
        const {nextRoute} = this.props;

        this.props.actions.setCurrentRouteId(nextRoute.id);
        this.props.actions.getCourseTask(getTaskId(nextRoute));
    };

    renderAnswerField = () => {
        const {classes} = this.props;
        const {answer} = this.state;
        const splittedAnswer = answer.split(' ');
        const firstWordError = splittedAnswer[0].toLocaleLowerCase() !== 'select'
            && splittedAnswer[0].toLocaleLowerCase() !== 'update'
            && splittedAnswer[0].toLocaleLowerCase() !== 'insert'
            && splittedAnswer[0].toLocaleLowerCase() !== 'delete';

        return (
            <Box display={'block'} className={classes.answerFieldContainer}>
                <TextField label={'Запрос'}
                           multiline
                           rowsMax={10}
                           rows={7}
                           variant={'outlined'}
                           fullWidth
                           maxwidth={500}
                           onChange={this.answerChangeHandler}
                           onKeyPress={this.answerChangeHandler}
                           value={answer}
                           // className={classes.textField}
                />
                {/*<Highlight language="sql" className={classes.hightlight}>*/}
                {/*    {answer}*/}
                {/*</Highlight>*/}
                <Box display={'flex'}
                     justifyContent={'flex-end'}
                     className={classes.buttonsContainer}
                >
                    <Button onClick={this.clearAnswerField}> Очистить </Button>
                    <Button color={'primary'}
                            variant={'outlined'}
                            className={classes.button}
                            disabled={answer.length === 0 || firstWordError}
                            onClick={this.answerButtonClickHandler}
                    >
                        Выполнить
                    </Button>
                </Box>
            </Box>
        );
    };

    renderErrorTables = () => {
        const {classes, tableErrorData} = this.props;
        const refResult = get(tableErrorData, [Enum.ERROR_REF_RESULT, 1, 1], []);
        const studentResult = get(tableErrorData, [Enum.ERROR_STUDENT_RESULT, 1, 1], []);

        return (
            <div>
                <Typography className={classes.title}> Ошибка! </Typography>

                <div className={classes.tableBody}>
                    <div className={classes.table}>
                        <Typography className={classes.tableTitle}> Правильный запрос </Typography>
                        <TableContainer>
                            <Table>
                                {refResult.map((row, index) =>
                                    <TableRow key={`right-answer-row-${index}`}>
                                        {row.map((cell, index) =>
                                            <TableCell key={`right-answer-cell-${index}`} className={classes.tableCell}>
                                                {cell}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                )}
                            </Table>
                        </TableContainer>
                    </div>

                    <div className={classes.table}>
                        <Typography className={classes.tableTitle}> Ваш запрос </Typography>
                        <TableContainer>
                            <Table>
                                {studentResult.map((row, index) =>
                                    <TableRow key={`wrong-answer-row-${index}`}>
                                        {row.map((cell, index) =>
                                            <TableCell key={`wrong-answer-cell-${index}`} className={classes.tableCell}>
                                                {cell}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                )}
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        );
    }

    renderAnswerTable = () => {
        const {classes, answer} = this.props;

        return (
            <Box className={classes.tableWrap}>
                <Typography> Правильно! </Typography>

                <div className={classes.tableBody}>
                    <div className={classes.table}>
                        <Typography className={classes.tableTitle}> Результат выполнения запроса</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                {answer.map(row =>
                                    <TableRow>
                                        {row.map(cell =>
                                            <TableCell>
                                                {cell}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                )}
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </Box>
        );
    }

    changeTabToMethodical = (subMaterialId) => () => {
        this.props.actions.setCurrentCourseTab(2);
        this.props.actions.getCourseMethodicalMaterial(subMaterialId);
        this.props.actions.getCourseMethodicalMaterials();
    }

    themes = () => {
        const {classes, themes} = this.props;

        return (
            <div className={classes.themesContainer}>
                <Typography className={classes.title}> Темы для изучения </Typography>

                {themes.map(item => <div key={item.theme.id}>
                        <Typography className={classes.materialItem}>{item.theme.title}</Typography>
                        {item.theme.topic_in_themes.map(topic =>
                            <div key={`topic-${topic.id}`}
                                 className={classes.materialSubItem}
                                 onClick={this.changeTabToMethodical(topic.id)}>
                                <Typography>{topic.topic_name}</Typography>
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }

    databaseStructure = () => {
        const {classes, task} = this.props;

        const taskDescription = get(task, `database_description`, '');
        const taskImage = get(task, `database_image`, '');

        return (
            <>
                <Typography className={classes.title}> Описание базы данных </Typography>

                <Typography dangerouslySetInnerHTML={{__html: taskDescription}} />
                <div className={classes.image} onClick={this.openBigImageClickHandler}> <img src={taskImage} alt=""/> </div>
            </>
        )
    }

    getCurrentTaskErrors = () => {
        const {courseId, task, errors} = this.props;

        return errors[courseId]?.[task.id] || []
    }

    render() {
        const {task, classes, error, tableErrorData, answer, nextRoute, isDone} = this.props;
        const taskText = get(task, `task_text`, null);
        const taskTitle = get(task, `title`, '');
        const refResult = get(tableErrorData, [Enum.ERROR_REF_RESULT, 1, 1], []);
        const studentResult = get(tableErrorData, [Enum.ERROR_STUDENT_RESULT, 1, 1], []);
        const taskImage = get(task, `database_image`, '');
        const errors = this.getCurrentTaskErrors().reverse();

        const {openBigImage} = this.state;

        if (!taskText) return <></>;

        return (
            <div className={classes.taskRoot}>

                <div className={classes.leftSide}>

                    <Scrollbars minheight={300}>
                        <div style={{marginRight: '10px'}}>
                            <div>
                                <Typography className={classes.title}> {taskTitle}: </Typography>
                                <Typography> {taskText} </Typography>

                                <div className={classes.answerFieldBlock}>
                                    {this.renderAnswerField()}
                                </div>
                            </div>

                            <div className={classes.taskAnswerInfoBlock}>
                                {error &&
                                <Paper className={classes.simpleErrorBlock}>
                                    <Typography className={classes.simpleErrorText}> {error} </Typography>
                                </Paper>
                                }

                                {refResult.length > 0 && studentResult.length > 0 && this.renderErrorTables()}

                                {answer.length > 0 && this.renderAnswerTable()}
                            </div>

                            <div className={classes.errorsList}>
                                <Typography className={classes.historyTitle}><b>История выполнения</b></Typography>
                                {errors.map((item, index) =>
                                  <div className={classes.errorBlock}>
                                      <Typography className={classes.errorTitle}>
                                          Ошибка
                                      </Typography>
                                      <Typography> {item.message} </Typography>
                                      {index !== 0 ? <Typography> {item.answer} </Typography> : <></>}
                                  </div>
                                )}
                            </div>
                        </div>
                    </Scrollbars>
                </div>

                <div className={classes.taskInfo}>
                    {nextRoute.id &&
                        <Button color={'primary'}
                                className={classes.nextTaskButton}
                                onClick={this.goToNextTaskClickHandler}
                                endIcon={<ArrowForward/>}
                        >
                            {isDone ? 'Следующее задание' : 'Пропустить задание'}
                        </Button>
                    }

                    <Scrollbars minheight={300}>
                        <div className={classes.taskInfoContent}>
                            {this.themes()}
                            {this.databaseStructure()}
                        </div>
                    </Scrollbars>
                </div>

                <BigImageModal isOpen={openBigImage}
                               closeImage={this.closeBigImageClickHandler}
                               taskImage={taskImage}
                />
            </div>
        )
    }
}

Task.propTypes = {
    changeTabToMethodical: PropTypes.func,
    error: PropTypes.any,
    isDone: PropTypes.bool,
    task: PropTypes.object,
    actions: PropTypes.object,
    tableErrorData: PropTypes.object,
    currentTask: PropTypes.string,
    nextRoute: PropTypes.object,
};

export default withStyles(styles)(connect(Task));
