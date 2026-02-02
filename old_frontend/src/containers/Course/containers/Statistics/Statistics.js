import React from 'react';
import PropTypes from "prop-types";
import get from 'lodash/get';

import Scrollbars from "react-custom-scrollbars";
import { HorizontalBar } from 'react-chartjs-2';

import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import withStyles from '@material-ui/core/styles/withStyles';

import colors from './colors';
import connect from './Statistics.connect';
import styles from './Statistics.styles';

class Statistics extends React.PureComponent{
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.courseId !== prevProps.courseId){
            this.props.actions.getCourseStatistics();
        }
    }

    getMappedDataWithLabels = () => {
        const {statistics} = this.props;
        const leader_board = get(statistics, 'lider_board', []);

        const usersWithCompletedTasks = leader_board.filter(person => person.all_tasks > 0);

        return {
            data: usersWithCompletedTasks.map(user => user.completed_tasks),
            labels: usersWithCompletedTasks.map(user => user.fio),
        };
    }

    render() {
        const {classes, statistics} = this.props;

        const mappedDataWithLabels = this.getMappedDataWithLabels();

        const data = {
            labels: mappedDataWithLabels.labels,
            datasets: [
                {
                    label: 'Выполненные задания',
                    backgroundColor: colors.map(color => color.backgroundColor),
                    borderColor: colors.map(color => color.borderColor),
                    borderWidth: colors.map(color => color.borderWidth),
                    hoverBackgroundColor: colors.map(color => color.hoverBackgroundColor),
                    hoverBorderColor: colors.map(color => color.hoverBorderColor),
                    data: mappedDataWithLabels.data
                }
            ],
        };

        const options = {
            scales: {
                xAxes: [{
                    ticks: {
                        stepSize: 1,
                        unit: 1
                    },
                }]
            },
            legend: {
                display: false,
            },
        };

        return(
            <Scrollbars minheight={300}>
                <Box className={classes.root}>
                    <div className={classes.courseInfo}>
                        <Typography className={classes.title} component={'h1'}> {statistics.course} </Typography>
                        <Typography> Выполнено {statistics.completed_tasks} из {statistics.all_tasks} заданий</Typography>
                    </div>

                    <Typography className={classes.title} component={'h2'}> Статистика учебной группы </Typography>

                    <div className={classes.graph}>
                        <HorizontalBar
                            data={data}
                            options={options}
                        />
                    </div>
                </Box>
            </Scrollbars>
        );
    }
}

Statistics.propTypes = {
    actions: PropTypes.object,
    statistics: PropTypes.object,
};

export default withStyles(styles)(connect(Statistics));