import {createLogic} from "redux-logic";

import * as C from './constants';
import actions from '../../layout/actions';
import signUpPageActions from './actions';

import Service from './service';

import {getFormDataForSignUp} from "./getters";
import * as Enum from "./enum";

const service = new Service();

const signUp = createLogic({
    type: C.SIGN_UP,
    latest: true,
    process({getState, action}, dispatch, done) {
        const state = getState();
        const formData = getFormDataForSignUp(state);

        dispatch(actions.fetchingTrue({destination: Enum.SIGN_UP_FETCHING}));

        service.signUp(formData)
            .then((res) => {
                dispatch(actions.fetchingSuccess(['Вы успешно зарегистрированы!']));
                dispatch(signUpPageActions.signUpClearAllFields());
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.SIGN_UP_FETCHING}));
                return done();
            });
    }
});

const signUpGetOrganizations = createLogic({
    type: C.SIGN_UP_GET_ORGANIZATIONS,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.SIGN_UP_GET_ORGANIZATIONS}));

        service.getOrganisations()
            .then((res) => {
                dispatch(signUpPageActions.signUpSetOrganizations(JSON.parse(res.data)));
            })
            .catch((errors) => {
                dispatch(actions.fetchingFailed(errors));
            })
            .then(() => {
                dispatch(actions.fetchingFalse({destination: Enum.SIGN_UP_GET_ORGANIZATIONS}));
                return done();
            });
    }
});

const signUpGetPeriods = createLogic({
    type: C.SIGN_UP_GET_PERIODS,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.SIGN_UP_GET_PERIODS}));

        service.getPeriods()
          .then((res) => {
              dispatch(signUpPageActions.signUpSetPeriods(JSON.parse(res.data)));
          })
          .catch((errors) => {
              dispatch(actions.fetchingFailed(errors));
          })
          .then(() => {
              dispatch(actions.fetchingFalse({destination: Enum.SIGN_UP_GET_PERIODS}));
              return done();
          });
    }
});

const signUpGetGroups = createLogic({
    type: C.SIGN_UP_GET_GROUPS,
    latest: true,
    process({getState, action}, dispatch, done) {
        dispatch(actions.fetchingTrue({destination: Enum.SIGN_UP_GET_GROUPS}));

        service.getGroups(action.payload)
          .then((res) => {
              dispatch(signUpPageActions.signUpSetGroups(res.data.results));
          })
          .catch((errors) => {
              dispatch(actions.fetchingFailed(errors));
          })
          .then(() => {
              dispatch(actions.fetchingFalse({destination: Enum.SIGN_UP_GET_GROUPS}));
              return done();
          });
    }
});

export default [
    signUp,
    signUpGetOrganizations,
    signUpGetPeriods,
    signUpGetGroups,
];
