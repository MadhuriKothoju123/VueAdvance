import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import './global.css'
import './style.css'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import '@mdi/font/css/materialdesignicons.css'
import { useCartStore } from './piniastore/cart';
// import {ComponentsPlugin} from 'vue-style-components';

const pinia = createPinia();
const app = createApp(App);
pinia.use(piniaPluginPersistedstate);

// Install the plugin
// app.use(ComponentsPlugin);
app.use(router)
app.use(pinia)
app.mount('#app');
const cartStore = useCartStore();
const savedCart = localStorage.getItem('cart');
if (savedCart) {
  cartStore.$patch(JSON.parse(savedCart));  
}

cartStore.$subscribe((mutation, state) => {
  console.log(`Mutation Type: ${mutation.type}`);  
  localStorage.setItem('cart', JSON.stringify(state));  
});
