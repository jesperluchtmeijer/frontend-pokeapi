<script>
import axios from 'axios';

export default {
  data() {
    return {
      favorite: [],
      token: localStorage.getItem('token')
    };
  },
  mounted() {
    this.getFavoriteData();
  },
  methods: {
    async getFavoriteData() {
      console.log(this.token)
      try {
        const response = await fetch('http://localhost:3000/favorite/index', {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
        const data = await response.json();
        this.favorite = data;
      } catch (error) {
        console.error('Error fetching Favorite Pokemon data:', error);
      }
    },
    async remove(id) {
      const config = {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      };
      try {
        await axios.post(`http://localhost:3000/favorite/remove/${id}`, {}, config)
            .then(response => {
              console.log(response);
              this.getFavoriteData();
            });
      } catch (error) {
        console.error('Error removing Favorite Pokemon:', error);
      }
    }
  }
};
</script>

<template>
  <div>
    <h2>Favorite Pokemon</h2>
    <ul>
      <li v-for="pokemon in favorite" :key="pokemon.id">
        {{ pokemon.id }}
        <button @click="remove(pokemon.id)">Remove favorite</button>
      </li>
    </ul>
  </div>

</template>

<style>

</style>