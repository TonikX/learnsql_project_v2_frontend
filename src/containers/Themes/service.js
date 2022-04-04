import BaseService from "../../service/base-service";

class SignInService extends BaseService{
    /*joinCourse(id){
        const formData = new FormData();
        formData.append('course', id);

        return this.post('api/student-course/', formData);
    }*/
    getThemes(){
        return this.get('api/theme')
    }
}

export default SignInService;