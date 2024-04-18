import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling", "flashsocket"],
  auth: {
    token: localStorage.getItem("token"),
    name: localStorage.getItem("name"),
  },
});

class SocketConnectionHandler {
  constructor() {
    this.socket = socket;
  }
}

export default SocketConnectionHandler;
