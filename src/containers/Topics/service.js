import BaseService from "../../service/base-service";

class TopicsService extends BaseService{
    getTopics(){
        return this.get('api/api_v2/topics')
    }
    getCurrentTopics(payload){
        console.log('PAYLOAD', payload)
        return this.get(`api/api_v2/topics/?page=${payload.page}`)
    }
    deleteTopic(id){
        return this.delete(`api/api_v2/topics/${id}`)
    }
}

export default TopicsService;

export const service = new TopicsService()