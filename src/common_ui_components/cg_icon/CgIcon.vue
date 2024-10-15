<template>
    <i :class="computedClass" :style="computedStyle"></i>
  </template>
  
  <script setup lang="ts">
  import { computed, withDefaults, defineProps } from 'vue';
  
  // Define props with default values
  const props = withDefaults(
    defineProps<{
      icon: string;          // Class name for the icon
      size?: string | number; // Size of the icon, e.g. '24px'
      color?: string;         // Color of the icon, e.g. 'blue'
      customClass?: string;   // Additional custom classes for the icon
    }>(),
    {
      size: '24px',          // Default size
      color: '#000',         // Default color (black)
      customClass: ''        // Default empty class
    }
  );
  
  // Computed class to add the icon class and any custom class
  const computedClass = computed(() => {
    return `${props.icon} ${props.customClass}`;
  });
  
  // Computed style to apply dynamic size and color
  const computedStyle = computed(() => ({
    fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
    color: props.color
  }));
  </script>
  
  <style scoped>
  /* Common styles for icons */
  i {
    display: flex;
    align-items: center;
    line-height: 1;
    text-align: center;
    vertical-align: middle;
    padding: 0px 5px 0px 5px;
    
  }
  </style>
  