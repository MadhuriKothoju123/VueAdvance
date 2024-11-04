// src/stores/auth.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth, db} from '../firebase';
import { 
  isSignInWithEmailLink, 
  sendSignInLinkToEmail, 
  signInWithEmailLink, 
  signOut, 
  User, 
} from 'firebase/auth';
import {  collection, doc, DocumentData, getDocs, query, setDoc, Timestamp, where } from 'firebase/firestore';
import { UserData } from '../types/userData';


export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserData | null>(null);


  const login = async (userDetails: User): Promise<object> => {
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
          
          const userData = {
            uid:userDetails.uid,
            email: userDetails.email,
            name: userDetails.displayName,
            role: 'customer',
            createdAt: Timestamp.now(),
          }

          await setDoc(userRef,{...userData}
           
          );
        }

    }
    return { success: true, message: "User successfully logined" };
   } catch (error: any) {
      console.error("Login error:", error.message);
      return { success: false, message: error.message };
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
