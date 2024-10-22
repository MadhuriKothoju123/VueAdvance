<template>
  <div class="container">
    <h1>User Information</h1>

    <div class="controls">
      <label for="user-id">Select User ID:</label>
      <select v-model="selectedId" id="user-id">
        <option v-for="id in [1, 2, 3, 4, 5]" :key="id" :value="id">
          User {{ id }}
        </option>
      </select>
    </div>

    <div class="user-data" v-if="loading">
      <p>Loading user data...</p>
    </div>

    <div v-else-if="error">
      <p class="error">{{ error }}</p>
    </div>

    <div v-else>
      <h2>{{ userData.name }}</h2>
      <p>Age: {{ userData.age }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, watchEffect } from 'vue';

const selectedId = ref(1); 
const userData = reactive({ name: '', age: 0 });
const error = ref(null);
const loading = ref(false);

watchEffect(async () => {
  console.log("watchEffect");
  loading.value = true;
  try {
    const data = await fetchUser(selectedId.value); 
    Object.assign(userData, data); 
    error.value = null;
  } catch (err) {
    error.value = 'Failed to fetch user data';
  } finally {
    loading.value = false;
  }
});

// watch(selectedId, async (newId) => {
//   console.log("watch");

//   loading.value = true;
//   try {
//     const data = await fetchUser(newId); 
//     Object.assign(userData, data);
//     error.value = null;
//   } catch (err) {
//     error.value = 'Failed to fetch user data';
//   } finally {
//     loading.value = false;
//   }
// });

async function fetchUser(id) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ name: `User ${id}`, age: id * 10 }), 3000)
  );
}

 </script>