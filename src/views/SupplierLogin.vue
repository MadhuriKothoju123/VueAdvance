<template>
  <div style="display: flex; justify-content: center;">
    <div class="login-container">
      <div class="login-box">
        <h2>Supplier Login</h2>
        <form id="loginForm" @submit.prevent="handleLogin">
          <div class="input-group">
            <input
              type="email"
              id="email"
              v-model="supplier.email"
              required
              placeholder=" "
              @change="validateEmail(supplier.email)"
            />
            <label for="email">Email</label>
            <span v-if="emailError" class="error">{{ emailError }}</span>
          </div>
          <div class="input-group">
            <input
              type="password"
              id="password"
              v-model="supplier.password"
              required
              placeholder=" "
              @change="validatePassword(supplier.password)"
            />
            <label for="password">Password</label>
            <span v-if="passwordError" class="error">{{ passwordError }}</span>
          </div>
          <button type="submit" class="login-btn" :disabled="!isFormValid">Login</button>
          {{ suppliers.supplierId }}
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import { useRouter } from 'vue-router';
import { emailError, passwordError, validateEmail, validatePassword } from '../Validations';

import { useSupplierStore } from '../piniastore/suppliers';
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
const router= useRouter();
const isFormValid = computed(() => !emailError.value && !passwordError.value);
const supplier= ref({
  email: '',
  password: '',
});
const supplierStore= useSupplierStore();
const {suppliers}= storeToRefs(supplierStore);
const handleLogin=async()=>{
if(suppliers.suplierId){
  router.push({name:'Dashboard'})
}
else{
  validateEmail(supplier.value.email);
  validatePassword(supplier.value.password);
  if (!emailError.value && !passwordError.value) {
 const res= await supplierStore.loginSupplier(supplier
 .value.email, supplier.value.password)
 console.log(res,"res")
 if(res.success){
 alert(res.message);

 router.push({name: 'AddProduct'})

 }
 else{
  alert(res.message);
  router.push({name: 'SupplierLogin'})
 }
  }
}
}


onMounted(()=>{
  if(suppliers.supplierId){
    console.log("mounted")
      router.push({name:'Dashboard'})
    }
})




</script>


<style scoped>
.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  background: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #333;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: white;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.login-box {
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.input-group {
  margin-bottom: 15px;
  position: relative;
}

.input-group label {
  position: absolute;
  top: 14px;
  left: 10px;
  font-size: 14px;
  color: #999;
  pointer-events: none;
  transition: 0.3s ease;
}

.input-group input {
  width: 100%;
  padding: 12px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: 0.3s ease;
  font-size: 14px;
}

.input-group input:focus {
  border-color: #007bff;
}

.input-group input:focus + label,
.input-group input:not(:placeholder-shown) + label {
  top: -8px;
  left: 5px;
  font-size: 12px;
  color: #007bff;
  background: white;
  padding: 0 5px;
}

.login-btn {
  width: 100%;
  padding: 12px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: #0056b3;
}

.login-btn:active {
  background-color: #004085;
}

.login-box p {
  text-align: center;
  margin-top: 10px;
  color: #555;
}

.login-box a {
  color: #007bff;
  text-decoration: none;
  transition: 0.3s ease;
}

.login-box a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-container {
    margin: 0 15px;
  }
}

</style>