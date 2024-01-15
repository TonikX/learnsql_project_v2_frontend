import BaseService from "../../service/base-service";

class PersonalStatsService extends BaseService{
    getPersonalStats(){
        /*
            Получение персональной статистики с бекенда.
        */
        return this.get(`/api/personal-stats`);
    }
}

export default PersonalStatsService;