<template>
  <div class="container">
    <CgDialog
      :isOpen="isOpen"
      @close="isOpen = false"
      :fullWidth="true"
      :maxWidth="'sm'"
      :closeIcon="true"
    >
      <template #title>
        <div style="display: flex; justify-content: center; width: 100%">
          <h3>Sign Up with Email</h3>
        </div>
      </template>

      <form @submit.prevent="signUpWithEmail">
        <div class="input-group">
          <input
            v-model="email"
            class="text-input"
            type="text"
            id="username"
            placeholder="Enter email"
            required
          />
        </div>
        <div style="display: flex; justify-content: end">
          <CgButton @click="signUpWithEmail" color="#308ecd">Verify</CgButton>
        </div>
      </form>
    </CgDialog>

    <CgCard
      :elevation="4"
      rounded="lg"
      :width="400"
      :height="300"
      :minHeight="200"
    >
      <!-- Title Slot -->
      <template #title> Sign Up </template>

      <!-- Subtitle Slot -->
      <template #subtitle>
        Access your account for a seamless shopping experience.
      </template>

      <button class="google-btn" @click="googleSignIn()">
        <img
          src="../assets/images/icons8-google.svg"
          alt="Google logo"
          class="google-icon"
        />
        Sign in with Google
      </button>

      <button class="google-btn" @click="isOpen = true">
        <img
          src="../assets/images/icons8-email-24.png"
          alt="email logo"
          class="google-icon"
        />
        Sign in with Email
      </button>
    </CgCard>
  </div>
  <!-- <CgAlert
    :message="alertMessage"
    :type="alertType"
    @close="alertVisible = false"
  /> -->
</template>
<script setup lang="ts">
import { ref } from "vue";
import { auth, provider } from "../firebase";
import { useAuthStore } from "../piniastore/auth";
import { useRouter } from "vue-router";
import { signInWithPopup } from "firebase/auth";
import { CgCard } from "../common_ui_components";
import { CgDialog } from "../common_ui_components";
import { CgButton } from "../common_ui_components";
import { CgAlert } from "../common_ui_components";

import { useCartStore } from "../piniastore/cart";

const authStore = useAuthStore();
const router = useRouter();
const isOpen = ref(false);
const email = ref("");
const cartStore = useCartStore();
const alertVisible = ref(false);
const alertMessage = ref("");
const alertType = ref("info");

const googleSignIn = async () => {
  await signInWithGoogle();
};

const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const res = await authStore.login(user);
  if (res.success) {
// import { BaseAlert } from "@madhurikothoju123/cg_ui_project";
    console.log(res, "res")
    cartStore.setUserId(user?.uid);
    router.push("/dashboard");

    alert(res.message);
  } else {

    alertMessage.value = res?.message;
    showAlert(res.message, "error");
    router.push("/login");
  }
};
const showAlert = (message: string, type: string) => {
  alertMessage.value = message;
  alertType.value = type;
  alertVisible.value = true;
};

const signUpWithEmail = async () => {
  try {
    await authStore.sendSignInLink(email.value);
  } catch (error) {
    console.log(error);
  }
};
//     const getNameFromEmail=(email: string)=> {
//   const namePart = email.split('@')[0];

//   const formattedName = namePart.replace(/[._-]/g, ' ');

//   const name = formattedName
//     .split(' ')
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');

//   return name;
// }
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-size: 100% 100%;
  background-image: url("/src/assets/images/loginimage.png");
  background-position: center; /* Center the image */
  background-repeat: no-repeat;

  /* Full viewport height to vertically center */
}

/* Style for the login card */
.loginCard {
  background-color: #fafbfb;
  width: 30%;
  height: 500px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: solid 1px lightskyblue;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1),
    /* Subtle main shadow */ 0px 6px 20px rgba(0, 0, 0, 0.2); /* Deeper secondary shadow for a stronger elevation */

  transition: box-shadow 0.3s ease; /* Smooth shadow transition */
  padding: 20px;
}
.loginCard:hover {
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2), 0px 10px 30px rgba(0, 0, 0, 0.3); /* Stronger shadow on hover */
}

.input-group {
  margin-bottom: 20px;
  padding: 20px;
}

.text-input {
  padding: 15px 3px 15px 3px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  border-left: 0px;
  border-right: 0px;
  border-top: 0px;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.google-btn {
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  text-align: center;
  align-content: center;
  width: 386px;
  padding: 10px 20px;
  border: 1px solid black;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

.google-btn:hover {
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  background-color: rgb(192, 222, 247);
}

.google-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px; /* Spacing between the icon and the text */
}

/* Optional: style for a disabled state */
.google-btn:disabled {
  background-color: #f5f6f8;
  cursor: not-allowed;
  opacity: 0.6;
}

.dialog-overlay {
  display: block;
  position: fixed;
  width: 40%;
  height: 30%;
  z-index: 100000000;
  box-shadow: 8px 8px 8px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  background-color: #f8f8f9;
  border-radius: 20px;
}
</style>
