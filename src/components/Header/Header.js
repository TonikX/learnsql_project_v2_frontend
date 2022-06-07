import React from 'react'
import PropTypes from "prop-types"
import Link from "react-router-dom/Link"
import classNames from 'classnames'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircleOutlined'
import HelpIcon from '@material-ui/icons/HelpOutline'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import withStyles from '@material-ui/core/styles/withStyles'

import UserService from "../../service/user-service"
import {appRouter} from "../../service/router-service"

import logo from './logo.svg'

import styles from './Header.styles'

const userService = UserService.factory();

class Header extends React.PureComponent {
  state = {
    anchorEl: null,
    anchorElMyCourses: null,
  };

  handleMenu = event => {
    this.setState({anchorEl: event.currentTarget})
  };

  handleClose = () => {
    this.setState({anchorEl: null})
  };

  handleLogout = () => {
    userService.logout()
    this.handleClose()
    this.props.logout()
  };

  render() {
    const {classes, isAuth} = this.props
    const {anchorEl} = this.state
    const isOpenAvatarMenu = Boolean(anchorEl)

    return (
      <AppBar position="fixed" className={classes.header}>
        <Toolbar>
          {isAuth &&
            <>
              <img src={logo} className={classes.logo}/>
              <Typography variant="button">
                <Link to={appRouter.getAllCoursesRoute()} className={classes.link}>Все курсы</Link>
              </Typography>
              <Typography variant="button">
                <Link to={appRouter.getMyCoursesRoute()} className={classes.link}>Мои курсы</Link>
              </Typography>
              <Typography variant="button">
                <Link to={appRouter.getFAQLink()} className={classes.link}>FAQ</Link>
              </Typography>
              <Link to={appRouter.getFeedbackLink()} className={classNames(classes.link, classes.help)}><HelpIcon/></Link>
              <div>
                <IconButton
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle/>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={isOpenAvatarMenu}
                  onClose={this.handleClose}
                  PopoverClasses={{
                    root: classes.popper
                  }}
                >
                  <MenuItem onClick={this.handleClose}>
                    <Link to={appRouter.getProfileRoute()}
                          className={classes.menuLink}
                    >
                      Профиль
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to={appRouter.getDatabasesRoute()} className={classNames(classes.menuLink, classes.help)}>
                      Админка
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleLogout}>
                    <Link to={appRouter.getLandingPath()}
                          className={classes.menuLink}
                    >
                      Выйти
                    </Link>
                  </MenuItem>
                </Menu>
              </div>
            </>
          }
        </Toolbar>
      </AppBar>
    );
  }
}

//TODO: уровень доступа к кнопке только админу

Header.propTypes = {
  isAuth: PropTypes.bool,
  logout: PropTypes.func,
};

export default withStyles(styles)(Header);