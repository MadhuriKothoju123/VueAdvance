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
        <h3>Become a seller</h3>
        <p style="color: gray">
          Become a seller and grow your business across India
        </p>
        <div class="input-group">
          <input
            v-model="supplier.contact.phone"
            class="text-input"
            type="text"
            id="phonenumber"
            placeholder="Enter mobile number"
            required
          />
          <input
            v-model="supplier.contact.email"
            class="text-input"
            type="email"
            id="email"
            placeholder="Enter email id"
            required
          />

          <p style="text-align: start; color: gray">
            Enter pickup Address and make sure to provide steet and landmark
          </p>

          <div style="display: flex; flex-direction: column">
            <label style="text-align: start">state</label>

            <select
              aria-placeholder="select state"
              class="text-select"
              v-model="supplier.address.state"
              @change="onStateChange"
              v-if="states.length"
            >
              <option
                v-for="state in states"
                :key="state.isoCode"
                :value="state.name"
              >
                {{ state.name }}
              </option>
            </select>
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
          </div>

          <input
            v-model="supplier.address.street"
            class="text-input"
            type="text"
            id="street"
            placeholder="Enter street and landmark"
            required
          />
          <input
            v-model="supplier.password"
            class="text-input"
            type="password"
            id="password"
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit">Submit</button>
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

const supplierStore = useSupplierStore();
const authStore = useAuthStore();

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
};
const saveSupplier = async () => {
  try {
    console.log(supplier, "supplier");
    await supplierStore.addSupplier(supplier);
  } catch (error) {
    console.error("Error saving supplier:", error);
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
  padding: 20px;
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
