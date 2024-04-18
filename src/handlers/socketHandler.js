import { useRouter } from "vue-router";
import usePlayerListStore from "../stores/playerList";
import SocketConnectionHandler from "./socketConnectionHandler";

const socket = new SocketConnectionHandler().socket;

class SocketHandler {
  handleOnlineUsers() {
    socket.on("users", (users) => {
      users.forEach((user) => {
        user.self = user.userID === socket.id;
        if (user.self) {
          usePlayerListStore().self.push(user);
          console.log("self", usePlayerListStore().self);
        }
      });
      users = users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });

      users.forEach((user) => {
        usePlayerListStore().playerList.splice(
          0,
          usePlayerListStore().playerList.length
        );
        usePlayerListStore().playerList.push(user);
      });
    });
    socket.on("user connected", (user) => {
      usePlayerListStore().playerList.splice(
        0,
        usePlayerListStore().playerList.length
      );
      usePlayerListStore().playerList.push(user);
      console.log("playerList", usePlayerListStore().playerList);
    });
  }
  handleMessage(message, name, messages) {
    console.log(message);

    socket.emit("getMessage", {
      sender: name,
      text: message,
    });
    console.log("Message sent");
    messages.push({ sender: name, text: message });
    console.log(messages);
  }
  handleMessages(messages) {
    socket.on("sendMessage", (message) => {
      console.log(message, "message");
      messages.push(message);
    });
  }
  handleInvite(player) {
    console.log("Invite sent to", player, "from", socket.id);
    socket.emit("sendInvite", {
      sender: socket.id,
      receiver: player,
    });
  }
  handleReceiveInvite() {
    socket.on("receiveInvite", (invite) => {
      console.log("Invite received from", invite.sender);
      const response = confirm(
        "You have received an invite. Do you want to accept or decline?"
      );
      if (response) {
        socket.emit("acceptInvite", {
          sender: socket.id,
          receiver: invite.sender,
        });
        // Emit redirectInvite event to the sender
        socket.emit("redirectInvite", invite.sender);
      } else {
        socket.emit("declineInvite", {
          sender: socket.id,
          receiver: invite.sender,
        });
      }
    });
  }
  handleRedirectInvite() {
    socket.on("redirectInvite", (room) => {
      console.log("Redirecting to battle page");
      console.log(room);
      window.location.href = `/battle/${room}`;
    });
  }
  handleChoosePokemon(pokemon) {
    const pokemonChosen = pokemon;
    socket.emit("chosePokemon", {
      pokemon: pokemonChosen,
      user: socket.id,
    });
  }
  handleBattleResult(resultArray) {
    socket.on("battleResult", (result) => {
      resultArray.push(result);
    });
  }
}

export default SocketHandler;
