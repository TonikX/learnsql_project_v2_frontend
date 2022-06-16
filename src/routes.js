import React from "react";
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Layout from './layout';
import SignIn from './containers/SignIn';
import ResetPassword from './containers/ResetPassword';
import SignUp from './containers/SignUp';
import Course from './containers/Course';
import Profile from './containers/Profile';
import Courses from './containers/Courses';
import GoogleSignIn from './containers/Landing/GoogleSignIn';

import RouterService from './service/router-service';
import UserService from './service/user-service';
import ResetPasswordConfirm from "./containers/ResetPassword/ResetPasswordConfirm/ResetPasswordConfirm";
import FAQ from "./containers/FAQ";
import Feedback from "./containers/Feedback";
import Landing from './containers/Landing'
import ChatRoom from "./containers/Chat/Chat";
import Statistic from "./containers/Statistic";

const routerService = RouterService.factory();
const userService = UserService.factory();

export default () => (
    <Router>
        <Layout>
            <Switch>
                {/*<Route path={routerService.getSignInRoute()}>*/}
                {/*  <SignIn/>*/}
                {/*</Route>*/}
                {/*<Route path={routerService.getSignUpRoute()}>*/}
                {/*  <SignUp/>*/}
                {/*</Route>*/}
                {/*<Route path={routerService.getResetPasswordRoute()}>*/}
                {/*  <ResetPassword/>*/}
                {/*</Route>*/}
                <Route path="/googleoauth2">
                    <GoogleSignIn/>
                </Route>
                <Route path={routerService.getFAQLink()}>
                    <FAQ/>
                </Route>
                <Route path={routerService.getFeedbackLink()}>
                    <Feedback/>
                </Route>
                <Route path={routerService.getResetPasswordConfirmRoute()}
                       children={() => (
                           <Route
                               render={({match}) => (
                                   <ResetPasswordConfirm match={match}/>
                               )}
                           />
                       )}
                />
                <PrivateRoute path={routerService.getProfileRoute()}>
                    <Profile/>
                </PrivateRoute>
                <PrivateRoute path={routerService.getCourseRoute()}>
                    <Course/>
                </PrivateRoute>
                <PrivateRoute path={routerService.getAllCoursesRoute()}>
                    <Courses/>
                </PrivateRoute>
                <PrivateRoute path={routerService.getMyCoursesRoute()}>
                    <Courses isMy/>
                </PrivateRoute>
                <PrivateRoute path={routerService.getChatRoute()}>
                    <ChatRoom/>
                </PrivateRoute>
                <PrivateRoute path={routerService.getStatisticRoute()}>
                    <Statistic/>
                </PrivateRoute>
                <Route path={routerService.getLandingPath()}>
                    <Landing/>
                </Route>
            </Switch>
        </Layout>
    </Router>
);

function PrivateRoute({children, ...rest}) {
    return (
        <Route
            {...rest}
            render={({location}) =>
                userService.isAuth() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: routerService.getSignInRoute(),
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}
