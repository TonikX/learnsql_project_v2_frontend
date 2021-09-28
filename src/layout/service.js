import BaseService from "../service/base-service";

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
        formData.append('client_id', 'dtpxHJdnOZL7n0JpZJuTPfVkXUDmpXZYClYOAAOi');
        formData.append('client_secret', '8s4qWqQVWtm9fzBt6Z6ZihiC0aQPgbljyYZ0vQqQc7y3M4DLKKLQrwnoyOR1pTqMMAF1B3AKxHyL8lZS6He07zL9xTZVGw8jWox594Ujg58ehXJtjlWYusuxlaorLXWk');
        formData.append('backend', 'google-oauth2');

        return this.post(`social_auth_v2/token`, formData)
    }
}

export default MainService;