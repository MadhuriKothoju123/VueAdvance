<template>
     <div class="product-card">
  <div @click="navigateToProductView()" class="image-container">
      <img v-if="product?.images" :src="product?.images[0]" alt="Product Image" class="product-image" />
    </div>
  <div class="product-info">
    <h3 class="product-title">{{ product.name }}</h3>
    <div class="pricing">
  <span v-if="product.discount && product.discount !== 0" class="price">₹{{ actualPrice }}</span>
  <span :class="{ 'original-price': product.discount && product.discount !== 0 }">
    ₹{{ product.price }}
  </span>
  
  <span v-if="product.discount && product.discount !== 0" class="discount">{{ product.discount }}% off</span>
</div>
    <div class="size"> sizes available : {{product?.sizes?.join(', ') }} </div>
    
    <div v-if="product.delivery==='yes'" class="free-delivery">Free Delivery</div>

  </div>
</div> 
</template>

<script setup lang="ts">


import { computed, defineProps } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});



const navigateToProductView= ()=>{
  console.log(props.product,"props.product.categoryId")
  const productQueryParam = props.product.id;
  router.push({ name: 'ProductView', query: { productQueryParam } });
}

const actualPrice = computed(() => {
  return Math.floor(props.product.price - (props.product.price * (props.product.discount / 100)))
});


</script>

<style scoped>
* {
  box-sizing: border-box;
}
.size{
  font-size: 14px;
  color: gray;
}

.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  width: 250px;
  font-family: Arial, sans-serif;
  background-color: white;
}

.timer {
  background-color: #ffe0b2;
  color: #d35400;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: inline-block;
}

.image-container {
  width: 100%;
  height: 0;
  padding-bottom: 75%; /* Adjust this value to maintain aspect ratio (4:3 aspect ratio here) */
  position: relative;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image covers the entire area */
  border-radius: 8px;
}
/* .product-image {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin-bottom: 10px;
} */


.product-title {
  font-size: 1rem;
  color: #333;
  margin-bottom: 8px;
  font-weight: bold;
}

.pricing {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
}

.price {
  font-size: 1.2rem;
  color: #333;
  font-weight: bold;
}

.original-price {
  font-size: 0.9rem;
  color: #888;
  text-decoration: line-through;
}

.discount {
  font-size: 0.9rem;
  color: #2ecc71;
}

.free-delivery {
  color: #816107;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.rating {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.rating-value {
  font-size: 1rem;
  background-color: #4caf50;
  color: white;
  padding: 3px 5px;
  border-radius: 5px;
}

.stars {
  font-size: 1rem;
  color: #f39c12;
}

.reviews {
  font-size: 0.8rem;
  color: #888;
}

</style>

