<template>
  <div v-if="selectedProduct" class="product-page">
    <div class="product-images">
      <div class="image-carousel">
        <button style="cursor: pointer !important;" class="carousel-button left" @click="prevSlide">‹</button>
        <div
          class="carousel-container"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div
            v-for="(image, imgIndex) in selectedProduct.images"
            :key="imgIndex"
            class="carousel-slide"
          >
            <img :src="image" alt="Product Image" class="carousel-image" />
          </div>
        </div>
        <button class="carousel-button right" @click="nextSlide">›</button>
      </div>
      <div class="thumbnail-container">
        <div
          v-for="(image, imgIndex) in selectedProduct.images"
          :key="imgIndex"
          class="thumbnail"
          @click="selectImage(imgIndex)"
        >
          <img :src="image" alt="Product Image Thumbnail" />
        </div>
      </div>

      <button class="add-to-cart" @click="addToCart">Add to Cart</button>
      <button class="buy-now">Buy Now</button>
    </div>
    <div class="product-details">
      <h4 style="margin: 0px;">{{ selectedProduct.name }}</h4>
      <div class="pricing">
  <p v-if="selectedProduct.discount && selectedProduct.discount !== 0" class="price">₹{{ actualPrice }}</p>
  <p :class="{ 'original-price': selectedProduct.discount && selectedProduct.discount !== 0 }">
    ₹{{ selectedProduct.price }}
  </p>
  <p v-if="selectedProduct.discount && selectedProduct.discount !== 0" class="discount">
    {{ selectedProduct.discount }}% off
  </p>
</div>

      <p style="background-color: aquamarine; width: fit-content; padding: 5px; border-radius: 12px;" v-if="selectedProduct.delivery==='yes'">Free Delivery</p>
      <p v-else-if="selectedProduct.delivery==='no'">$ shipping price- {{ selectedProduct.shippingPrice }}</p>
      <div class="sizes">
        <h3>Select Size</h3>
        <div
          v-for="size in selectedProduct.sizes"
          :key="size"
          :class="['size-option', { selected: size === selectedSize }]"
          @click="selectSize(size)"
        >
          {{ size }}
        </div>
      </div>

      <div style=" border-radius: 12px; padding: 10px;">
      <h2>Product Details</h2>
      <div v-html="selectedProduct.description"></div>
    </div> 
     
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProductStore } from "../piniastore/products";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "../piniastore/auth";
import { useCartStore } from "../piniastore/cart";

const route = useRoute();
const productStore = useProductStore();
const { products } = storeToRefs(productStore);

const categoryId = ref(route.query.productQueryParam);
const selectedProduct: any = ref({});
const currentIndex = ref(0);
const selectedSize = ref('');
const authStore= useAuthStore();
const cartStore= useCartStore();

const { user } = storeToRefs(authStore);


const actualPrice = computed(() => {return Math.round(selectedProduct.value.price - (selectedProduct.value.price * (selectedProduct.value.discount / 100)));

});
const fetchProducts = async () => {
  console.log(products.value, "categoryId.value")
  selectedProduct.value = products.value.find(
    (product: any) => product.id ==categoryId.value
  );
  console.log(  selectedProduct.value , "  selectedProduct.value ")
};

const nextSlide = () => {
  currentIndex.value =
    (currentIndex.value + 1) % selectedProduct.value.images.length;
};

const prevSlide = () => {
  console.log(currentIndex.value, "currentIndex")
  currentIndex.value =
    (currentIndex.value - 1 + selectedProduct.value.images.length) %
    selectedProduct.value.images.length;
};

const selectImage = (imageIndex: number) => {
  currentIndex.value = imageIndex;
};



const selectSize = (size: string) => {
  selectedSize.value = size;
};

const addToCart = async() => {
  console.log("Add to Cart:", selectedProduct.value, selectedSize.value);
  const cartItem = {
    productId: selectedProduct.value.id,
    name: selectedProduct.value.name,
    price: selectedProduct.value.price,
    discount: selectedProduct.value.discount,
    finalPrice: actualPrice,
    quantity: 1, 
    selectedSize: selectedSize.value, 
    image: selectedProduct?.value.images[0], 
    vendor: selectedProduct.value.vendor,
    brand:selectedProduct.value.brand,
    userId: user.value.uid
  };
await cartStore.addItemToCart(cartItem)


};

watch(
  () => route.query.productQueryParam,
  (newCategoryId) => {
    categoryId.value = newCategoryId;
    fetchProducts();
  }
);

onMounted(async() => {
  await fetchProducts();
});
</script>

<style scoped>
.product-page {
  display: flex;
  gap: 20px;
  margin-bottom: 40px; 
  margin-top: 30px;
}

.product-images {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  margin: 0px;
}

.original-price {
  font-size: 0.9rem;
  color: #888;
  text-decoration: line-through;
  margin: 0px;

}

.discount {
  font-size: 0.9rem;
  color: #2ecc71;
  margin: 0px;
}

.image-carousel {
  position: relative;
  width: 400px; /* Adjust width as needed */
  overflow: hidden;
}

.carousel-container {
  display: flex;
  transition: transform 1s ease;
}

.carousel-slide {
  display: flex; /* Arrange images in a row */
}

.carousel-image {
  width: 400px; /* Adjust image size */
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

.thumbnail-container {
  display: flex;
  gap: 5px;
}

.thumbnail {
  cursor: pointer;
  border: 1px solid #ddd;
  padding: 5px;
}

.thumbnail img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.product-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}


.rating {
  display: flex;
  gap: 10px;
  align-items: center;
}

.sizes {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
}

.size-option {
  /* display: flex; */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
  padding: 10px;
}
.size-option:hover{
  background-color: #9a0ba7 ;
}

.size-option.selected {
  background-color: #9a0ba7 ;
color: white;
  border-color: #000;
}

.add-to-cart,
.buy-now {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.add-to-cart {
  background-color: #f0c14b;
  color: #111;
}

.buy-now {
  background-color: #d9534f;
  color: #fff;
}
</style>
