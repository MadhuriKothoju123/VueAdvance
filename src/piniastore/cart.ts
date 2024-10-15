import { defineStore } from 'pinia';

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],  
  }),

  actions: {
    addItem(item: CartItem) {
      const existingItem = this.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;  
      } else {
        this.items.push(item);  
      }
    },

    removeItem(itemId: number) {
      this.items = this.items.filter((i) => i.id !== itemId);
    },

    clearCart() {
      this.items = [];
    },
  },
});
