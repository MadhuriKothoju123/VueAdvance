<template>
  <div class="container">
    <CgCard :width="602">
      <form @submit.prevent="saveSupplier()">
        <h2
          style="
            color: #bd3dc7;
            background: var(
              --Gradient,
              linear-gradient(90deg, #0c73d4 1.04%, #e334f3 100%)
            );
            -webkit-background-clip: text;
            color: transparent;
          "
        >
          Sell online to 14 Cr+ customers at 0% Commission
        </h2>
        <div style="text-align: center;">
          <h3>Become a seller</h3>
        </div>
        <p style="color: gray">
          Become a seller and grow your business across India
        </p>

        <!-- Input Group -->
        <div class="input-group">
          <!-- Phone Input -->
          <input
            v-model="supplier.contact.phone"
            @input="validatePhone(supplier.contact.phone)"
            class="text-input"
            type="text"
            id="phonenumber"
            placeholder="Enter mobile number"
            required
          />
          <span v-if="phoneError" class="error">{{ phoneError }}</span>

          <!-- Email Input -->
          <input
            v-model="supplier.contact.email"
            @input="validateEmail(supplier.contact.email)"
            class="text-input"
            type="email"
            id="email"
            placeholder="Enter email id"
            required
          />
          <span v-if="emailError" class="error">{{ emailError }}</span>

          <p style="text-align: start; color: gray">
            Enter pickup Address and make sure to provide steet and landmark
          </p>
          <div style="display: flex; flex-direction: column">
            <label style="text-align: start">state</label>

            <select
              v-model="supplier.address.state"
              @change="onStateChange"
              class="text-select"
              required
            >
              <option v-for="state in states" :key="state.isoCode" :value="state.name">{{ state.name }}</option>
            </select>
            <span v-if="stateError" class="error">{{ stateError }}</span>
          </div>

          <div
            v-if="cities.length"
            style="display: flex; flex-direction: column"
          >
            <label style="text-align: start">city</label>
            <select
              aria-placeholder="select city"
              class="text-select"
              v-model="supplier.address.city"
              v-if="cities.length"
            >
              <option
                v-for="city in cities"
                :key="city.name"
                :value="city.name"
              >
                {{ city.name }}
              </option>
            </select>
            <span v-if="cityError" class="error">{{ cityError }}</span>
          </div>

          <!-- Street Input -->
          <input
            v-model="supplier.address.street"
            @input="validateStreet(supplier.address.street)"
            class="text-input"
            type="text"
            id="street"
            placeholder="Enter street and landmark"
            required
          />
          <span v-if="streetError" class="error">{{ streetError }}</span>

          <!-- Password Input -->
          <input
            v-model="supplier.password"
            @input="validatePassword(supplier.password)"
            class="text-input"
            type="password"
            id="password"
            placeholder="Enter password"
            required
          />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>

        <!-- Submit Button -->
        <div style="display: flex; justify-content: flex-end;">
          <BaseButton color="#535bf2" type="submit">Become A Supplier</BaseButton>
        </div>
      </form>
    </CgCard>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { CgCard } from "../common_ui_components";
import { State, City, IState, ICity } from "country-state-city";
import { useSupplierStore } from "../piniastore/suppliers";
import { useAuthStore } from "../piniastore/auth";
import { ISupplier } from "../types/supplier";
import { BaseButton } from "@madhurikothoju123/cg_ui_project";
import { useRouter } from "vue-router";
import { validateEmail, validatePassword, validatePhone, validateState, validateCity, validateStreet, emailError, passwordError, phoneError, stateError, cityError, streetError } from '../Validations';

const supplierStore = useSupplierStore();
const authStore = useAuthStore();
const router = useRouter();

const supplier: Omit<ISupplier, "createdAt" | "updatedAt"> = reactive({
  userId: authStore.user?.uid,
  password: "",

  contact: {
    email: "",
    phone: "",
  },
  address: {
    street: "",
    city: "",
    state: "",
    country: "India", // Default country as India
  },
  productsSupplied: [] as string[],
});
const states = ref<IState[]>([]);
const cities = ref<ICity[]>([]);
const selectedCountry = ref<string>("IN");
onMounted(() => {
  states.value = State.getStatesOfCountry("IN");
});

const onStateChange = () => {
  cities.value = City.getCitiesOfState(
    selectedCountry.value,
    supplier.address.state
  );
  console.log( City.getCitiesOfState(
    selectedCountry.value,
    supplier.address.state
  ))
};
const saveSupplier = async () => {
  validateEmail(supplier.contact.email);
  validatePassword(supplier.password);
  validatePhone(supplier.contact.phone);
  validateState(supplier.address.state);
  validateCity(supplier.address.city);
  validateStreet(supplier.address.street);
  if (!emailError.value && !passwordError.value && !phoneError.value && !stateError.value && !streetError.value) {
  try {
    console.log(supplier, "supplier");
    await supplierStore.addSupplier(supplier);
    router.push({name: 'SupplierLogin'} );
  } catch (error) {
    console.error("Error saving supplier:", error);
  }
}
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 20px;
}

.input-container {
  display: flex;
  align-items: center;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  width: 100%;
  max-width: 400px;
  padding: 5px;
}

.country-code {
  margin-right: 10px;
  font-size: 16px;
  color: #888;
}

.text-input {
  border: 1px solid rgb(180, 179, 179);
  outline: rgb(180, 179, 179);
  /* flex: 2; */
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  /* padding: 10px; */
}
.text-select {
  border: 1px solid rgb(180, 179, 179);
  outline: rgb(180, 179, 179);
  padding: 10px;
  font-size: 15px;
  border-radius: 8px;
}
.input-group {
  margin-bottom: 20px;
  /* padding: 20px; */
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.start-selling-button {
  background-color: #ff4081; /* Pink color */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.start-selling-button:hover {
  background-color: #e91e63; /* Darker pink on hover */
}
</style>
