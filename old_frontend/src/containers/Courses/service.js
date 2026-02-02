import BaseService from "../../service/base-service";

class SignInService extends BaseService{
    joinCourse(id){
        const formData = new FormData();
        formData.append('course', id);

        return this.post('api/student-course/', formData);
    }
    getCourses(){
        return this.get('api/courses')
    }
    getMyCourses(){
        return this.get('api/student-course')
    }
}

export default SignInService;