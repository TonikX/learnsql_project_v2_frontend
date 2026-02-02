import BaseService from "../../service/base-service";
import * as Enum from './enum';

class SignInService extends BaseService{
    resetPassword(email){
        const formData = new FormData();

        formData.append(Enum.EMAIL_FIELD, email);

        return this.post('/auth/users/reset_password/', formData);
    }
    confirmNewPassword(password, repeatPassword, token, uid){
        const formData = new FormData();

        formData.append(Enum.NEW_PASSWORD_FIELD, password);
        formData.append(Enum.REPEAT_NEW_PASSWORD_FIELD, repeatPassword);
        formData.append(Enum.TOKEN, token);
        formData.append(Enum.UID, uid);

        return this.post('/auth/users/reset_password_confirm/', formData);
    }
}

export default SignInService;