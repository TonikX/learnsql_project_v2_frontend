import SignInLogic from '../containers/SignIn/logics';
import SignUpLogic from '../containers/SignUp/logics';
import ProfileLogic from '../containers/Profile/logics';
import HomeLogic from '../containers/Courses/logics';
import CourseLogic from '../containers/Course/logics';
import ResetPasswordLogic from '../containers/ResetPassword/logics';
import MainLogic from '../layout/logics';
import FeedbackLogic from '../containers/Feedback/logics';
<<<<<<< HEAD
import DatabasesLogic from '../containers/Databases/logics';
import DatabaseLogic from '../containers/Database/logics';
import CreateDatabaseLogic from '../containers/CreateDatabase/logics';
import ThemesLogic from '../containers/Themes/logics';
import CoursesList from '../containers/CoursesList/logics';
import CreateCourse from '../containers/CreateCourse/logics';
import Tasks from '../containers/Tasks/logics';
import CreateTask from '../containers/CreateTask/logics';
import CreateTopic from '../containers/CreateTopic/logics';
import Topics from '../containers/Topics/logics';
import Sections from '../containers/Sections/logics';
=======
import StatisticLogic from "../containers/Statistic/logics";
>>>>>>> a02d5ac970de7ebfacd07543bbbf1844f110d3b9

export default [
    ...SignInLogic,
    ...SignUpLogic,
    ...ProfileLogic,
    ...MainLogic,
    ...HomeLogic,
    ...CourseLogic,
    ...ResetPasswordLogic,
    ...FeedbackLogic,
<<<<<<< HEAD
    ...DatabasesLogic,
    ...DatabaseLogic,
    ...CreateDatabaseLogic,
    ...ThemesLogic,
    ...CoursesList,
    ...CreateCourse,
    ...Tasks,
    ...CreateTask,
    ...CreateTopic,
    ...Topics,
    ...Sections,
=======
   ...StatisticLogic
>>>>>>> a02d5ac970de7ebfacd07543bbbf1844f110d3b9
];