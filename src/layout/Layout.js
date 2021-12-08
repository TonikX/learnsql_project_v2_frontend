import React from 'react';
import PropTypes from "prop-types";
import className from 'classnames';

import {SnackbarProvider} from 'notistack';
import {withRouter} from 'react-router-dom';

import {MuiThemeProvider} from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles';

import UserService from '../service/user-service';

import Header from '../components/Header';
import Menu from '../components/Menu';
import AbsoluteLoader from '../components/AbsoluteLoader';
import Notificator from '../components/Notificator';

import theme from './themeMaterialUi';

import connect from './Layout.connect';
import styles from './Layout.styles';
import shallowEqual from "recompose/shallowEqual";

const userService = UserService.factory();

class Layout extends React.Component {
  state = {
    openMenu: false
  };

  componentWillMount() {
    const isAuth = userService.isAuth();

    if (isAuth) {
      this.props.actions.refreshToken(userService.getRefreshToken());
      this.props.actions.setAuthTrue();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props.errors, nextProps.errors)
      || !shallowEqual(this.props.successMessages, nextProps.successMessages)
      || !shallowEqual(this.props.children, nextProps.children)
      || this.props.fetching !== nextProps.fetching
      || this.props.auth !== nextProps.auth
      || this.state.openMenu !== nextState.openMenu
      ;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.auth && !prevProps.auth && this.props.myCourses.length === 0) {
      this.props.actions.getMyCourses();
    }
  }

  handleOpenMenu = () => {
    this.setState({openMenu: true});
  };

  handleCloseMenu = () => {
    this.setState({openMenu: false});
  };

  logout = () => {
    this.props.actions.setAuthFalse();
    this.handleCloseMenu();
  };

  render() {
    const {openMenu} = this.state;
    const {classes, fetching, errors, successMessages, auth, myCourses} = this.props;
    const isAuth = userService.isAuth() && auth;
    const isLanding = this.props.location.pathname === '/'

    return (
      <SnackbarProvider maxSnack={3}>
        <MuiThemeProvider theme={theme}>
          {!isLanding && <AbsoluteLoader isFetching={fetching}/>}
          <Notificator errors={errors} successMessages={successMessages}/>
          {!isLanding &&
          <>
            <Header handleOpenMenu={this.handleOpenMenu}
                    handleCloseMenu={this.handleCloseMenu}
                    openGeneralMenu={openMenu}
                    isAuth={isAuth}
                    logout={this.logout}
            />
            <div className={classes.root}>
              {isAuth && <Menu isOpen={openMenu} myCourses={myCourses}/>}
              <div className={className(classes.content, {[classes.contentShift]: openMenu})}>
                {this.props.children}
              </div>
            </div>
          </>
          }
          {isLanding && <>
            {this.props.children}
          </>}
        </MuiThemeProvider>
      </SnackbarProvider>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.any,
  errors: PropTypes.array,
  myCourses: PropTypes.array,
  fetching: PropTypes.bool
};

export default withRouter(connect(withStyles(styles)(Layout)));
