import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import './global.css'
import './style.css'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import '@mdi/font/css/materialdesignicons.css'
import { useCartStore } from './piniastore/cart';
import { QuillEditor } from '@vueup/vue-quill'
// import '@vueup/vue-quill/dist/vue-quill.snow.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
const pinia = createPinia();
const app = createApp(App);
pinia.use(piniaPluginPersistedstate);

// Install the plugin
// app.use(ComponentsPlugin);
app.use(router)
app.use(pinia)
app.mount('#app');
app.component('QuillEditor', QuillEditor) 
const cartStore = useCartStore();
// const savedCart = localStorage.getItem('cart');
app.provide(/* key */ 'message', /* value */ 'hello!')
// if (savedCart) {
//   cartStore.$patch(JSON.parse(savedCart));  
// }

// cartStore.$subscribe((mutation, state) => {
//   console.log(`Mutation Type: ${mutation.type}`);  
//   localStorage.setItem('cart', JSON.stringify(state));  
// });
