import BaseService from "../../service/base-service";

class FeedbackService extends BaseService{
    sendFeedback(subject, message, user){
        const formData = new FormData();

        formData.append('subject', subject);
        formData.append('message', message);
        formData.append('user', user);

        return this.post('/api/feedback/add', formData);
    }
}

export default FeedbackService;