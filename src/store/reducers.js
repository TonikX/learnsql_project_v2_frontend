import {combineReducers} from "redux";
import {GENERAL_PATH as signInPath, reducer as signInReducer} from "../containers/SignIn/reducer";
import {GENERAL_PATH as signUpPath, reducer as signUpReducer} from "../containers/SignUp/reducer";
import {GENERAL_PATH as coursePath, reducer as courseReducer} from "../containers/Course/reducer";
import {GENERAL_PATH as profilePath, reducer as profileReducer} from "../containers/Profile/reducer";
import {GENERAL_PATH as homePath, reducer as homeReducer} from "../containers/Courses/reducer";
import {GENERAL_PATH as resetPasswordPath, reducer as resetPasswordReducer} from "../containers/ResetPassword/reducer";
import {GENERAL_PATH as mainPath, reducer as mainReducer} from "../layout/reducer";
import {GENERAL_PATH as feedbackPath, reducer as feedbackReducer} from "../containers/Feedback/reducer";
import {GENERAL_PATH as databasesPath, reducer as databasesReducer} from "../containers/Databases/reducer";
import {GENERAL_PATH as databasePath, reducer as databaseReducer} from "../containers/Database/reducer";
import {GENERAL_PATH as createDatabasePath, reducer as createDatabaseReducer} from "../containers/CreateDatabase/reducer";
import {GENERAL_PATH as themesPath, reducer as themesReducer} from "../containers/Themes/reducer";
import {GENERAL_PATH as coursesListPath, reducer as coursesListReducer} from "../containers/CoursesList/reducer";
import {GENERAL_PATH as createCoursePath, reducer as createCourseReducer} from "../containers/CreateCourse/reducer";
import {GENERAL_PATH as tasksPath, reducer as tasksReducer} from "../containers/Tasks/reducer";
import {GENERAL_PATH as createTaskPath, reducer as createTaskReducer} from "../containers/CreateTask/reducer";
import {GENERAL_PATH as createTopicPath, reducer as createTopicReducer} from "../containers/CreateTopic/reducer";
import {GENERAL_PATH as topicsPath, reducer as topicsReducer} from "../containers/Topics/reducer";
import {GENERAL_PATH as sectionsPath, reducer as sectionsReducer} from "../containers/Sections/reducer";
import {GENERAL_PATH as statisticPath, reducer as statisticReducer} from "../containers/Statistic/reducer";

export default combineReducers({
    [mainPath]: mainReducer,
    [signInPath]: signInReducer,
    [signUpPath]: signUpReducer,
    [coursePath]: courseReducer,
    [profilePath]: profileReducer,
    [homePath]: homeReducer,
    [resetPasswordPath]: resetPasswordReducer,
    [feedbackPath] : feedbackReducer,
    [databasesPath] : databasesReducer,
    [databasePath] : databaseReducer,
    [createDatabasePath] : createDatabaseReducer,
    [themesPath] : themesReducer,
    [coursesListPath] : coursesListReducer,
    [createCoursePath] : createCourseReducer,
    [tasksPath] : tasksReducer,
    [createTaskPath]: createTaskReducer,
    [createTopicPath]: createTopicReducer,
    [topicsPath]: topicsReducer,
    [sectionsPath]: sectionsReducer,
    [statisticPath] : statisticReducer,
});