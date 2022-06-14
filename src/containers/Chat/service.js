import BaseService from "../../service/base-service";

class ChatService extends BaseService {
    getUsers(formData) {
        return this.get('/api/users/');
    }

    getRooms(formData) {
        return this.get('/chat/api/rooms/');
    }

    createRooms(formData) {
        return this.post('/chat/api/rooms/', formData);
    }

    addUserOnRoom(formData, id) {
        return this.put(`/chat/api/rooms/${id}/`, formData);
    }
    addAdminOnRoom(formData, id) {
        return this.post(`/chat/api/rooms/${id}/administrators/`, formData);
    }
    delAdminOnRoom(formData, id, idAdmin) {
        return this.delete(`/chat/api/rooms/${id}/administrators/?id=${idAdmin}`, formData);
    }
    putAdminOnRoom(formData, id) {
        return this.put(`/chat/api/rooms/${id}/administrators/`, formData);
    }
}

export default ChatService;
