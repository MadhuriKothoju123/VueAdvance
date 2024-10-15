<template>
    <div>
      <div >
          <div style="border: 1px solid lightgray; padding: 0px 10px 0px 10px; display: flex; justify-content: space-between;">
            <h2 style="    background: var(--Gradient, linear-gradient(90deg, #0c73d4 1.04%, #e334f3 100%));
     -webkit-background-clip: text;
      color: transparent;">Shopy Cart</h2>
            <div style="display: flex; column-gap: 10px;  align-items: center;">
  
              <b>already have an account</b>
              <CgButton color="#bd3dc7" outline  >Login</CgButton>
            </div>
          </div>
      </div>
       <div>
  <StartSelling  />
       </div>
    </div>
  </template>
  <script setup lang="ts">
  import StartSelling from '../components/StartSelling.vue';
import { CgButton } from '../common_ui_components';
//   import SupplierRegistration from '../views/SupplierRegistration.vue';
  
  
  </script>