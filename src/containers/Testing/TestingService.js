import BaseService from "../../service/base-service";

class TestingService extends BaseService {
  getTopics(id) {
    return this.get('/api/user_ind_course/' + id);
  }

  saveResult(id, theme, user_course, degree) {
    const formData = new FormData();

    formData.append('theme', theme);
    formData.append('user_course', user_course);
    formData.append('degree_of_mastering', degree);

    return this.patch('/api/user_mastering_theme_test/' + id + '/', formData);
  }
}

export default TestingService;