import BaseService from "../../service/base-service";

class sectionsService extends BaseService{
    getSections(){
        return this.get('/api/api_v2/sectionofmethodologicalmaterials/')
    }
    getCurrentSections(page){
        return this.get(`/api/api_v2/sectionofmethodologicalmaterials/?page=${page}`)
    }
    deleteSection(id){
        return this.delete(`/api/api_v2/sectionofmethodologicalmaterials/${id}`)
    }
    createSection(number, name, course){
        const formData = new FormData();

        formData.append('number', number);
        formData.append('section_name', name);
        formData.append('course', course);

        return this.post('/api/api_v2/sectionofmethodologicalmaterials/', formData)
    }
    getCourses(){
        return this.get('/api/api_v2/courses/')
    }
}

export default sectionsService;

export const service = new sectionsService()