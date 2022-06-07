import BaseService from "../../service/base-service";

class TasksService extends BaseService{
    getTasks(payload){
        return this.get(`api/api_v2/tasks/?page=${payload.page}`)
    }
    getTasksCount(){
        return this.get(`api/api_v2/tasks/`)
    }
    deleteTask(id){
        return this.delete(`api/api_v2/tasks/${id}`)
    }
}

export default TasksService;

export const service = new TasksService()