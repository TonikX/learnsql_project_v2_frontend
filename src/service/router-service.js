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
const ADMIN = 'admin';
const DATABASES = 'databases';
const THEMES = 'themes';
const SETS = 'sets';
const COURSELIST = 'courses';
const TASKS = 'tasks'
const MATERIALS = 'materials';

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

    getAdminRoute = () => {
        return SEPARATOR + ADMIN;
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

    getDatabasesLink = () => {
        return SEPARATOR + DATABASES
    };

    getTasksLink = () => {
        return SEPARATOR + TASKS
    };

    getThemesLink = () => {
        return SEPARATOR + THEMES
    };

    getSetsLink = () => {
        return SEPARATOR + SETS
    };

    getCourseListLink = () => {
        return SEPARATOR + COURSELIST
    };

    getMaterialsLink = () => {
        return SEPARATOR + MATERIALS
    };
}

export const appRouter = RouterService.factory();