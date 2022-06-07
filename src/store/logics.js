import SignInLogic from '../containers/SignIn/logics';
import SignUpLogic from '../containers/SignUp/logics';
import ProfileLogic from '../containers/Profile/logics';
import HomeLogic from '../containers/Courses/logics';
import CourseLogic from '../containers/Course/logics';
import ResetPasswordLogic from '../containers/ResetPassword/logics';
import MainLogic from '../layout/logics';
import FeedbackLogic from '../containers/Feedback/logics';
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

export default [
    ...SignInLogic,
    ...SignUpLogic,
    ...ProfileLogic,
    ...MainLogic,
    ...HomeLogic,
    ...CourseLogic,
    ...ResetPasswordLogic,
    ...FeedbackLogic,
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
];