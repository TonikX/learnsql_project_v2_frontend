import BaseService from "../../service/base-service";
import * as Enum from "../ResetPassword/enum";

class AuthService extends BaseService{
    signIn(password, username){
        const formData = new FormData();

        formData.append('password', password);
        formData.append('username', username);

        return this.post('/auth/token/login/', formData);
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
        formData.append('client_id', 'dtpxHJdnOZL7n0JpZJuTPfVkXUDmpXZYClYOAAOi');
        formData.append('client_secret', '8s4qWqQVWtm9fzBt6Z6ZihiC0aQPgbljyYZ0vQqQc7y3M4DLKKLQrwnoyOR1pTqMMAF1B3AKxHyL8lZS6He07zL9xTZVGw8jWox594Ujg58ehXJtjlWYusuxlaorLXWk');
        formData.append('backend', 'google-oauth2');

        return this.post(`social_auth_v2/convert-token`, formData)
    }
}

export default AuthService;

export const service = new AuthService()