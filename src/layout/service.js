import BaseService from "../service/base-service";
import AppConfig from "../config/app-config-service";

class MainService extends BaseService{
    getGroupOptions(){
        return this.get('/api/student-groups');
    }
    getUserData(){
        return this.get('/auth/users/me');
    }
    refreshToken(token){
        const formData = new FormData();
        formData.append('refresh_token', token);
        formData.append('grant_type', 'refresh_token');
        formData.append('client_id',  AppConfig.getClientId());
        formData.append('client_secret', AppConfig.getClientSecret());
        formData.append('backend', 'google-oauth2');

        return this.post(`social_auth_v2/token`, formData)
    }
}

export default MainService;