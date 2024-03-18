<template>
  <div>
    <div>
      <input type="text" v-model="searchQuery" @input="searchPokemon(searchQuery)">
      <ul>
        <li v-for="pokemon in pokemons" :key="pokemon.id">
          <router-link :to="`/about/pokemon/${pokemon.id}`">{{ pokemon.name }}</router-link>
        </li>
      </ul>
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