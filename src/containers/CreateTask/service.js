import BaseService from "../../service/base-service";

class CreateTaskService extends BaseService{
    getThemesField(){
        return this.get('api/theme')
    }
    getDatabasesField(){
        return this.get('api/api_v2/databases')
    }
    createTask(title, text, answer, database, difficulty, banned_words, required_words, number_of_attempts,
                 should_check_runtime, allowed_runtime, help, themes_field) {
        console.log("Service create", title)
        const formData = new FormData();

        formData.append('title', title);
        formData.append('text', text);
        formData.append('answer', answer);
        formData.append('database', database);
        formData.append('difficulty', difficulty);
        formData.append('banned_words', banned_words);
        formData.append('required_words', required_words);
        formData.append('number_of_attempts', number_of_attempts);
        formData.append('should_check_runtime', should_check_runtime);
        formData.append('allowed_runtime', allowed_runtime);
        formData.append('help', help);
        formData.append('themes_field', themes_field);

        return this.post('api/tasks/', formData)
    }
}

export default CreateTaskService;

export const service = new CreateTaskService()