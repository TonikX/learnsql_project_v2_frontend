import UserService from "../../service/user-service";
import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../Courses/Courses.styles";
import connect from "../Courses/Courses.connect";
import {Redirect} from "react-router";
import {appRouter} from "../../service/router-service";

const userService = UserService.factory();

class Themes extends React.PureComponent {
    componentDidMount() {
        this.props.actions.getThemes();
    };

    render() {
        const {classes, auth, themes} = this.props;
        const isAuth = userService.isAuth() && auth;

        if (!isAuth) return <Redirect to={appRouter.getLandingPath()} />;

        return (
            <div>
                Я тема
            </div>
        );
    }
}

Themes.propTypes = {
    classes: PropTypes.object,
    actions: PropTypes.object,
    themes: PropTypes.array,
    auth: PropTypes.bool,
};

export default withStyles(styles)(connect(Themes));