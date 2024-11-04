<template>
  <div class="product-form">
    <div class="main-content">
      <!-- Title Field -->
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          v-model="product.name"
          placeholder="Product Title"
        />
        <p v-if="!validations.title.isValid" class="error">{{ validations.title.message }}</p>
      </div>

      <!-- Description Field -->
      <div class="form-group">
        <label for="description">Description</label>
        <QuillEditor
          theme="snow"
          v-model:content="descriptionHtml"
          :options="editorOptions"
        />
        <p v-if="!validations.description.isValid" class="error">{{ validations.description.message }}</p>
      </div>

      <!-- Image Upload Section -->
      <div class="media-upload">
        <div class="media-header">
          <h3>Media</h3>
        </div>
        <div class="media-container">
          <div v-if="product.images.length" class="image-preview">
            <img
              v-for="(image, index) in product.images"
              :key="index"
              :src="image"
              alt="Uploaded media"
              class="uploaded-image"
            />
          </div>
          <div class="upload-area" @dragover.prevent @drop.prevent="handleDrop">
            <label for="imageUpload" class="upload-label">
              <input
                type="file"
                id="imageUpload"
                multiple
                accept="image/*"
                @change="handleImageUploads"
              />
              <div class="upload-content">
                <p>Add media or drop files to upload</p>
              </div>
            </label>
          </div>
          <p v-if="!validations.images.isValid" class="error">{{ validations.images.message }}</p>
        </div>
      </div>
    </div>

    <!-- Sidebar for Other Fields -->
    <div class="sidebar">
      <!-- Category Selection -->
      <div class="sidebar-section">
        <h3>Organization</h3>
        <div class="form-group">
          <label for="parent">Select Category:</label>
          <select
            id="parent"
            v-model="product.parentCategory"
            @change="filterCategoryByParentId"
               class="custom-input"
          >
            <option
              v-for="option in parentCategories"
              :key="option.id"
              :value="option.id"
            >
              {{ option.name }}
            </option>
          </select>
          <p v-if="!validations.parentCategory.isValid" class="error">{{ validations.parentCategory.message }}</p>
          <div v-if="product.parentCategory">
            <label for="child">Select Sub-category:</label>
            <select id="child"    class="custom-input" v-model="product.category">
              <option
                v-for="option in filteredCategories"
                :key="option.categoryId"
                :value="option.categoryId"
              >
                {{ option.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Vendor Field -->
      <div class="sidebar-section">
        <label for="vendor">Vendor</label>
        <input
          type="text"
          id="vendor"
          v-model="product.vendor"
          placeholder="Vendor name"
        />
        <p v-if="!validations.vendor.isValid" class="error">{{ validations.vendor.message }}</p>
      </div>

      <!-- Sizes Field -->
      <div class="sidebar-section">
        <h3>Sizes Available</h3>
        <input
          type="text"
          v-model="sizesInput"
          @input="handleSizesInput"
          placeholder="Enter sizes (e.g., S, M, L, XL)"
        />
      </div>

      <!-- Stock, Price, and Discount Fields -->
      <div class="sidebar-section">
        <label for="stock">Stock</label>
        <input
          type="number"
          id="stock"
          v-model="product.stock"
          placeholder="Enter stock quantity"
          class="custom-input"
        />
        <p v-if="!validations.stock.isValid" class="error">{{ validations.stock.message }}</p>
      </div>

      <div class="sidebar-section">
        <label for="price">Price</label>
        <input    class="custom-input" type="number" id="price" v-model="product.price" required />
        <p v-if="!validations.price.isValid" class="error">{{ validations.price.message }}</p>
      </div>

      <div class="sidebar-section">
        <label for="discount">Discount</label>
        <input    class="custom-input" type="number" id="discount" v-model="product.discount" />
        <p v-if="!validations.discount.isValid" class="error">{{ validations.discount.message }}</p>
      </div>

      <!-- Free Delivery Selection -->
      <div class="sidebar-section">
        <label>Free Delivery:</label>
        <div>
          <label>
            <input type="radio" v-model="product.delivery" value="yes" /> Yes
          </label>
          <label>
            <input type="radio" v-model="product.delivery" value="no" /> No
          </label>
        </div>
      </div>

      <!-- Save Button -->
      <div class="sidebar-section">
        <button @click="saveProduct" :disabled="!isFormValid">Save Product</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, Ref, ref, watch } from "vue";
import { useProductStore } from "../piniastore/products";
import { useCategoryStore } from "../piniastore/categories";
import { storeToRefs } from "pinia";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import Quill from "quill";
import { storage } from "../firebase";
import { Product } from "../types/product";

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const { parentCategories, categories } = storeToRefs(categoryStore);
const filteredCategories = ref<any>([]);

const product: Ref<Omit<Product, 'id'>>= ref({
  name: "",
  description: "",
  images: [],
  parentCategory: "",
  category: "",
  vendor: "",
  brand: "",
  stock: 0,
  sizes: [],
  delivery: "yes",
  price: 0,
  shippingPrice: 0,
  discount: 0
});

const validations = computed(() => ({
  title: {
    isValid: product.value.name.trim().length > 0,
    message: "Title is required.",
  },
  description: {
    isValid: product.value.description.trim().length > 0,
    message: "Description is required.",
  },
  images: {
    isValid: product.value.images.length > 0,
    message: "At least one image is required.",
  },
  parentCategory: {
    isValid: product.value.parentCategory !== "",
    message: "Please select a category.",
  },
  vendor: {
    isValid: product.value.vendor.trim().length > 0,
    message: "Vendor name is required.",
  },
  stock: {
    isValid: product.value.stock > 0,
    message: "Stock must be greater than zero.",
  },
  price: {
    isValid: product.value.price > 0,
    message: "Price must be a positive value.",
  },
  discount: {
    isValid: product.value.discount >= 0,
    message: "Discount cannot be negative.",
  },
}));

// Check if all validations pass
const isFormValid = computed(() =>
  Object.values(validations.value).every((field) => field.isValid)
);

const sizesInput = ref("");

const handleSizesInput = () => {
  product.value.sizes = sizesInput.value.split(",").map((size) => size.trim());
};

const descriptionHtml = ref("");

const quill = new Quill(document.createElement("div"));

const updateDescriptionHtml = (delta: any) => {
  if (quill) {
    quill.setContents(delta);
    product.value.description = quill.root.innerHTML;
  }
};

watch(
  () => descriptionHtml.value,
  (newValue) => {
    updateDescriptionHtml(newValue);
  },
  { immediate: true }
);

const editorOptions = {
  theme: "snow",
  placeholder: "Write product description here...",
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  },
};
onMounted(async () => {
  await categoryStore.fetchParentCategories();
  await categoryStore.fetchCategories();
});
const filterCategoryByParentId = async () => {
  filteredCategories.value = categories.value.filter(
    (category: any) => category.parentId === product.value.parentCategory
  );
};

const handleImageUploads = async (event: Event) => {
  const files: any = (event.target as HTMLInputElement).files;
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageReference = storageRef(storage, `products/${file.name}`);
      await uploadBytes(storageReference, file);
      const url: string = await getDownloadURL(storageReference);
      product.value.images.push(url);
    }
  }
};
const handleDrop = async (event: Event) => {
  const files = event.dataTransfer.files;

  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageReference = storageRef(storage, `products/${file.name}`);

      await uploadBytes(storageReference, file);
      const url:string = await getDownloadURL(storageReference);
      product.value.images.push(url);
    }
  }
};
const saveProduct = async () => {
  if (!isFormValid.value) return;
  const res= await productStore.addProduct(product.value);
  alert(res.message)
  product.value={
  name: "",
  description: "",
  images: [],
  parentCategory: "",
  category: "",
  vendor: "",
  brand: "",
  stock: 0,
  sizes: [],
  delivery: "yes",
  price: 0,
  shippingPrice: 0,
  discount: 0
}
 
};
</script>

<style scoped>
.product-form {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 20px;
}

.main-content {
  width: 60%;
}

.sidebar {
  padding: 20px;
  border-left: 1px solid #ddd;
}

.form-group {
  margin-bottom: 20px;
}
.custom-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

.custom-input:focus {
  border-color: #007bff;
  outline: none;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

input[type="text"],
input[type="file"] {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.quill-editor {
  border: 1px solid #ccc;
  border-radius: 4px;
}

.sidebar-section {
  margin-bottom: 30px;
}

h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}
.uploaded-image {
  width: 100%; /* Ensures the image takes up the full width of the container */
  height: auto; /* Maintains the aspect ratio of the image */
  max-width: 300px; /* Maximum width the image can take (change this as needed) */
  max-height: 300px; /* Maximum height the image can take (adjust as needed) */
  object-fit: cover; /* Ensures the image covers the container without distortion */
  border-radius: 4px; /* Optional: Adds rounded corners to the images */
}

.image-preview {
  display: flex; 
  flex-wrap: wrap; /* Wraps the images onto new lines if there's not enough space */
  gap: 10px; /* Adds space between images */
}

.upload-area {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}

.upload-label {
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.url-input {
  margin-top: 10px;
}

.url-input input {
  width: calc(100% - 80px);
  padding: 10px;
}

.url-input button {
  padding: 10px 20px;
  margin-left: 10px;
}
</style>
