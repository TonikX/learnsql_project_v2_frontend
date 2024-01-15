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
const DATABASES = 'databases';
const DATABASE = 'database'
const THEMES = 'themes';
const CREATE = 'create';
const COURSES = 'courses';
const CREATE_COURSE = 'create_course';
const CREATE_TOPIC = 'create_topic';
const TASKS = 'tasks';
const CREATE_TASK = 'create_task';
const TOPICS = 'topics';
const SECTIONS = 'sections';
const STATS = 'personal_stats';


const SEPARATOR = '/';

export default class RouterService {
    static factory() {
        if (routerServiceInstance === null) {
            routerServiceInstance = new RouterService();
        }

        return routerServiceInstance;
    }

    getDatabasesRoute = () => {
        return SEPARATOR + DATABASES;
    };

    getStatsRoute = () => {
        return SEPARATOR + STATS;
    };

    getDatabaseRoute = (id) => {
        return SEPARATOR + DATABASE + SEPARATOR + id;
    };

    getCreateDatabaseRoute = () => {
        return SEPARATOR + 'create_database';
    };

    getThemesRoute = () => {
        return SEPARATOR + THEMES;
    };

    getCoursesRoute = () => {
        return SEPARATOR + COURSES;
    };

    getCreateCourseRoute = () => {
        return SEPARATOR + CREATE_COURSE;
    };

    getTasksRoute = () => {
        return SEPARATOR + TASKS;
    };

    getCreateTaskRoute = () => {
        return SEPARATOR + CREATE_TASK;
    };

    getTopicsRoute = () => {
        return SEPARATOR + TOPICS;
    };

    getCreateTopicRoute = () => {
        return SEPARATOR + CREATE_TOPIC;
    };

    getSectionsRoute = () => {
        return SEPARATOR + SECTIONS;
    };

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