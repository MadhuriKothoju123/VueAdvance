<template>
  <div v-if="cart.length" class="cart-page">
    <div class="product-details-section">
      <h2>Product Details</h2>
      <div v-for="item in cart" :key="item.id" class="product-card">
        <img :src="item.image" alt="Product Image" class="product-image" />
        <div class="product-info">
          <h3>{{ item.name }}</h3>
          <!-- <span class="edit-link">EDIT</span> -->
          <div class="pricing">
            <span v-if="item.discount && item.discount !== 0" class="price"
              >₹{{ Math.round(item.finalPrice) }}</span
            >
            <span
              :class="{
                'original-price': item.discount && item.discount !== 0,
              }"
            >
              ₹{{ item.price }}
            </span>

            <span v-if="item.discount && item.discount !== 0" class="discount"
              >{{ item.discount }}% off</span
            >
          </div>
          <div class="details">
            <p>All issue easy returns</p>
            <p>Size: {{ item.selectedSize }} &bull; Qty: {{ item.quantity }}</p>
          </div>

          <BaseButton outline color="#ff5722" @click="removeProduct(item.id)">✖ REMOVE</BaseButton>
          <div class="footer">
        <p>Sold by: {{ item.vendor }} &bull; Delivery Fee: ₹{{ deliveryFee }}</p>
      </div>

        </div>
        
      </div>
     
    </div>

    <div class="price-details-section">
      <h2>Price Details ({{ cart.length }} Items)</h2>
      <div class="price-summary">
        <div class="price-item">
          <span>Total Product Price</span>
          <span>+ ₹{{ totalProductPrice }}</span>
        </div>
        <div class="price-item discount">
          <span>Total Discounts</span>
          <span>- ₹{{ totalDiscount }}</span>
        </div>
        <div class="price-item">
          <span>Additional Fees</span>
          <span>+ ₹{{ deliveryFee }}</span>
        </div>
      </div>
      <div class="order-total">
        <h3>Order Total</h3>
        <span>₹{{ orderTotal }}</span>
      </div>
      <div class="discount-message" v-if="totalDiscount > 0">
        <span>🎉 Yay! Your total discount is ₹{{ totalDiscount }}</span>
      </div>
      <div class="continue-notice">
        Clicking on 'Continue' will not deduct any money
      </div>
      <BaseButton  class="continue-button">Continue</BaseButton>
      <div class="safety-info">
        <!-- <img src="path/to/mesho-safe-icon.png" alt="Safety Icon" /> -->
        <div>
          <h4>Your Safety, Our Priority</h4>
          <p>
            We make sure that your package is safe at every point of contact.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div style="display: flex;" > <h4>No Cart Items are available <a @click="navigateToDashBoard()">Dashboard</a></h4> 
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCartStore } from "../piniastore/cart";
import { onMounted, ref } from "vue";
import { BaseButton } from "@madhurikothoju123/cg_ui_project";
import { useRouter } from "vue-router";


const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);
const router= useRouter();

const deliveryFee = 142;

const totalProductPrice = ref(
  cart.value.reduce((total:number, item: any) => total + item.price * item.quantity, 0)
);
const totalDiscount = ref(
  cart.value.reduce(
    (total:number, item: any) =>
      total + Math.round(item.price * (item.discount / 100)) * item.quantity,
    0
  )
);
const orderTotal = ref(
  totalProductPrice.value - totalDiscount.value + deliveryFee
);

const removeProduct = async(id: string) => {
await cartStore.removeItemFromCart(id)
};
onMounted(async () => {
  await cartStore.fetchCart();
});
const navigateToDashBoard=async()=>{
 await router.push('./dashboard')
}
</script>

<style scoped>
.cart-page {
  display: flex;
  gap: 20px;
  font-family: Arial, sans-serif;
  margin: 20px;
}

.product-details-section,
.price-details-section {
  width: 50%;
}

.product-card {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  gap: 15px;
  position: relative;
}

.product-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
}

.product-info h3 {
  font-size: 1.2rem;
  margin: 0;
}

.edit-link {
  color: #9c27b0;
  font-size: 0.8rem;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

.pricing {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 5px;
}

.discounted-price {
  font-weight: bold;
  color: #333;
}

.original-price {
  text-decoration: line-through;
  color: #888;
}

.discount {
  color: #ff5722;
  font-size: 0.9rem;
}

.details,
.seller-info {
  font-size: 0.9rem;
  color: gray;
  /* margin-bottom: 20px; */
}

button {
  background: none;
  border: none;
  color: #ff5722;
  cursor: pointer;
  font-size: 0.9rem;
}

.footer {
  border-top: 1px solid #ddd;
  padding-top: 10px;
  font-size: 0.9rem;
  color: #666;
  margin-top: 10px;
}

.price-summary {
  border-top: 1px solid #ddd;
  padding-top: 10px;
}

.price-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.order-total {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-top: 10px;
}

.discount-message {
  background-color: #e0f7fa;
  color: #00796b;
  padding: 10px;
  border-radius: 5px;
  margin: 15px 0;
  text-align: center;
}

.continue-notice {
  font-size: 0.8rem;
  color: #555;
  text-align: center;
  margin-bottom: 10px;
}

.continue-button {
  width: 100%;
  padding: 10px;
  background-color: #9c27b0;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.safety-info {
  display: flex;
  gap: 10px;
  font-size: 0.8rem;
  color: #333;
  margin-top: 20px;
  align-items: center;
}
</style>
