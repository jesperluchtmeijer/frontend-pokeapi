<template>
  <div class="bg-gray-800 text-white">
    <div class="container mx-auto px-4 py-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Pokémon</h1>
      <div class="flex space-x-4">
        <router-link class="text-gray-300 hover:text-white" to="/">Home</router-link>
        <router-link class="text-gray-300 hover:text-white" to="/pokemon">Pokemon</router-link>
        <router-link class="text-gray-300 hover:text-white" to="/favorite">Favorite</router-link>
        <router-link class="text-gray-300 hover:text-white" to="/login">Login</router-link>
        <router-link class="text-gray-300 hover:text-white" to="/register">Register</router-link>
        <router-link class="text-gray-300 hover:text-white" to="/chat">Chat</router-link>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>

export default {
  name: "App",
};
</script>