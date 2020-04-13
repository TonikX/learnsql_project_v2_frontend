import BaseService from "../../service/base-service";

class CourseService extends BaseService{
    getCourseTasks(id){
        return this.get(`/api/individualroutetasks/${id}/`);
    }
    getCourseTask(id){
        return this.get(`/api/tasks/${id}/`);
    }
    getCourseMethodicalMaterials(courseId){
        return this.get(`/api/sectionsofmethodologicalmaterials/${courseId}`);
    }
    getCourseMethodicalMaterial(sectionId){
        return this.get(`/api/topicsofsection/${sectionId}`);
    }
    getCourseStatistics(id){
        return this.get(`/api/course/${id}/`);
    }
    completeTask(routeId, taskId, answer){
        const formData = new FormData();

        formData.append('solution', answer);
        formData.append('task_id', taskId);
        formData.append('status', 1);
        formData.append('id', routeId);

        return this.put(`/api/student-course/do-task/`, formData);
    }
}

export default CourseService;