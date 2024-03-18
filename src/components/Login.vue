<script>
import axios from 'axios';

export default {
  methods: {
    login() {

      axios.post('http://localhost:3000/auth/login', {
        email: this.email,
        password: this.password
      }).then(response => {
        console.log(response);
        localStorage.setItem('token', response.data.token);
        this.$router.push('/');
      }).catch(error => {
        console.error('Error:', error);
      });
    }
  }
}


</script>

<template>
<h2>LOGIN</h2>
  <form @submit.prevent="login">
    <div>
      <label for="email">Email</label>
      <input type="text" id="email" v-model="email">
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password">
    </div>
    <div>
      <button type="submit">Login</button>
    </div>
  </form>

</template>

<style scoped>

</style>