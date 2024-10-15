// router/index.ts
import FinishSignInView from "../../views/FinishSignInView.vue";
import DashboardView from "../../views/DashboardView.vue";
import { RouteRecordRaw } from "vue-router";
import SupplierSignupView from "../../views/SupplierSignupView.vue";
import CounterView from "../../views/CounterView.vue";
import ProductView from "../../views/ProductView.vue";
import UserView from "../../views/UserView.vue";
import CartView from "../../views/CartView.vue";

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
      component: () => import('../../views/Home.vue'), // Lazy loading
      // redirect: '/dashboard', // Redirect to absolute path '/dashboard'
      children: [
        {
          path: 'dashboard', // Use a relative path for child route
          name: 'Dashboard',
          component: DashboardView
        },
      ],
    },
    { path: '/finishSignIn', component: FinishSignInView ,
 
    },
    { path: '/sellerRegistration', component: SupplierSignupView ,
    },
    { path: '/counter', component: CounterView ,
    },
    { path: '/product', component: ProductView ,
    },
    { path: '/user', component: UserView ,
    },
    { path: '/cart', component: CartView ,
    }
  ];
