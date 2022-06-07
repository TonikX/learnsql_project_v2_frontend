import BaseService from "../../service/base-service";

class CoursesListService extends BaseService{
    getCourses(){
        return this.get('/api/api_v2/courses/')
    }
    deleteCourse(id){
        return this.delete(`api/api_v2/courses/${id}`)
    }
}

export default CoursesListService;

export const service = new CoursesListService()
