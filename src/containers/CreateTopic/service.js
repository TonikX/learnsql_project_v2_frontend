import BaseService from "../../service/base-service";

class CreateTopicService extends BaseService{
    getThemes(){
        return this.get('api/api_v2/themes')
    }
    getSections(){
        return this.get(`/api/api_v2/sectionofmethodologicalmaterials/`)
    }
    createTopic(section, number, name, content, themes){
        console.log("Service create", name)
        const formData = new FormData();

        formData.append('section', section);
        formData.append('number', number);
        formData.append('topic_name', name);
        formData.append('content', content);
        formData.append('themes_for_topics', themes);

        return this.post('api/api_v2/topics/', formData)
    }
}

export default CreateTopicService;

export const service = new CreateTopicService()