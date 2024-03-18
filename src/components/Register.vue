<script>
import axios from 'axios';
export default {

methods: {
  register() {
    axios.post('http://localhost:3000/auth/register', {
      name: this.name,
      email: this.email,
      password: this.password
    }).then(response => {
      console.log(response);
      this.$router.push('/login');
    }).catch(error => {
      console.error('Error:', error);
    });
  }

}
}
</script>

<template>
<h2>Register</h2>
  <form @submit.prevent="register">
    <div>
      <label for="name">Username</label>
      <input type="text" id="name" v-model="name">
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password">
    </div>
    <div>
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email">
    </div>
    <div>
      <button type="submit">Register</button>
    </div>
  </form>

</template>
