import React from 'react';
import PropTypes from "prop-types";

import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import DoneIcon from '@material-ui/icons/Done';
import withStyles from '@material-ui/core/styles/withStyles';

import Task from './Task';

import {getTaskId} from "../../getters";

import connect from './Tasks.connect';
import styles from './Tasks.styles';
import Scrollbars from "react-custom-scrollbars";

class Tasks extends React.PureComponent{
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.courseId !== prevProps.courseId){
            this.props.actions.getCourseTasks();
        }
    }

    componentDidMount() {
        this.props.actions.getCourseTasks();
    }

    changeTaskHandler = (routeId, id) => () => {
        this.props.actions.setCurrentRouteId(routeId);
        this.props.actions.getCourseTask(id);
    };

    renderMenu = () => {
        const {tasks, classes, currentRouteId} = this.props;

        return (
            <MenuList className={classes.menu}>
                <Scrollbars minheight={300}>
                    {tasks.map((route, index) =>
                        <MenuItem
                            onClick={this.changeTaskHandler(route.id, getTaskId(route))}
                            key={`task-${index}`}
                            selected={currentRouteId === route.id}
                            className={classes.menuItem}
                            classes={{
                                selected: classes.selectedMenuItem,
                                root: classes.menuItem,
                            }}
                        >
                            Задание {index + 1}
                            {route.status === "1" && <DoneIcon className={classes.doneIcon}/>}
                        </MenuItem>
                    )}
                </Scrollbars>
            </MenuList>
        )
    };

    render() {
        const {classes, isFetchingGet} = this.props;

        return(
            <Box display={'flex'} className={classes.root}>
                {this.renderMenu()}
                {!isFetchingGet && <Task />}
            </Box>
        );
    }
}

Tasks.propTypes = {
    changeTabToMethodical: PropTypes.func,
    tasks: PropTypes.array,
    courseId: PropTypes.string,
    currentRouteId: PropTypes.number,
    actions: PropTypes.object,
    isFetchingGet: PropTypes.bool
};

export default withStyles(styles)(connect(Tasks));