<script setup lang="ts">
import { useAuthStore } from "../piniastore/auth";
import { useRouter } from "vue-router";
import { BaseButton } from "@madhurikothoju123/cg_ui_project";
import { BaseIcon } from "@madhurikothoju123/cg_ui_project";
import { BaseMenu } from "@madhurikothoju123/cg_ui_project";
import { useCartStore } from "../piniastore/cart";
import { useSupplierStore } from "../piniastore/suppliers";

const AuthStore = useAuthStore();
const route = useRouter();
const cartStore = useCartStore();
const supplierStore= useSupplierStore();
const navigateUser = () => {
  route.push("./login");
};
const logout = async () => {
  console.log("ueser");
  await AuthStore.logout();
  await supplierStore.supplierLogout()

  route.push("./login");
};
const menuItems = [
  { label: "Profile", value: "profile", icon: "mdi mdi-account" },
  AuthStore.user
    ? {
        label: "Logout",
        value: "logout",
        icon: "mdi mdi-logout",
        onClick: () => logout(),
      }
    : {
        label: "Login",
        value: "login",
        icon: "mdi mdi-login",
        onClick: () => navigateUser(),
      },
];
const handleSelect = (item: any) => {
  console.log(item, "item");
  try {
    item.onClick();
  } catch (error) {
    console.log("errror", error);
  }
};

const supplierRegistration = () => {
  if (AuthStore.user) route.push("./supplier/registration");
  else route.push("./login");
};
const navigateToCart = () => {
  if (AuthStore.user) {
    route.push("./cart");
  } else {
    route.push("./login");
  }
};
</script>

<template>
  <div class="header">
    <div>
      <div class="shoppycart-title">Shoppy Cart</div>
    </div>
    <div>
      <BaseMenu :items="menuItems" @handleEvent="handleSelect">
        <template #icon>
          <BaseButton icon>
            <BaseIcon icon="mdi mdi-account" color="#bd3dc7" size="20px" />
          </BaseButton>
        </template>
      </BaseMenu>

      <BaseButton
        icon
        @click="navigateToCart()"
        color="#308ecd"
        outline
        style="margin: 5px"
      >
        <BaseIcon icon="mdi mdi-cart" color="#308ecd" size="20px" />
        <span v-if="cartStore.cartItemCount" class="cart-badge">{{
          cartStore.cartItemCount
        }}</span>
      </BaseButton>
      <BaseButton color="#308ecd" @click="supplierRegistration">
        Become a Supplier
      </BaseButton>
    </div>
  </div>
</template>
<style scoped>
.header {
  display: flex;
}
.shoppycart-title {
  font-family: "Poppins", sans-serif;
  font-size: 2.5rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  margin-left: 5px;
  background: var(
    --Gradient,
    linear-gradient(90deg, #0c73d4 1.04%, #e334f3 100%)
  );
  -webkit-background-clip: text;
  color: transparent;
}
.header {
  height: 8vh;
  background-color: #e5f0f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #dfdada;
  padding: 0px 10px 0px 10px;
}
.cart-badge {
  position: absolute;
  top: -5px; 
  right: -5px; /* Adjust to align the badge */
  background-color: #0c73d4;
  color: white;
  font-size: 10px;
  font-weight: bold;
  border-radius: 50%;
  padding: 2px 2px;
  min-width: 16px; /* Ensures badge remains circular with single digits */
  text-align: center;
  display: inline-block;
  line-height: 1;
}
</style>
