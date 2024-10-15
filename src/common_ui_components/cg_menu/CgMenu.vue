<template>
    <div class="dropdown" @click="toggleDropdown">
      <slot name="icon">
        {{ buttonLabel }}
      </slot>
      <ul v-if="isOpen" class="dropdown-menu" @click.stop>
        <li
          v-for="(item, index) in items"
          :key="index"
          style="display: flex;"
          @click="handleItemClick(item)"
        >
          <CgIcon :icon="item?.icon"></CgIcon>
          {{ item?.label }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, withDefaults, defineProps } from 'vue';
  import CgIcon from '../cg_icon/CgIcon.vue';
  
  // Define props with default values
  const props = withDefaults(
    defineProps<{
      items: { label: string; value: any; icon: any }[]; // Array of menu items with label and value
      buttonLabel?: string; // Label for the dropdown button (if no icon is provided)
    }>(),
    {
      buttonLabel: 'Select' // Default button label if no slot is provided
    }
  );
  
  // State to manage the dropdown open/close
  const isOpen = ref(false);
  
  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };
  
  // Function to handle item click event
  const handleItemClick = (item: { label: string; value: any }) => {
    console.log('Selected item:', item);
    isOpen.value = false; // Close dropdown after selection
  };
  
  // Function to handle clicks outside the dropdown
  const handleClickOutside = (event: MouseEvent) => {
    const dropdownElement = document.querySelector('.dropdown');
    if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
      isOpen.value = false; // Close dropdown if clicked outside
    }
  };
  
  // Event listener to handle outside clicks
  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
  });
  </script>
  
  <style scoped>
  /* Basic styling for the dropdown */
  .dropdown {
    position: relative;
    display: inline-block;
  }
  
  .dropdown-menu {
    position: absolute;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    list-style-type: none;
    padding: 5px;
    margin: 0;
    right: 0;
    min-width: 150px;
    z-index: 100;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    overflow: hidden;
  }
  
  /* Dropdown menu item */
  .dropdown-menu li {
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden;
  text-overflow: ellipsis; 
  width: 100%;
  }
  
  .dropdown-menu li:hover {
    background-color:#e5f0f9; /* Change background on hover */
  }
  </style>
  