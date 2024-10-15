import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface CounterState {
    count: number;
    incrementBy: number;
  }
  
  export const useCounterStore = defineStore('counterStore', {
    state: (): CounterState => ({
      count: 0,
      incrementBy: 2,
    }),

  getters: {
    doubleCount: (state) => state.count * 2,

    formattedCount: (state) => `The count is: ${state.count}`,

    isEven: (state) => state.count % 2 === 0,
  },

  actions: {
    increment() {
      this.count += this.incrementBy;
    },

    resetCount() {
      this.count = 0;
    },
  },
});
