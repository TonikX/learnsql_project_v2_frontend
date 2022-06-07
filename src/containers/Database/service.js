import BaseService from "../../service/base-service";

class DatabaseService extends BaseService{
    getDatabase(id){
        return this.get(`api/api_v2/databases/${id}`)
    }
    deleteDatabase(id){
        console.log('Called service delete', id)
        return this.delete(`api/api_v2/databases/${id}`)
    }
    updateDatabase(id, title, description, source_code){
        console.log('Called service update', id)
        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('source_code', source_code);

        return this.put(`api/api_v2/databases/${id}`, formData)
    }
}

export default DatabaseService;

export const service = new DatabaseService()