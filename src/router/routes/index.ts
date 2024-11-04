// router/index.ts
import FinishSignInView from "../../views/FinishSignInView.vue";
import DashboardView from "../../views/DashboardView.vue";
import { RouteRecordRaw } from "vue-router";
import SupplierSignupView from "../../views/SupplierSignupView.vue";
import CounterView from "../../views/CounterView.vue";
import ProductView from "../../views/ProductView.vue";
import UserView from "../../views/UserView.vue";
import CartView from "../../views/CartView.vue";
import ReactivityView from "../../views/ReactivityView.vue";
import WatchEffectView from "../../views/WatchEffectView.vue";
import AddProductsView from "../../views/AddProductsView.vue";
import SupplierView from "../../views/supplierView.vue";
import SupplierLogin from "../../views/SupplierLogin.vue";

export const routes: Array<RouteRecordRaw> = [
    {
      path: '/login',
      name: 'login',
      // redirect: '/dashboard',
      component: () => import('../../views/LoginView.vue'), // Lazy loading
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('../../views/Home.vue'),
      children: [
        {
          path: 'dashboard', // Use a relative path for child route
          name: 'Dashboard',
          component: DashboardView,
         
        },
        {
          path: 'productview', 
          name: 'ProductView',
          component:  ProductView,
          meta: { requiresAuth: true },
          props: true

        },
        { path: 'cart', component: CartView ,
          meta: { requiresAuth: true },
        },

      ],
    },

    {
      path: '/supplier',
      name: 'Supplier',
      component: SupplierView,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'supplierLogin', // Use a relative path for child route
          name: 'SupplierLogin',
          component: SupplierLogin
        },
        {
          path: 'registration', // Use a relative path for child route
          name: 'Registration',
          component: SupplierSignupView
        },
        {
          path: 'addproduct', // Use a relative path for child route
          name: 'AddProduct',
          component: AddProductsView
        },
      ],
    },
    { path: '/finishSignIn', component: FinishSignInView ,
 
    },
 
    { path: '/counter', component: CounterView ,
    },
    { path: '/product', component: ProductView ,
    },
    { path: '/user', component: UserView ,
    },
    { path: '/compositionApi', component: ReactivityView ,
    },
    { path: '/watchEffect', component: WatchEffectView ,
    },
  ];
