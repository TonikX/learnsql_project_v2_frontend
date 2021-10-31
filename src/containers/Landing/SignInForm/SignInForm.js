import React, {useCallback, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '../../../components/Button'
import { service } from '../service'
import { service as userService } from '../../../service/user-service'
import actions from '../../../layout/actions'
import {appRouter} from '../../../service/router-service'
import layoutActions from '../../../layout/actions'
import { useStyles } from './SignIn.styles'

export default () => {
  const [email, setEmail] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [lostPassword, setLostPassword] = useState(false)
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = useCallback(async () => {
    try {
      const res = await service.signIn(password, login)
      const token = res?.data?.access_token
      userService.setToken(token)
      dispatch(actions.setAuthTrue())
      history.push(appRouter.getAllCoursesRoute())
    } catch (e) {
      dispatch(actions.fetchingFailed(e));
    }

    setLogin('')
    setPassword('')
  }, [login, password])

  const handleResetPassword = useCallback(async () => {
    try {
      await service.resetPassword(email)
      dispatch(layoutActions.fetchingSuccess(['Проверьте почту']));
    } catch (e) {
      dispatch(actions.fetchingFailed(['Произошла ошибка']));
    }

    setEmail('')
  }, [email])

  const handleLoginGoogle = () => {
    debugger
    // eslint-disable-next-line no-restricted-globals
    location.href = `https://accounts.google.com/o/oauth2/auth?client_id=436575162733-dh4ru27585ft6salfbm9fiul63gccj5n.apps.googleusercontent.com&redirect_uri=${location?.href}googleoauth2&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile+openid+openid+email+profile`
  }

  return (
    <div className={classes.form}>
      {lostPassword ?
        <>
          <TextField
            label='Email'
            InputLabelProps={{ shrink: true }}
            className={classes.input}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Typography
            className={classes.link}
            onClick={() => setLostPassword(!lostPassword)}
          >
            Войти
          </Typography>
          <Button
            type='outlined'
            color='primary'
            className={classes.button}
            disabled={email.length === 0}
            onClick={handleResetPassword}
          >
            Восстановить пароль
          </Button>
        </>
        :
        <>
          <TextField
            label='Логин'
            InputLabelProps={{ shrink: true }}
            className={classes.input}
            onChange={(e) => setLogin(e.target.value)}
            value={login}
          />
          <TextField
            label='Пароль'
            InputLabelProps={{ shrink: true }}
            className={classes.input}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
          />
          <Typography
            className={classes.link}
            onClick={() => setLostPassword(!lostPassword)}
          >
            Забыли пароль?
          </Typography>
          <Button
            type='outlined'
            color='primary'
            className={classes.button}
            disabled={login.length === 0 || password.length === 0}
            onClick={handleLogin}
          >
            Войти
          </Button>
          <Button
            type='outlined'
            color='primary'
            onClick={handleLoginGoogle}
            className={classes.googleButton}
          >
            Войти через аккаунт GOOGLE
          </Button>
        </>
      }
    </div>
  )
}