<template>
    <div>
      <h2>Using ref (Won't update template automatically)</h2>
      <p>Name: {{ userRef.name }}</p>
      <button @click="updateUserRef">Change Name (Ref)</button>
  
      <h2>Using reactive (Updates template automatically)</h2>
      <p>Name: {{ userReactive.name }}</p>
      <button @click="updateUserReactive">Change Name (Reactive)</button>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, reactive } from 'vue';
  
  export default {
    setup() {
      const userRef = ref({ name: 'Alice', age: 25 });
  
      const updateUserRef = () => {
        userRef.value.name = 'Bob'; 
        
        userRef.value = { ...userRef.value, name: 'Bob' };
      };
    //   const username: string= reactive("madhuri"})
  
      const userReactive = reactive({ name: 'Alice', age: 25 });
  
      const updateUserReactive = () => {
        userReactive.name = 'Bob';
      };
  
      return {
        userRef,
        userReactive,
        updateUserRef,
        updateUserReactive
      };
    }
  };
  </script>
  