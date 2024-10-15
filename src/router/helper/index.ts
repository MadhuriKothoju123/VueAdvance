// import firebase from 'firebase/app';
// import 'firebase/auth';
// import { NavigationGuardNext } from 'vue-router';

// export const onBeforeRoute = ( next: NavigationGuardNext) => {
// //   const currentUser = firebase.auth().currentUser;
// //   const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
// //   const guestUser = to.matched.some((record) => record.meta.guestUser);
// //   const agencyVerification = localStorage.getItem('agency_verification');

// //   if (requiresAuth && !currentUser) {
// //     next('/guest');
// //   } else if (requiresAuth && currentUser && !currentUser.emailVerified) {
// //     next('/verify');
// //   } else if (requiresAuth && currentUser && agencyVerification === 'pending') {
// //     next('/agent-verify');
// //   } else if (requiresAuth && currentUser) {
// //     next();
// //   } else if (
// //     !requiresAuth &&
// //     currentUser &&
// //     currentUser.emailVerified &&
// //     !guestUser
// //   ) {
// //     next('/dashboard'); // only when the user is there and he opened register
// //   } else {
// //     next();
// //   }
// next();
// };

// export const onRouteError = (error: { message: string; }) => {
//   if (/loading chunk \d* failed./i.test(error.message) && navigator.onLine) {
//     window.location.reload();
//   }
// };
