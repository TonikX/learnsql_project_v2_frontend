import BaseService from "../../service/base-service";

class CreateCourseService extends BaseService{
    getThemesField(){
        return this.get('api/api_v2/themes')
    }
    createCourse(title, description, themes, type, difficulty, database_type, accesibility){
        console.log("Service create", title)
        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('themes', themes);
        formData.append('type', type);
        formData.append('difficulty', difficulty);
        formData.append('database_type', database_type);
        formData.append('accesibility', accesibility);

        return this.post('api/api_v2/courses/', formData)
    }
}

export default CreateCourseService;

export const service = new CreateCourseService()