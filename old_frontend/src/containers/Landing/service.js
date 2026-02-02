import BaseService from "../../service/base-service";
import * as Enum from "../ResetPassword/enum";
import AppConfig from "../../config/app-config-service";

class AuthService extends BaseService{
    signIn(password, username){
        const formData = new FormData();

        formData.append('password', password);
        formData.append('username', username);
        formData.append('grant_type', 'password');
        formData.append('client_id',  AppConfig.getClientId());
        formData.append('client_secret', AppConfig.getClientSecret());

        return this.post('/social_auth_v2/token', formData);
    }

    signUp(formData) {
        return this.post('/auth/users/', formData);
    }

    resetPassword(email){
        const formData = new FormData();

        formData.append(Enum.EMAIL_FIELD, email);

        return this.post('/auth/users/reset_password/', formData);
    }

    getTokens(token){
        const formData = new FormData();
        formData.append('token', token);
        formData.append('grant_type', 'convert_token');
        formData.append('client_id',  AppConfig.getClientId());
        formData.append('client_secret', AppConfig.getClientSecret());
        formData.append('backend', 'google-oauth2');

        return this.post(`social_auth_v2/convert-token`, formData)
    }
}

export default AuthService;

export const service = new AuthService()