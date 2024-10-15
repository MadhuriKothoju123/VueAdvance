// src/stores/productStore.ts
import { defineStore } from 'pinia';

// Define the type for the Product state
interface ProductState {
  name: string;
  price: number;
  available: boolean;
}

// Define the store with typed state
export const useProductStore = defineStore<'productStore', ProductState>({
  id: 'productStore', // Store ID (for better debugging)

  state: (): ProductState => ({
    name: 'Wireless Headphones',  // Initial product name
    price: 99.99,                 // Initial price
    available: true,              // Initial availability
  }),
});
