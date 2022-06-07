import BaseService from "../../service/base-service";

class DatabasesService extends BaseService{
    getDatabases(){
        return this.get('api/api_v2/databases')
    }
    getCurrentDatabases(payload){
        console.log('PAYLOAD', payload)
        return this.get(`api/api_v2/databases/?page=${payload.page}`)
    }
    deleteDatabase(id){
        return this.delete(`api/api_v2/databases/${id}`)
    }
}

export default DatabasesService;

export const service = new DatabasesService()