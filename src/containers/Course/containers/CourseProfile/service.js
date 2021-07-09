import BaseService from "../../../../service/base-service";

class CourseProfileService extends BaseService{
    getIndividualRoute(id) {
        return this.get('/api/user_ind_course/' + id);
    }
}

export default CourseProfileService;