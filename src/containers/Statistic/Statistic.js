import React, {useEffect} from "react";
import Pagination from '@material-ui/lab/Pagination';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {HorizontalBar} from "react-chartjs-2";
import Scrollbars from "react-custom-scrollbars";
import colors from "../Course/containers/Statistics/colors";
import Paper from "@material-ui/core/Paper";
import {useDispatch, useSelector} from "react-redux";
import {useStyles} from "./Statistic.styles";
import actions from "./actions";
import {getAllCount, getCourseStatistic, getCurrentPage, getStatisticList} from "./getters";

export default () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const statistic = useSelector((state) => getStatisticList(state))
    const allCount = useSelector((state) => getAllCount(state))
    const currentPage = useSelector((state) => getCurrentPage(state))
    const courseStatistic = useSelector((state) => getCourseStatistic(state))

    useEffect(() => {
        dispatch(actions.getStatistic());
        dispatch(actions.getCourseStatistic());
    }, []);

    const handleChangePage = (event, page) => {
        dispatch(actions.changeCurrentPage(page));
        dispatch(actions.getStatistic());
    }

    const data = {
        labels:
            statistic.map(person => `${person.first_name} ${person.last_name}`),
        datasets: [
            {
                label: 'Выполненные задания',
                backgroundColor: colors.map(color => color.backgroundColor),
                borderColor: colors.map(color => color.borderColor),
                borderWidth: colors.map(color => color.borderWidth),
                hoverBackgroundColor: colors.map(color => color.hoverBackgroundColor),
                hoverBorderColor: colors.map(color => color.hoverBorderColor),
                data: statistic.map(tasks => tasks.completed_tasks)
            }
        ]

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

    return (
        <Paper className={classes.root}>
            <Scrollbars minheight={3000}>
                <Box className={classes.root}>
                    <div className={classes.courseInfo}>
                        <Typography component={'h1'}> {courseStatistic.course} </Typography>
                        <Typography> Выполнено {courseStatistic.completed_tasks} из {courseStatistic.all_tasks} заданий</Typography>
                    </div>
                    <Typography className={classes.title} component={'h2'}> Статистика учебной группы </Typography>
                    <div height={'20%'}>
                        <HorizontalBar
                            data={data}
                            options={options}
                        />
                    </div>
                    <div className={classes.footer}>
                        <Pagination count={Math.ceil(allCount / 10)}
                                    page={currentPage}
                                    onChange={handleChangePage}
                                    color="primary"
                        />
                    </div>
                </Box>
            </Scrollbars>
        </Paper>
    );
}

