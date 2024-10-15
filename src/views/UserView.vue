<template>
    <div>
      <h1>Welcome, {{ userName }}</h1>
  
      <div v-if="isAuthenticated">
        <p>You are logged in as: {{ user?.email }}</p>
        <button @click="logout">Logout</button>
      </div>
  
      <div v-else>
        <p>Please log in to access your account.</p>
        <button @click="login({ id: '1', name: 'madhuri', email: 'madhuri@gmail.com' })">
          Login as madhuri
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useAuthStore } from '../piniastore/user';
  import { storeToRefs } from 'pinia';
  
  export default defineComponent({
    setup() {
      const authStore = useAuthStore();
  
      const { user, isAuthenticated, userName } = storeToRefs(authStore);
  
      const { login, logout } = authStore;
  
      return {
        user,
        isAuthenticated,
        userName,
        login,
        logout,
      };
    },
  });
  </script>
  
  <style scoped>
  button {
    margin: 10px;
    padding: 5px 10px;
    cursor: pointer;
  }
  </style>
  