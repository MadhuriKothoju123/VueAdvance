<template>
  <div>
    <div>
      <div
        style="
          border: 1px solid lightgray;
          padding: 0px 10px 0px 10px;
          display: flex;
          justify-content: space-between;
        "
      >
        <h2
          style="
            background: var(
              --Gradient,
              linear-gradient(90deg, #0c73d4 1.04%, #e334f3 100%)
            );
            -webkit-background-clip: text;
            color: transparent;
          "
        >
          Shopy Cart
        </h2>
        <div v-if="!suppliers.supplierId" style="display: flex; column-gap: 10px; align-items: center">
          <b>already have an account</b>
          <CgButton @click="supplierLogin()" color="#bd3dc7" outline>Login</CgButton>
          <CgButton @click="navigateToDashboard()" color="#2983f3">Dashboard</CgButton>

        </div>
        <div style="display: flex;" v-else>
          <div  style="display: flex; column-gap: 10px; align-items: center">
            <CgButton @click="navigateToDashboard()" color="#2983f3" >Dashboard</CgButton>
        <CgButton @click="logoutSUpplier()" color="#bd3dc7" outline> supplier Logout</CgButton>
        </div>
      </div>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">

import { useSupplierStore } from '../piniastore/suppliers';
import { CgButton } from '../common_ui_components';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const supplierStore= useSupplierStore();
const router= useRouter();

const {suppliers}= storeToRefs(supplierStore);
const supplierLogin=async()=>{

  router.push({name: 'SupplierLogin'})


}
const navigateToDashboard=()=>{
  router.push({name: 'Dashboard'})
}
const logoutSUpplier=async()=>{
await supplierStore.supplierLogout();
alert('you are successfully  logout');

router.push({name: 'SupplierLogin'})

}

</script>
