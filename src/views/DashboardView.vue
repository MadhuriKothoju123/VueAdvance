
<template>

<div  v-if="filteredProducts.length"  class="product-grid" >

  <MiniProductView  v-for="product in filteredProducts" :key="product.id" :product="product" />
</div>
<div style="display: flex;" v-else> <h4>There no products added for this categories. <a @click="navigateToDashBoard()">Dashboard</a></h4> 
</div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProductStore } from "../piniastore/products";
import { computed, onMounted, ref, watch } from "vue";
import MiniProductView from "../components/MiniProductView.vue";
import { useRoute, useRouter } from "vue-router";
import { useCartStore } from "../piniastore/cart";

const productStore = useProductStore();
const cartStore= useCartStore()

const { products } = storeToRefs(productStore);
const route = useRoute();
const router= useRouter();
const categoryId = ref(route.query.categoryId);
const filteredProducts = computed(() => {
  if (categoryId.value) {
    return products.value.filter((product:any) => product.category === categoryId.value);
  }
  return products.value; 
});

watch(
  () => route.query.categoryId,
  (newCategoryId) => {
    categoryId.value = newCategoryId; 
  },
);
const navigateToDashBoard=async()=>{
 await router.push('./dashboard')
}
onMounted(async () => {
  await productStore.getProducts();
  await  cartStore.fetchCart();

});
</script>
<style scoped>
* {
  box-sizing: border-box;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* Six columns */
  gap: 16px;
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

.product-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
}

.product-info {
  text-align: center;
}

.product-title {
  font-size: 1rem;
  color: #333;
  margin-bottom: 8px;
  font-weight: bold;
}

.pricing {
  display: flex;
  justify-content: center;
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
  color: #5d9cec;
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
