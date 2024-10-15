<script setup lang="ts">
import { useAuthStore } from '../piniastore/auth';
import {  CgIcon  } from '../common_ui_components';
import { CgMenu } from '../common_ui_components';

import { CgButton } from '../common_ui_components';

const AuthStore= useAuthStore()

const menuItems = [
  { label: 'Profile', value: 'profile' , icon: 'mdi mdi-account' },
  AuthStore.user
      ? { label: 'Logout', value: 'logout', icon: 'mdi mdi-logout' }
      : { label: 'Login', value: 'login', icon: 'mdi mdi-login' },
];
</script>

<template>
    <div class="header">
        <div>
            <div class="shoppycart-title">Shoppy Cart</div>
        </div>
        <div>

            <CgMenu :items="menuItems">
      <template #icon>
        <cgButton icon >
            <CgIcon icon="mdi mdi-account" color="#bd3dc7" size="20px" customClass="my-custom-class" />

            </cgButton>
      </template>
    </CgMenu>
    <CgButton  color="#308ecd" outline style="margin: 5px;">
        <CgIcon  icon="mdi mdi-cart" color="#308ecd" size="20px" />
        cart
    </CgButton>
    <CgButton  color="#308ecd"  style="margin: 5px;">
        Become a  Supplier
    </CgButton>
        </div>
    </div>
</template>
<style scoped>
.header{
display: flex;


}
.shoppycart-title {
    font-family: 'Poppins', sans-serif; /* Custom font for modern look */
    font-size: 2.5rem; /* Adjust title size */
    font-weight: bold;
    /* color: #308ecd;  */
    text-transform: uppercase; /* Uppercase letters */
    letter-spacing: 1.5px; /* Space between letters */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
    margin-left: 5px;
    background: var(--Gradient, linear-gradient(90deg, #0c73d4 1.04%, #e334f3 100%));
     -webkit-background-clip: text;
      color: transparent;
  }
  .header{
  height: 8vh;
  background-color: #e5f0f9;
  display: flex;
  justify-content: space-between;
  /* justify-content:flex-end ; */
  align-items: center;
  border: 1px solid #dfdada;
  padding: 0px 10px 0px 10px;

}
/* .my-custom-class {
  margin-right: 10px;
} */
</style>