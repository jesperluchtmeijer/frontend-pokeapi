import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from "vue/dist/vue.esm-bundler.js";
import App from "./App.vue";
import Index from "./components/index.vue";
import PokemonDetail from "./components/PokemonDetail.vue";
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
import FavoritePokemon from "./components/FavoritePokemon.vue";
import Pokemon from "./components/Pokemon.vue";
import Users from "./components/Users.vue";

const routes = [
  { path: '/', component: Index },
  { path: '/pokemon', component: Pokemon},
  { path: '/about/pokemon/:id', component: PokemonDetail },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/favorite', component: FavoritePokemon },
  { path: '/pokemons/:name', component: Index},
  { path: '/users', component: Users},


]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')