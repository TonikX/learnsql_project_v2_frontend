import BaseService from "../../service/base-service";

class CreateDatabaseService extends BaseService{
    createDatabase(title, description, source_code){
        console.log("Service called", title)
        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('source_code', source_code);

        return this.post('api/api_v2/databases/', formData)
    }
}

export default CreateDatabaseService;

export const service = new CreateDatabaseService()