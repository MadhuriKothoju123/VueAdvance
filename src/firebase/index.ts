import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, getRedirectResult, signInWithRedirect } from "firebase/auth";
import {  getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
const firebaseConfig = {
    apiKey: "AIzaSyCC496FQotdTGSgwnHGVjMeJ4L8xs3WJA8",
    authDomain: "fir-vueadvance.firebaseapp.com",
    projectId: "fir-vueadvance",
    storageBucket: "fir-vueadvance.appspot.com",
    messagingSenderId: "193284531643",
    appId: "1:193284531643:web:2ccd4e5aacb2800fe9909e"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const storage = getStorage(app);
 
const provider = new GoogleAuthProvider();

const db = getFirestore(app);



// if (window.location.hostname === 'localhost') {
//   // connectAuthEmulator(auth, "http://localhost:9099");
//   connectFirestoreEmulator(db, 'localhost', 8080);
//   connectFunctionsEmulator(functions, "localhost", 5001);
//   // connectMessagingEmulator('localhost', 8085); 
// }
const signInWithGoogle = async () => {
  try {
    console.log(auth, "auth")
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google: ", error);
  }
};

const getGoogleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    console.log(result, "result")
    if (result) {
      console.log(result.user);
      return result.user;
    }
  } catch (error) {
    console.error("Error getting redirect result: ", error);
  }
};


// auth.languageCode = 'en';  // You can also use `auth.useDeviceLanguage();`
// auth.settings.appVerificationDisabledForTesting = true; // Only for testing


export { auth, db, storage, signInWithGoogle, getGoogleRedirectResult, provider }
