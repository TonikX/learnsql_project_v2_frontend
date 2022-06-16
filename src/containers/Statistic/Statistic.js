import React, {useEffect, useState} from "react";
import Pagination from '@material-ui/lab/Pagination';
import Typography from "@material-ui/core/Typography";
import {HorizontalBar} from "react-chartjs-2";
import colors from "../Course/containers/Statistics/colors";
import Paper from "@material-ui/core/Paper";
import {useDispatch, useSelector} from "react-redux";
import {useStyles} from "./Statistic.styles";
import actions from "./actions";
import {getAllCount, getCourseStatistic, getCurrentPage, getStatisticList} from "./getters";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TasksIcon from "@material-ui/icons/RateReviewOutlined";
import UsersIcon from "@material-ui/icons/RateReviewOutlined";
import MethodicalIcon from "@material-ui/icons/LibraryBooksOutlined";
import {appRouter} from "../../service/router-service";
import TextField from "@material-ui/core/TextField";

const mocData = [
    {
        "id": 254,
        "username": "admin11",
        "first_name": "",
        "last_name": "",
        "email": "admin11@gmai.com",
        "role": "student",
        "completed_tasks": 1,
        "all_tasks": 60
    },
    {
        "id": 300,
        "username": "lerart",
        "first_name": "Валерия",
        "last_name": "Артамонова",
        "email": "lerartlera@gmail.com",
        "role": "student",
        "completed_tasks": 1,
        "all_tasks": 60
    },
    {
        "id": 3,
        "username": "millioner26",
        "first_name": "Petya",
        "last_name": "Petrov",
        "email": "millionert19@mail.ru",
        "role": "student",
        "completed_tasks": 0,
        "all_tasks": 0
    },
    {
        "id": 4,
        "username": "millionert105",
        "first_name": "Petya",
        "last_name": "",
        "email": "millionert10@mail.ru",
        "role": "student",
        "completed_tasks": 0,
        "all_tasks": 0
    },
    {
        "id": 1175,
        "username": "bulatov",
        "first_name": "Альберт",
        "last_name": "Фазлыев",
        "email": "albert.fz@yandex.ru",
        "role": "student",
        "completed_tasks": 0,
        "all_tasks": 0
    },
    {
        "id": 1222,
        "username": "alina_dadashzade",
        "first_name": "Алина",
        "last_name": "Дадашзаде",
        "email": "alina.dadashzade@mail.ru",
        "role": "student",
        "completed_tasks": 0,
        "all_tasks": 0
    },
    {
        "id": 1223,
        "username": "bulatovv",
        "first_name": "Альберт",
        "last_name": "Фазлыев",
        "email": "albert.koch1973@gmail.com",
        "role": "student",
        "completed_tasks": 0,
        "all_tasks": 0
    },
    {
        "id": 673,
        "username": "apmbox",
        "first_name": "Александр",
        "last_name": "Попов",
        "email": "apmbox@gmail.com",
        "role": "student",
        "completed_tasks": 0,
        "all_tasks": 0
    },
    {
        "id": 1224,
        "username": "danya123",
        "first_name": "Danil",
        "last_name": "Krivorogov",
        "email": "danniill.k41@gmail.com",
        "role": "student",
        "completed_tasks": 0,
        "all_tasks": 0
    },
    {
        "id": 1242,
        "username": "Rika",
        "first_name": "Кира",
        "last_name": "Кирова",
        "email": "stud0000241559@study.utmn.ru",
        "role": "student",
        "completed_tasks": 0,
        "all_tasks": 0
    }
]

export default () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    // const statistic = useSelector((state) => getStatisticList(state))
    const allCount = useSelector((state) => getAllCount(state))
    const currentPage = useSelector((state) => getCurrentPage(state))
    const courseStatistic = useSelector((state) => getCourseStatistic(state))
    const [statistic, setStatistic] = useState([])
    const [currentCourseTab, setCurrentCourseTab] = useState(0)
    useEffect(() => {
        // console.log("alo")
        // dispatch(actions.getStatistic());
        // dispatch(actions.getCourseStatistic());
    }, []);

    useEffect(() => {
        setStatistic(mocData)
    }, [])

    const handleChangePage = (event, page) => {
        dispatch(actions.changeCurrentPage(page));
        dispatch(actions.getStatistic());
    }

    const changeTabHandler = (event, tabNumber) => {
        // const {courseId} = this.props;
        // this.props.actions.setCurrentCourseTab(tabNumber);

        switch (tabNumber) {
            default:
            case 0:
                setCurrentCourseTab(tabNumber)
                // this.props.history.push(appRouter.getCourseStatisticsLink(courseId));
                break;
            case 1:
                setCurrentCourseTab(1)
                // this.props.history.push(appRouter.getCourseMaterialsLink(courseId));
                break;
            case 2:
                // this.props.history.push(appRouter.getCourseTasksLink(courseId));
                break;
        }
    };

    const [selectorOpen, setSelectorOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState('K34402')

    const [groups] = useState(['K34402', 'K34401', 'K3240', 'K3241'])

    const renderTabMenu = () => {
        return (

            <div className={classes.tabMenu}>
                <Tabs value={currentCourseTab}
                      onChange={changeTabHandler}
                      className={classes.tabs}
                >
                    {/*<Tab label={'Статистика'}*/}
                    {/*     className={classes.tab}*/}
                    {/*     icon={<StatisticsIcon />}*/}
                    {/*     classes={{*/}
                    {/*         wrapper: classes.tabRoot,*/}
                    {/*         selected: classes.tabSelected,*/}
                    {/*     }}*/}
                    {/*/>*/}
                    <Tab label={'Общий Рейтинг'}
                         className={classes.tab}
                         icon={<UsersIcon/>}
                         classes={{
                             wrapper: classes.tabRoot,
                             selected: classes.tabSelected,
                         }}
                    />
                    <Tab label={'Рейтинг по группам'}
                         className={classes.tab}
                         icon={<MethodicalIcon/>}
                         classes={{
                             wrapper: classes.tabRoot,
                             selected: classes.tabSelected,
                         }}
                    />
                </Tabs>
                <div className={classes.selector} onClick={()=>setSelectorOpen(prev => !prev)}>
                    {selectedGroup}
                    <div className={classes.selectorList + ` ${selectorOpen ? classes.selectorList_show : ''}`}>
                        {groups.map((group, i) => (
                            <span className={classes.selectorEl} key={i} onClick={() => setSelectedGroup(group)}>{group}</span>
                        ))}
                    </div>
                </div>
            </div>
        );
    };
    const data = {
        labels: statistic.map(person => `${person.first_name} ${person.last_name}`),
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


    const getOverallRating = () => {
        return (
            <>

                <div>
                    {/*<div className={classes.courseInfo}>*/}
                    {/*    <Typography component={'h1'}> {courseStatistic.course} </Typography>*/}
                    {/*    <Typography> Выполнено {courseStatistic.completed_tasks} из {courseStatistic.all_tasks} заданий</Typography>*/}
                    {/*</div>*/}
                    {/*<Typography className={classes.title} component={'h2'}> Общий Рейтинг </Typography>*/}
                    <HorizontalBar
                        data={data}
                        options={options}
                        height={80}
                    />
                    <div className={classes.footer}>
                        <Pagination count={Math.ceil(allCount / 10)}
                                    page={currentPage}
                                    onChange={handleChangePage}
                                    color="primary"
                        />
                    </div>
                </div>
                {/*</Paper>*/}


                <div className={classes.tableContainer}>
                    <div className={classes.table}>
                        <div className={classes.tableHeader}>
                        <span className={classes.tableHeaderColumn}>
                            Общий рейтинг
                        </span>
                            <span className={classes.tableHeaderColumn}>
                            Студент
                        </span>
                            <span className={classes.tableHeaderColumn}>
                            Статус
                        </span>
                        </div>
                        <div className={classes.tableBody}>
                            <div className={classes.tableRow}>
                        <span className={classes.tableRowColumn}>
                            100
                        </span>
                                <span className={classes.tableRowColumn}>
                            Анна Малинина
                        </span>
                                <span className={classes.tableRowColumn}>
                            Студент ИТМО
                        </span>
                            </div>
                            <div className={classes.tableRow}>
                            <span className={classes.tableRowColumn}>
                                99
                            </span>
                                <span className={classes.tableRowColumn}>
                                Василий Ли
                            </span>
                                <span className={classes.tableRowColumn}>
                                Студент ИТМО
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const getRatingByGroup = () => {
        return (
            <>
                <div>
                    <HorizontalBar
                        data={data}
                        options={options}
                        height={80}
                    />
                    <div className={classes.footer}>
                        <Pagination count={Math.ceil(allCount / 10)}
                                    page={currentPage}
                                    onChange={handleChangePage}
                                    color="primary"
                        />
                    </div>
                </div>
            </>
        )
    }

    return (
        <Box className={classes.courseTabContent}>
            <Paper className={classes.paper}>
                {renderTabMenu()}
                {/*<Paper>*/}
                {
                    currentCourseTab === 0 && getOverallRating()
                }
                {
                    currentCourseTab === 1 && getRatingByGroup()
                }
            </Paper>
        </Box>
    );
}

