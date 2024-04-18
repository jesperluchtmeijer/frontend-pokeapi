<template>
  <div>
    <!-- Search bar -->
    <div class="mb-4">
      <input type="text" v-model="searchQuery" @input="searchPokemon(searchQuery)"
        class="border border-gray-300 rounded-md px-4 py-2 w-full" placeholder="Search Pokémon...">
    </div>

    <!-- Pokémon grid -->
    <div class="grid grid-cols-5 gap-4">
      <div v-for="pokemon in pokemons" :key="pokemon.id">
        <router-link :to="`/about/pokemon/${pokemon.id}`" class="block">
          <p class="text-center mt-2">{{ pokemon.name }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      pokemons: [],
      searchQuery: '',
      isLoading: true
    }
  },
  mounted() {
    this.getPokemonData();
  },
  methods: {
    getPokemonData() {
      try {
        const name = this.$route.params.name;
        axios.get(`http://localhost:3000/pokemon/show-pokemon-name/${name}`)
          .then(response => {
            this.pokemons = response.data;
            console.log(this.pokemon);
          })
          .catch(error => {
            console.error(error);
            this.fetchAllPokemons();
          });
      } catch (error) {
        console.error(error);
      }
    },

    fetchAllPokemons() {
      try {
        axios.get('http://localhost:3000/pokemon/show-pokemon')
          .then(response => {
            this.pokemons = response.data;
            console.log(this.pokemons);
          })
          .catch(error => console.error(error));
      } catch (error) {
        console.error(error);
      }
    },

    fetchPokemons() {
      if (this.searchQuery.trim()) {
        this.isLoading = true;
        fetch(`http://localhost:3000/pokemon/show-pokemon-name/${this.searchQuery}`)
          .then(response => response.json())
          .then(data => {
            this.pokemons = data;
            this.isLoading = false;
          })
          .catch(error => {
            console.error(error);
            this.isLoading = false;
          });
      } else {
        this.fetchAllPokemons();
      }
    }
  },
  watch: {
    searchQuery() {
      this.fetchPokemons();
    }
  },

};
</script>