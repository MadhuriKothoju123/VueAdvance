<template>
    <div>
      <h1>Shopping Cart</h1>
  
      <ul>
        <li v-for="item in cartItems" :key="item.id">
          {{ item.name }} - {{ item.quantity }} x {{ item.price }}
          <button @click="removeFromCart(item.id)">Remove</button>
        </li>
      </ul>
  
      <h2>Add Product</h2>
      <form @submit.prevent="addItem">
        <label>
          Product Name:
          <input v-model="newItem.name" required />
        </label>
        <label>
          Quantity:
          <input type="number" v-model.number="newItem.quantity" min="1" required />
        </label>
        <label>
          Price:
          <input type="number" v-model.number="newItem.price" min="0.01" step="0.01" required />
        </label>
        <button type="submit">Add to Cart</button>
      </form>
  
      <button @click="clearCart">Clear Cart</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { useCartStore } from '../piniastore/cart';
  import { storeToRefs } from 'pinia';
  
  export default defineComponent({
    setup() {
      const cartStore = useCartStore();
      const { items: cartItems } = storeToRefs(cartStore);
  
      // Reactive object to store the new product data from the form
      const newItem = reactive({
        name: '',
        quantity: 1,
        price: 0.0,
      });
  
      // Function to add an item to the cart
      const addItem = () => {
        const item = { 
          id: Date.now(),  // Use timestamp as a unique ID
          name: newItem.name,
          quantity: newItem.quantity,
          price: newItem.price,
        };
        cartStore.addItem(item);  // Call the action from the store
  
        // Clear the form after adding
        newItem.name = '';
        newItem.quantity = 1;
        newItem.price = 0.0;
      };
  
      // Method to remove an item by ID
      const removeFromCart = (id: number) => cartStore.removeItem(id);
  
      // Clear the cart completely
      const clearCart = () => cartStore.clearCart();
  
      return {
        cartItems,
        newItem,
        addItem,
        removeFromCart,
        clearCart,
      };
    },
  });
  </script>
  