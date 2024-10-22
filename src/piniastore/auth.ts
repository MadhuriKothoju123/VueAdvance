// src/stores/auth.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth, db} from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  isSignInWithEmailLink, 
  sendEmailVerification, 
  sendSignInLinkToEmail, 
  signInWithEmailAndPassword, 
  signInWithEmailLink, 
  signOut, 
  User, 
  UserCredential 
} from 'firebase/auth';
import { addDoc, collection, doc, DocumentData, getDocs, query, setDoc, Timestamp, where } from 'firebase/firestore';

// Define the type for the user data used in signup and login
interface UserData {
uid:  string;
  email: string;
  name?: string;
  role?: string;
  createdAt?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserData | null>(null);

  // const signup = async (userData: UserData): Promise<boolean> => {
  //   try {
  //     const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
  //     const user:User = userCredential.user;
  //     console.log(user);
  //     console.log(auth.currentUser?.uid);

  //     await sendEmailVerification(user);

  //     // Store user data in Firestore
  //     await setDoc(doc(db, 'usersDetails', user.uid), {
  //       name: userData.username,
  //       email: userData.email,
  //       phoneNumber: userData.mobileNumber,
  //       country: userData.country,
  //       userId: user.uid,
  //       fcmToken: '',
  //     });

  //     return true;
  //   } catch (error) {
  //     console.error("Signup error:", error);
  //     throw error;
  //   } 
  // };

  const login = async (userDetails: User): Promise<boolean> => {
    console.log("Login")
    try {
      if (userDetails.email) {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', userDetails.email));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {

          console.log('Email already exists in Firestore.');
          console.log(querySnapshot.docs[0].data()) 
          const docData: DocumentData = querySnapshot.docs[0].data();
          user.value = {
            uid:docData.uid,
            email: docData.email,
            name: docData.name,
            role: docData.role,
            createdAt: docData.createdAt
          } as UserData; 
        } else {
        
          const userRef = doc(db, 'users', userDetails.uid);
          await setDoc(userRef, {
            uid: userDetails.uid,
            name: userDetails.displayName,
            email: userDetails.email,
            role: 'customer',
            createdAt: Timestamp.now()
          });
        }
    }
    return true;
   } catch (error: any) {
      console.error("Login error:", error.message);
      throw error;
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      await signOut(auth);
      user.value = null;
      return true;
    } catch (error: any) {
      console.error("Logout error:", error.message);
      throw error;
    }
  };

  const sendSignInLink = async (email: string): Promise<void> => {
    console.log(email, "signInWithEmailLink")
    const actionCodeSettings = {
      url: 'http://localhost:5173/finishSignIn/',
      handleCodeInApp: true,
    };
    try {
      console.log(auth, "uth")
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      
    } catch (error) {
      console.error("Error sending email sign-in link:", error);
      throw error;
    }
  };

  const completeSignIn = async (url: string): Promise<void> => {
    try {
      if (isSignInWithEmailLink(auth, url)) {
        const email = window.localStorage.getItem('emailForSignIn');
        if (!email) throw new Error("No email found for sign-in");
        const result = await signInWithEmailLink(auth, email, url);
        console.log(result, "result")
        window.localStorage.removeItem('emailForSignIn');
        // user.value = result.user;
      }
    } catch (error) {
      console.error("Error completing sign-in:", error);
      throw error;
    }
  };

  return {
    user,
    // signup,
    login,
    logout,
    completeSignIn,
    sendSignInLink
  };
},
{
  persist: true
});
