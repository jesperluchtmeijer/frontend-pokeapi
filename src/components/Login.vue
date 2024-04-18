<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Log in to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input id="email" name="email" type="email" autocomplete="email" required v-model="email"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address">
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required
              v-model="password"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password">
          </div>
        </div>

        <div>
          <button type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                  d="M9.293 2.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L3.707 9.707a1 1 0 01-1.414-1.414l6-6z"
                  clip-rule="evenodd" />
              </svg>
            </span>
            Log in
          </button>
        </div>
      </form>
      <div>
        <h3 class="text-center">Welcome back, {{ name }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      name: localStorage.getItem('name'),
    }
  },
  methods: {
    login() {
      axios.post('http://localhost:3000/auth/login', {
        email: this.email,
        password: this.password
      }).then(response => {
        console.log(response);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('name', response.data.name);
        console.log('Logged in as:', response.data.name);
        this.name = response.data.name;
        this.email = '';
        this.password = '';
      }).catch(error => {
        console.error('Error:', error);
      });
    }
  }
}
</script>