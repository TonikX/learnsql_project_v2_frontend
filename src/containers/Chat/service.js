import BaseService from "../../service/base-service";

class ChatService extends BaseService {
    getUsers(formData) {
        return this.get('/api/users/');
    }

    getRooms(formData) {
        return this.get('/chat/api/rooms/');
    }

    createRooms(formData) {
        return this.post('/chat/api/room/create/', formData);
    }

    addUserOnRoom(formData, id) {
        return this.put(`/chat/api/room/create/${id}/`, formData);
    }
}

export default ChatService;
