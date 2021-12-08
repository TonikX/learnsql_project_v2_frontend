import React, {useEffect, useState, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Link from 'react-router-dom/Link'
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import CloseButton from '@material-ui/icons/CloseOutlined'
import Button from '../../components/Button'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import { useStyles } from './Langing.styles'
import mainBG from './img/main-bg.png'
import logo from './img/logo.svg'
import questionImage1 from './img/question-image-1.png'
import questionImage2 from './img/question-image-2.png'
import offerImage1 from './img/sql-dml.png'
import offerImage2 from './img/levels.png'
import offerImage3 from './img/individual.png'
import offerImage4 from './img/teachers.png'
import actions from '../SignUp/actions'
import { getAuth } from "../../layout/getters";
import {appRouter} from "../../service/router-service";

export default () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [openSignInForm, setOpenSignInForm] = useState(false)
  const [openSignUpForm, setOpenSignUpForm] = useState(false)
  const isAuth = useSelector((state) => getAuth(state))

  const handleOpenSignInForm = useCallback(() => {
    if (isAuth){
      history.push(appRouter.getMyCoursesRoute())
    } else {
      setOpenSignInForm(true)
      setOpenSignUpForm(false)
    }
  }, [isAuth])

  const handleOpenSignUpForm = () => {
    setOpenSignInForm(false)
    setOpenSignUpForm(true)
  }

  useEffect(() => {
    dispatch(actions.signUpGetOrganizations())
    dispatch(actions.signUpGetPeriods())
  })

  const handleCloseForms = () => {
    setOpenSignUpForm(false)
    setOpenSignInForm(false)
  }

  return (
    <div>
      <div style={{backgroundImage: `url(${mainBG})`, paddingBottom: '100px'}} className={classes.mainBackground}>
        <div className={classes.wrap}>
          <div className={classes.header}>
            <img src={logo} />
            <Typography>
              <a onClick={() => handleOpenSignInForm(true)}>
                Вход
              </a>
            </Typography>
          </div>
          <div className={classes.mainScreen}>
              <div>
              <Typography className={classes.title}>ОНЛАЙН ПЛАТФОРМА <br/> ПО ИЗУЧЕНИЮ SQL</Typography>
              <Typography className={classes.description}>
                Курсы для тренировки умений написания <br/> SQL-запросов <br/>
              </Typography>
              <Button type="secondary" onClick={handleOpenSignUpForm} className={classes.getAccessButton}>
                Получить доступ
              </Button>
            </div>
            {openSignInForm || openSignUpForm ?
              <div className={classes.form}>
                <CloseButton
                  className={classes.closeButton}
                  onClick={handleCloseForms}
                />
                {openSignInForm
                  ? <SignInForm/>
                  : openSignUpForm
                    ? <SignUpForm/>
                    : <></>
                }
              </div>
              : <div className={classes.emptyForm}/>
            }
          </div>
        </div>
      </div>
      <div className={classes.questions}>
        <div className={classes.wrap}>
          <div className={classes.question}>
            <div className={classes.questionInfo}>
              <Typography className={classes.questionTitle}>
                Почему именно SQL?
              </Typography>
              <div className={classes.questionBorder} style={{background: '#FD445F'}} />
              <Typography className={classes.questionText}>
                Большинство современных сервисов и приложений имеют системы хранения данных. Во многих из них используются реляционные системы управления БД, для которых SQL – это базовый язык для работы с данными.              </Typography>
            </div>
            <img src={questionImage1} className={classes.questionImageRight} />
          </div>
          <div className={classes.question}>
            <img src={questionImage2} className={classes.questionImageLeft} />
            <div className={classes.questionInfo}>
              <Typography className={classes.questionTitle}>
                Зачем изучать базы данных?
              </Typography>
              <div className={classes.questionBorder} style={{background: '#FFDF40'}} />
              <Typography className={classes.questionText}>
                Умение работать с базами данных - это один из ключевых навыков любого backend-разработчика и аналитика данных
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.learn}>
        <div className={classes.wrap}>
          <Typography className={classes.learnTitle}>
            Вы научитесь
          </Typography>
          <div className={classes.learnItems}>
            <div className={classes.learnItem}>
              <div className={classes.square} style={{top: '-15px', left: '-15px'}} />
              <Typography className={classes.learnItemText}>Понимать принципы составления запросов к базам данных</Typography>
            </div>
            <div className={classes.learnItem}>
              <div className={classes.square} style={{bottom: '-15px', left: '-15px'}} />
              <Typography className={classes.learnItemText}>Составлять SQL запросы на выборку данных (select)</Typography>
            </div>
            <div className={classes.learnItem}>
              <div className={classes.square} style={{top: '-15px', right: '-15px'}} />
              <Typography className={classes.learnItemText}>Составлять SQL запросы на изменение данных (insert, update, delete)</Typography>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.offer}>
        <div className={classes.wrap}>
          <Typography className={classes.offerTitle}>
            Мы предлагаем
          </Typography>

          <div className={classes.offerList}>
            <div className={classes.offerItem}>
              <img src={offerImage1} />
              <Typography className={classes.offerItemText}>Курсы по SQL и DML</Typography>
            </div>
            <div className={classes.offerItem}>
              <img src={offerImage2} />
              <Typography className={classes.offerItemText}>Задания разного уровня сложности</Typography>
            </div>
            <div className={classes.offerItem}>
              <img src={offerImage3} />
              <Typography className={classes.offerItemText}>Скоро появятся курсы с индивидуализацией</Typography>
            </div>
            <div className={classes.offerItem}>
              <img src={offerImage4} />
              <Typography className={classes.offerItemText}>Авторские курсы от преподавателей ИТМО</Typography>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.courses}>
        <div className={classes.wrap}>
          <Typography className={classes.coursesTitle}>
            Курсы
          </Typography>

          <div className={classes.coursesList}>
            <div className={classes.coursesListItem}>
              <Typography className={classes.coursesListItemTitle}>Оператор SELECT</Typography>
              <Typography className={classes.coursesListItemDescription}>
                После прохождения курса Вы научитесь писать SQL-запросы на выборку данных, взаимодействовать сразу с неколькими таблицами, использовать группировку данных, подзапросы и другие возможности Select SQL
              </Typography>
            </div>

            <div className={classes.coursesListItem}>
              <Typography className={classes.coursesListItemTitle}>Data Manipulation Language</Typography>
              <Typography className={classes.coursesListItemDescription}>
                После прохождения курса Вы научитесь писать SQL-запросы на вставку, удаление и редактирование данных. Вы сможете составлять как простые запросы на изменение данных, так и запросы с использованием Select SQL
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.footer}>
        <div className={classes.wrap}>
          <Typography className={classes.footerLink}>antongovorov@gmail.com</Typography>
        </div>
      </div>
    </div>
  )
}
