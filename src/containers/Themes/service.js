import BaseService from "../../service/base-service";

class ThemesService extends BaseService{
    getThemesCount(){
        return this.get(`api/api_v2/themes/`)
    }
    getThemes(payload){
        return this.get(`api/api_v2/themes/?page=${payload.page}`)
    }
    deleteDatabase(id){
        console.log('Called service delete', id)
        return this.delete(`api/api_v2/themes/${id}/`)
    }
    createTheme(title, position){
        console.log("Service called", title, position)
        const formData = new FormData();

        formData.append('title', title);
        formData.append('position', position);

        return this.post('api/api_v2/themes/', formData)
    }
    updateDatabase(id, title, position){
        console.log('Called service update', id)
        const formData = new FormData();

        formData.append('title', title);
        formData.append('source_code', position);

        return this.put(`api/api_v2/themes/${id}/`, formData)
    }
}

export default ThemesService;

export const service = new ThemesService()
