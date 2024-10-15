<template>
    <div>
      <h1>Product Management</h1>
  
      <p><strong>Product Name:</strong> {{ name }}</p>
  
      <h2>Edit Product Details:</h2>
      
      <div>
        <label for="price">Price: </label>
        <input v-model="price" type="number" id="price" step="0.01" />
  
        <label for="available">Available: </label>
        <input v-model="available" type="checkbox" id="available" />
      </div>
  
      <h2>Product Summary:</h2>
      <p>Price: ${{ price }}</p>
      <p>Available: {{ available ? 'Yes' : 'No' }}</p>
      <button  @click="changeName">chnage</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { mapWritableState } from 'pinia'; // Import mapWritableState helper
  import { useProductStore } from '../piniastore/products'; // Import product store
  
  export default defineComponent({
    computed: {
      // Bind product store state with two-way data binding (writable)
      ...mapWritableState(useProductStore, ['price', 'available', 'name']),
  
      // Bind the product name with a custom name in the component
      ...mapWritableState(useProductStore, {
        productName: 'name',
      }),
    },
    methods: {
        changeName() {
      this.name = "mobile";  // Modify state directly
    },
    }
  
  });
  </script>
  