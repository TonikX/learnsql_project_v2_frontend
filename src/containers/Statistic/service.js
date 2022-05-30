import BaseService from "../../service/base-service";

class StaticticService extends BaseService {
    getStatistic(courseId) {
        return this.get(`/api/group/statistic/${courseId}`);
    }

}

export default StaticticService;