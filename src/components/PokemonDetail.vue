<script>
import axios from 'axios';
export default {

  data() {
    return {
      pokemon: {}
    }
  },
  mounted() {
    const id = this.$route.params.id;


    axios.get(`http://localhost:3000/pokemon/show-pokemon/${id}`)
        .then(response => {
          this.pokemon = response.data;
          console.log(this.pokemon);
        })
        .catch(error => console.error(error));

  },
  methods: {

    setFavorite() {
      const config = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      };
      console.log(config);

      const id = this.$route.params.id;
      axios.post(`http://localhost:3000/favorite/add/${id}`, {}, config)
          .then(response => {
            console.log(response);
            this.$router.push(`/pokemons/${id}`);
          })
          .catch(error => console.error(error));
    },
    checkLoggedIn() {
      if (!localStorage.getItem('token')) {
        this.$router.push('/login');
      }
      else {
        this.setFavorite();
      }
    }
  }
}
</script>

<template>
  <div>
    <p>Naam: {{ pokemon.name }}</p>
    <p>Gewicht: {{ pokemon.weight }}</p>
    <p>Basis level: {{pokemon.base_experience}}</p>
    <p>Pokedex nummer: {{pokemon.pokemon_api_id}}</p>

   <button @click="checkLoggedIn">
     Add as favorite
    </button>

  </div>
</template>

<style scoped>

</style>