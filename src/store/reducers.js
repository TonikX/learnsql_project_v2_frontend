import {combineReducers} from "redux";
import {GENERAL_PATH as signInPath, reducer as signInReducer} from "../containers/SignIn/reducer";
import {GENERAL_PATH as signUpPath, reducer as signUpReducer} from "../containers/SignUp/reducer";
import {GENERAL_PATH as coursePath, reducer as courseReducer} from "../containers/Course/reducer";
import {GENERAL_PATH as profilePath, reducer as profileReducer} from "../containers/Profile/reducer";
import {GENERAL_PATH as homePath, reducer as homeReducer} from "../containers/Courses/reducer";
import {GENERAL_PATH as resetPasswordPath, reducer as resetPasswordReducer} from "../containers/ResetPassword/reducer";
import {GENERAL_PATH as mainPath, reducer as mainReducer} from "../layout/reducer";
import {GENERAL_PATH as feedbackPath, reducer as feedbackReducer} from "../containers/Feedback/reducer";
import {GENERAL_PATH as chatPath, reducer as chatReducer} from "../containers/Chat/reducer";


export default combineReducers({
    [mainPath]: mainReducer,
    [signInPath]: signInReducer,
    [signUpPath]: signUpReducer,
    [coursePath]: courseReducer,
    [profilePath]: profileReducer,
    [homePath]: homeReducer,
    [resetPasswordPath]: resetPasswordReducer,
    [feedbackPath] : feedbackReducer,
    [chatPath]: chatReducer
});