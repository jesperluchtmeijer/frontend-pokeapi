<script>
import axios from 'axios';
</script>

<template>
  <div class="w-1/2 mx-auto">
      <div class="">
      <h1>Pokémon</h1>
      <p>Gotta catch them all!</p>
      <router-link to="/">Home</router-link> |
      <router-link to="/pokemon">Pokemon</router-link> |
      <router-link to="/favorite">Favorite</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link>
      <router-view></router-view>
      </div>
  </div>
</template>

<style scoped>


</style>
