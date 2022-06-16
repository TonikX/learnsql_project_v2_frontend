import BaseService from "../../service/base-service";

class StaticticService extends BaseService {
    getStatistic(courseId,currentPage) {
        return this.get(`/api/group/statistic/${courseId}?page=${currentPage}`);
    }

    getCourseStatistic(courseId) {

        return this.get(`/api/userresultsincourse/course/${courseId}`);
    }
}

export default StaticticService;
