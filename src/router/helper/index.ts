import { useAuthStore } from "../../piniastore/auth";
import { auth } from "../../firebase";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useSupplierStore } from "../../piniastore/suppliers";
const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

export const onBeforeRoute = (
  to: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const currentUser = auth.currentUser;
  const AuthStore = useAuthStore();
  const supplierStore = useSupplierStore();
  console.log(to.name, !supplierStore?.suppliers);

  if (to.meta.requiresAuth && !AuthStore?.user) {
    next("./login");
  } else if (to.name === "AddProduct" && isEmptyObject(supplierStore.suppliers)) {
    console.log(to.name, !supplierStore?.suppliers);
    next("/supplier/supplierLogin");
  } else {
    next();
  }
};

export const onRouteError = (error: { message: string }) => {
  if (/loading chunk \d* failed./i.test(error.message) && navigator.onLine) {
    window.location.reload();
  }
};
