<template>
    <div class="toolbar">
      <div class="toolbar-title">Categories</div>
      <div class="categories">
        <i
          v-for="category in categories"
          :key="category"
          @click="filterCategory(category)"
          class="category-item"
        >
          {{ category }}
        </i>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Define categories array
  const categories = ref([
    'Fashion',
    'Electronics',
    'Home & Living',
    'Beauty',
    'Sports'
  ]);
  
  // Function to handle category selection
  const filterCategory = (category) => {
    console.log(`Filtering by: ${category}`);
    // Add filtering logic here (e.g., emit event or call an API)
  };
  </script>
  
  <style scoped>
  /* Toolbar container styles */
  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    padding: 10px 20px;
    color: white;
  }
  
  /* Toolbar title styles */
  .toolbar-title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  /* Categories buttons container styles */
  .categories {
    display: flex;
    gap: 10px;
  }
  
  /* Individual category button styles */
  .category-item {
    /* background-color: #555; */
    color: white;
    border: none;
    padding: 10px 15px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    
  }
  .category-item:hover {
    color: #e334f3 ;
  }
  
  .category-button:hover {
    background-color: #777;
  }
  
  .category-button:active {
    background-color: #999;
  }
  </style>
  