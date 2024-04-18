import { createRouter, createWebHistory } from "vue-router";
import { createApp } from "vue/dist/vue.esm-bundler.js";
import App from "./App.vue";
import Index from "./components/index.vue";
import PokemonDetail from "./components/PokemonDetail.vue";
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
import FavoritePokemon from "./components/FavoritePokemon.vue";
import Pokemon from "./components/Pokemon.vue";
import Users from "./components/Users.vue";
import Chat from "./components/Chat.vue";
import Battle from "./components/Battle.vue";
import SocketHandler from "./handlers/socketHandler";
import { io } from "socket.io-client";
import { createPinia } from "pinia";

const pinia = createPinia();

const routes = [
  { path: "/", component: Index },
  { path: "/pokemon", component: Pokemon },
  { path: "/about/pokemon/:id", component: PokemonDetail },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/favorite", component: FavoritePokemon },
  { path: "/pokemons/:name", component: Index },
  { path: "/users", component: Users },
  { path: "/chat", component: Chat },
  { path: "/battle/:room", component: Battle },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const socketHandler = new SocketHandler();

const app = createApp(App);

app.use(router);
app.use(pinia);

socketHandler.handleOnlineUsers();

app.mount("#app");

export default socketHandler;
