<template>
    <div class="image-carousel">
      <div class="carousel-container">
        <div class="carousel-slide" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
          <img v-for="(image, index) in productImages" :key="index" :src="image" class="carousel-image" />
        </div>
      </div>
      <button class="carousel-button left" @click="prevSlide">❮</button>
      <button class="carousel-button right" @click="nextSlide">❯</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  
  const productImages = ref(["image1.jpg", "image2.jpg", "image3.jpg"]); 
  const currentIndex = ref(0);
  
  const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % productImages.value.length;
  };
  
  const prevSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + productImages.value.length) % productImages.value.length;
  };
  </script>
  
  <style scoped>
  .image-carousel {
    position: relative;
    width: 100%; /* Adjust width as needed */
    overflow: hidden;
  }
  
  .carousel-container {
    display: flex;
    transition: transform 0.5s ease;
  }
  
  .carousel-slide {
    display: flex; /* Arrange images in a row */
  }
  
  .carousel-image {
    width: 100%; /* Adjust image size */
    height: auto; /* Maintain aspect ratio */
    min-width: 100%; /* Each image takes full width of carousel */
  }
  
  .carousel-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.8);
    border: none;
    cursor: pointer;
    font-size: 2rem; /* Adjust size of arrows */
    padding: 0 10px;
  }
  
  .carousel-button.left {
    left: 10px; /* Position left button */
  }
  
  .carousel-button.right {
    right: 10px; /* Position right button */
  }
  </style>
  