import React, {useCallback, useEffect, useState, useMemo} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import BackIcon from '@material-ui/icons/ArrowBackIos'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'
import Button from '../../../components/Button'
import * as Enum from '../../SignUp/enum'
import {getFieldValue} from '../../SignUp/getters'
import actions from '../../SignUp/actions'
import layoutActions from '../../../layout/actions';
import { useStyles } from './SignUpForm.styles'
import { service } from '../service'

export default () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [showSuccessSignUp, setShowSuccessSignUp] = useState(false)
  const periods = useSelector((state) => getFieldValue(state, Enum.PERIODS))
  const organisations = useSelector((state) => getFieldValue(state, Enum.ORGANISATIONS))
  const groups = useSelector((state) => getFieldValue(state, Enum.GROUPS))
  const [activeStep, setActiveStep] = useState(1)
  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [isuNumber, setIsuNumber] = useState('')
  const [isStudent, setIsStudent] = useState(false)
  const [organisation, setOrganisation] = useState('')
  const [period, setPeriod] = useState('')
  const [group, setGroup] = useState('')
  const handleClickButton = useCallback(() => {
    if (activeStep === 1) {
      setActiveStep(2)
    }
  }, [activeStep])

  useEffect(() => {
    if (period.length && organisation.length){
      dispatch(actions.signUpGetGroups({
        period,
        organization: organisation,
      }))
    }
  }, [period, organisation, dispatch])
  
  const disableButton = useMemo(() => {
    if (login.length === 0){
      return true
    }
    if (email.length === 0){
      return true
    }
    if (firstName.length === 0){
      return true
    }
    if (lastName.length === 0){
      return true
    }
    if (password.length === 0){
      return true
    }
    if (isStudent){
      if (organisation.length === 0){
        return true
      }
      if (group.length === 0){
        return true
      }
      if (period.length === 0){
        return true
      }
      if (isuNumber.length === 0){
        return true
      }
    }
  }, [email, firstName, group, isStudent, isuNumber, lastName, login, organisation, password, period])

  const handleSignUp = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append('username', login)
      formData.append('password', password)
      formData.append('email', email)
      formData.append('first_name', firstName)
      formData.append('last_name', lastName)
      formData.append('group_number', group)
      formData.append('organisation', organisation)
      formData.append('period', period)
      formData.append('isu_number', isuNumber)
      await service.signUp(formData)
      setShowSuccessSignUp(true)
    } catch (e){
      dispatch(layoutActions.fetchingFailed(e));
    }
  }, [email, firstName, group, isStudent, isuNumber, lastName, login, organisation, password, period])

  useEffect(() => {
    setOrganisation('')
    setPeriod('')
    setGroup('')
    setIsuNumber('')
  }, [isStudent])

  if (showSuccessSignUp){
    return (
      <div className={classes.form}>
        <CheckCircleRoundedIcon className={classes.successIcon} />
        <Typography className={classes.successTitle}>Готово!</Typography>
        <Typography className={classes.successDescription}>
          Вы успешно зарегистрированы в системе
        </Typography>
      </div>
    )
  }

  return (
    <div className={classes.form}>
      {activeStep === 1 ?
        <>
          <TextField
            label="Логин"
            InputLabelProps={{ shrink: true }}
            className={classes.input}
            onChange={(e) => setLogin(e.target.value)}
            value={login}
          />
          <TextField
            label="Email"
            InputLabelProps={{ shrink: true }}
            className={classes.input}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            label="Имя"
            InputLabelProps={{ shrink: true }}
            className={classes.input}
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <TextField
            label="Фамилия"
            InputLabelProps={{ shrink: true }}
            className={classes.input}
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <TextField
            label="Пароль"
            InputLabelProps={{ shrink: true }}
            className={classes.input}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
          <div className={classes.student}>
            <Checkbox
              onChange={(e, checked) => setIsStudent(checked)}
              checked={isStudent}
            />
            <Typography> Я студент </Typography>
          </div>
        </>
        :
        <>
          <Typography className={classes.back} onClick={() => setActiveStep(1)}>
            <BackIcon /> Назад
          </Typography>

          <FormControl className={classes.selectField}>
            <InputLabel id="organisation-selector-label">Организация</InputLabel>
            <Select
              labelId="organisation-selector-label"
              onChange={(e) => setOrganisation(e.target.value)}
            >
              {organisations.map(organisation =>
                <MenuItem value={organisation} key={`group-${organisation}`}>
                  {organisation}
                </MenuItem>
              )}
            </Select>
          </FormControl>

          <FormControl className={classes.selectField}>
            <InputLabel id="period-selector-label">Период обучения</InputLabel>
            <Select
              labelId="period-selector-label"
              onChange={(e) => setPeriod(e.target.value)}
            >
              {periods.map(period =>
                <MenuItem value={period} key={`group-${period}`}>
                  {period}
                </MenuItem>
              )}
            </Select>
          </FormControl>

          {organisation.length && period.length ?
            <>
              <FormControl className={classes.selectField}>
                <InputLabel id="group-selector-label">Группа</InputLabel>
                <Select
                  labelId="group-selector-label"
                  onChange={(e) => setGroup(e.target.value)}>
                  {groups.map(group =>
                    <MenuItem value={group.id} key={`group-${group.id}`}>
                      {group.title}
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
              <TextField label="Табельный номер"
                         className={classes.input}
                         onChange={(e) => setIsuNumber(e.target.value)}
                         type="number"
                         value={isuNumber}
              />
            </>
            : <></>
          }
        </>
      }

      <Button
        type="outlined"
        color="primary"
        className={classes.button}
        disabled={disableButton && !(activeStep === 1 && isStudent)}
        onClick={() => activeStep === 1 && isStudent ? handleClickButton() : handleSignUp()}
      >
        {activeStep === 1 && isStudent ? 'Далее' : 'Зарегистрироваться'}
      </Button>
    </div>
  )
}