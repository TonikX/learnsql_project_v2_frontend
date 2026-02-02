let routerServiceInstance = null;

const SIGN_IN = 'sign-in';
const SIGN_UP = 'sign-up';
const RESET_PASSWORD = 'reset-password';
const RESET_PASSWORD_CONFIRM = 'password/reset/confirm/:uid/:token';
const COURSE = 'course';
const PROFILE = 'profile';
const FAQ = 'faq';
const FEEDBACK = 'feedback';
const ALL_COURSES = 'all-courses';
const MY_COURSES = 'my-courses';

const SEPARATOR = '/';

export default class RouterService {
    static factory() {
        if (routerServiceInstance === null) {
            routerServiceInstance = new RouterService();
        }

        return routerServiceInstance;
    }

    getSignInRoute = () => {
        return SEPARATOR + SIGN_IN;
    };

    getSignUpRoute = () => {
        return SEPARATOR + SIGN_UP;
    };

    getResetPasswordRoute = () => {
        return SEPARATOR + RESET_PASSWORD;
    };

    getResetPasswordConfirmRoute = () => {
        return SEPARATOR + RESET_PASSWORD_CONFIRM;
    };

    getCourseRoute = () => {
        return SEPARATOR + COURSE + SEPARATOR + ':id';
    };

    getCourseTasksLink = (id) => {
        return SEPARATOR + COURSE + SEPARATOR + id + SEPARATOR + 'tasks';
    };

    getCourseMaterialsLink = (id) => {
        return SEPARATOR + COURSE + SEPARATOR + id + SEPARATOR + 'materials';
    };

    getCourseStatisticsLink = (id) => {
        return SEPARATOR + COURSE + SEPARATOR + id + SEPARATOR + 'statistics';
    };

    getProfileRoute = () => {
        return SEPARATOR + PROFILE;
    };

    getFAQLink = () => {
        return SEPARATOR + FAQ;
    };

    getFeedbackLink = () => {
        return SEPARATOR + FEEDBACK;
    };

    getAllCoursesRoute = () => {
        return SEPARATOR + ALL_COURSES;
    };

    getMyCoursesRoute = () => {
        return SEPARATOR + MY_COURSES;
    };

    getLandingPath = () => {
        return SEPARATOR;
    };

    getCourseLink = (id) => {
        return SEPARATOR + COURSE + SEPARATOR + id;
    };
}

export const appRouter = RouterService.factory();