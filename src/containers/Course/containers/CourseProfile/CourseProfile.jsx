import React from 'react';
import cn from 'classnames';
import { Avatar, Grid, makeStyles, Typography, Tooltip } from '@material-ui/core';

import IndividualRoute from './components/IndividualRoute/IndividualRoute';
import withCourseProfileDate from './withCourseProfileDate';
import Scrollbars from 'react-custom-scrollbars';
import CircularProgressWithLabel from '../../../../components/CircularProgressWithLabel';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    padding: 40,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: '#5f27cd',
  },
  topInfo: {
    display: 'flex',
    alignItems: 'center',
    columnGap: 10
  },
  rankImg: {
    width: '1em'
  },
  userInfo: {
    margin: '20px 0px',
    padding: 10,
    border: '1px solid #d2d2d2'
  },
  achievements: {
    margin: '20px 0px',
    padding: 10,
    border: '1px solid #d2d2d2',
  },
  achievItem: {
    width: 50,
    height: 50,
    margin: 5,
  },
  achievDisable: {
    opacity: '.4',
  },
  topics: {
    marginBottom: 100
  },
  topic: {
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: 10
  }
}));

const badges = [
  { url: 'https://image.flaticon.com/icons/png/512/4832/4832078.png', title: 'Самый умный', has: true, },
  { url: 'https://image.flaticon.com/icons/png/512/4832/4832045.png', title: 'Самый быстрый', has: true, },
  { url: 'https://image.flaticon.com/icons/png/512/4832/4832193.png', title: 'Никогда не ошибаешься', has: true, },
  { url: 'https://image.flaticon.com/icons/png/512/4832/4832270.png', title: 'Самый умный', has: true, },
  { url: 'https://image.flaticon.com/icons/png/512/4832/4832091.png', title: 'Самый умный', has: false, },
  { url: 'https://image.flaticon.com/icons/png/512/4832/4832388.png', title: 'Самый умный', has: true, },
  { url: 'https://image.flaticon.com/icons/png/512/4832/4832351.png', title: 'Самый умный', has: false, },
  { url: 'https://image.flaticon.com/icons/png/512/4832/4832153.png', title: 'Самый умный', has: true, },
  { url: 'https://image.flaticon.com/icons/png/512/4832/4832376.png', title: 'Самый умный', has: false, },
  { url: 'https://image.flaticon.com/icons/png/512/4832/4832933.png', title: 'Самый умный', has: false, },
]

const CourseProfile = ({
  routeData,
  account: { first_name, last_name, group_number },
  course: { title },
  courseTopics,
}) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Scrollbars>
        <Grid container item xs>
          <Grid container item xs={3}>
            <Grid item>
              <div className={classes.topInfo}>
                <Avatar className={classes.avatar}>ПК</Avatar>
                <Typography variant="h5" color="primary">Пукки Константин</Typography>
              </div>
              <div className={classes.userInfo}>
                <Typography>Группа: Y2437</Typography>
                <Typography>Рейтинг: 0%</Typography>
                <Typography>Ранг: Отсутствует</Typography>
              </div>
            </Grid>

            <Grid container item>
              <Typography variant="h5" color="primary">Мои достижения</Typography>
              <Grid container item className={classes.achievements}>
                {badges.map((item, i) => (
                  <Tooltip title={item.title} placement="top">
                    <img className={cn(classes.achievItem, { [classes.achievDisable]: !item.has })} src={item.url} alt={item.title} />
                  </Tooltip>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Grid container item xs>
            <IndividualRoute nodes={routeData.nodes} edges={routeData.edges} />
          </Grid>
        </Grid>

        <Grid className={classes.topics} container item direction="column" justify="space-between" xs>
          <Typography variant="h4" color="primary">Курс "{title}"</Typography>
          {courseTopics.map((topic, i) =>
            <div key={i} className={classes.topic}>
              <Typography variant="h6">{topic.theme.title}</Typography>
              <CircularProgressWithLabel value={topic.degree_of_mastering} />
            </div>
          )}
        </Grid>
      </Scrollbars>
    </Grid>
  );
};

export default withCourseProfileDate(CourseProfile);
