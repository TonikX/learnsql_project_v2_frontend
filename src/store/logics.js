import SignInLogic from '../containers/SignIn/logics';
import SignUpLogic from '../containers/SignUp/logics';
import ProfileLogic from '../containers/Profile/logics';
import HomeLogic from '../containers/Courses/logics';
import CourseLogic from '../containers/Course/logics';
import ResetPasswordLogic from '../containers/ResetPassword/logics';
import MainLogic from '../layout/logics';
import FeedbackLogic from '../containers/Feedback/logics'
import ChatLogic from '../containers/Chat/logics'

export default [
    ...SignInLogic,
    ...SignUpLogic,
    ...ProfileLogic,
    ...MainLogic,
    ...HomeLogic,
    ...CourseLogic,
    ...ResetPasswordLogic,
    ...FeedbackLogic,
    ...ChatLogic
];