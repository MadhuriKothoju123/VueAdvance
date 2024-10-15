<template>
    <div>
      <h1>Counter Example</h1>
  
      <p>Current Count: {{ count }}</p>
      <p>Double Count: {{ doubleCount }}</p>
      <p>Formatted: {{ formattedCount }}</p>
      <p>Is Even? {{ isEven ? 'Yes' : 'No' }}</p>
  
      <button @click="increment">Increment</button>
      <!-- <button @click="resetCount">Reset  Count</button> -->
      <button @click="resetCount">Reset store</button>

      <button @click="replaceState">replace store</button>
      <button @click="patchState">pactch state</button>
      <button @click="resetpatchCount">reset patch state</button>


    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { mapState } from 'pinia'; 
  import { useCounterStore } from '../piniastore/counterStore'; 
  export default defineComponent({
    computed: {
      ...mapState(useCounterStore, ['count']),
      ...mapState(useCounterStore, {
        doubleCount: 'doubleCount', 
        formattedCount: 'formattedCount', 
        isEven: 'isEven', 
      }),
    },
  
    methods: {
      // Access the store’s actions directly inside the methods section
      increment() {
  const store = useCounterStore();

        store.increment();  
      },
      resetCount() {
  const store = useCounterStore();

        store.resetCount();
      },
       resetStore(){
  const store = useCounterStore();

      store.$reset();
    },
    replaceState() {
  const store = useCounterStore();

      store.$state = { count: 24 , incrementBy: 10}; 
    },

    patchState() {
  const store = useCounterStore();

      store.$patch({
        count: store.count + 1,
        incrementBy: 5, 
      });
    },

     resetpatchCount() {
  const store = useCounterStore();

      store.$patch({ count: 0 });
    }
    },
  });
  </script>
  