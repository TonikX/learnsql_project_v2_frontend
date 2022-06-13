export class WebSocketService {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  connect({roomName, id, user}) {
    const path = `ws://127.0.0.1:8001/ws/chat/${roomName}/?id=${id}${user ? `&user=${user}` : ``}`;
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {
      console.log('WebSocket open');
    };
    this.socketNewMessage(JSON.stringify({
      command: 'fetch_messages'
    }));
    this.socketRef.onmessage = e => {
      this.socketNewMessage(e.data);
    };
    this.socketRef.onerror = e => {
      console.log(e.message);
    };
    this.socketRef.onclose = () => {
      console.log("WebSocket closed let's reopen");
    };
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === 'messages') {
      this.callbacks[command](parsedData.messages);
    }
    if (command === 'new_message') {
      console.log(parsedData);
      this.callbacks[command](parsedData.message);
    }
  }

  fetchMessages(username, room) {
    this.sendMessage({ command: 'fetch_messages', username: username, room:room });
  }

  newChatMessage(message) {
    this.sendMessage({ command: 'new_message', from: message.from, message: message.content, room: message.room });
  }

  addCallbacks(messagesCallback, newMessageCallback) {
    this.callbacks['messages'] = messagesCallback;
    this.callbacks['new_message'] = newMessageCallback;
  }

  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    }
    catch(err) {
      console.log(err.message);
    }
  }

  close(){
    console.log("close")
    this.socketRef.close(1000, "работа закончена");
  }
  state() {
    return this.socketRef.readyState;
  }

}


const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;
