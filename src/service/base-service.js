import get from 'lodash/get';
import axiosLib from 'axios';

import AppConfig from '../config/app-config-service';
import UserService from "./user-service";

const userService = UserService.factory();

export default class BaseService {
    // baseUrl = "http://127.0.0.1:8001";
    baseUrl = "";

    get(url, config, axiosConfig) {


        return new Promise((successFn, errorFn) => {
            this.getAxios(axiosConfig).get(this.baseUrl + url, config).then(successFn).catch(errorFn);
        });
    }

    post(url, postData) {
        return new Promise((successFn, errorFn) => {
            this.getAxios().post(this.baseUrl + url, postData).then(successFn).catch(errorFn);
        });
    }

    put(url, putData) {
        return new Promise((successFn, errorFn) => {
            this.getAxios().put(this.baseUrl + url, putData).then(successFn).catch(errorFn);
        });
    }

    patch(url, patchData) {
        return new Promise((successFn, errorFn) => {
            this.getAxios().patch(this.baseUrl + url, patchData).then(successFn).catch(errorFn);
        });
    }
    delete(url, postData) {
        return new Promise((successFn, errorFn) => {
            this.getAxios().delete(this.baseUrl + url, postData).then(successFn).catch(errorFn);
        });
    }


    interceptSuccessResponse = (response) => {
        return {
            ...response,
            data: get(response, 'data')
        }
    };

    interceptFailResponse = (error) => {
        const errors = get(error, 'response.data', {});
        const errorsArray = Object.keys(errors).map(key => errors[key]);

        return Promise.reject(errorsArray);
    };

    createInstance = () => {
        const _axios = axiosLib.create({
            baseURL: AppConfig.getApiBasePath(),
        });

        _axios.interceptors.response.use(this.interceptSuccessResponse, this.interceptFailResponse);

        return _axios;
    };

    getAxios(config = {singleton: true, removeHeader: false}) {
        let _axios = this.createInstance();

        // if (config.singleton === true || config.singleton === undefined) {
        //     if (BaseService.axios == null) {
        //         _axios = this.createInstance();
        //         BaseService.axios = _axios;
        //     } else {
        //         _axios = BaseService.axios;
        //     }
        // } else {
        //     _axios = this.createInstance();
        // }

        _axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        _axios.defaults.xsrfCookieName = "csrftoken";

        const isAuth = userService.isAuth();

        if (_axios !== null && isAuth && !config.removeHeader) {
            _axios.defaults.headers.common['Authorization'] = `Bearer ${userService.getToken()}`;
        }

        return _axios;
    }
}
