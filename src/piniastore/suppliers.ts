import { db } from "../firebase";
import { ISupplier } from "../types/supplier";
import { addDoc, collection, getDocs, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { defineStore } from "pinia";
import bcrypt from 'bcryptjs';
import { ref } from "vue";

export const useSupplierStore = defineStore('supplier', () => {
  const suppliers = ref<ISupplier | {}>({});

  const addSupplier = async (supplierData: Omit<ISupplier, 'createdAt' | 'updatedAt'>) => {
    const hashedPassword = await bcrypt.hash(supplierData.password, 10);
    const timestamp = Timestamp.now();
    const supplierWithTimestamps: ISupplier = {
      ...supplierData,
      createdAt: timestamp,
      updatedAt: timestamp,
      password: hashedPassword
    };

    try {
      const suppliersRef = collection(db, "suppliers");
      const docRef = await addDoc(suppliersRef, supplierWithTimestamps);
      const supplierId = docRef.id;
      await updateDoc(docRef, { supplierId });

    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  };

  const loginSupplier = async (email: string, password: string):  Promise<object> => {

    try {
      const suppliersCollectionRef = collection(db, 'suppliers');
      const q = query(suppliersCollectionRef, where('contact.email', '==', email));
  
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        throw new Error('Supplier not found');
      }
  
      let supplierData: any = null;
      querySnapshot.forEach((doc: { data: () => any; }) => {
        supplierData = doc.data(); 
      });
  
      if (supplierData) {
        const isPasswordValid = await bcrypt.compare(password, supplierData.password);
  
        if (isPasswordValid) {
          console.log('Login successful for:', email);
          console.log(supplierData,"supplierData");
          suppliers.value = { ...supplierData };

          return { success: true, message: 'Login successful', supplierData };
        } else {
          return { success: true, message: 'Invalid password' };

        }
      }
      else{
        return { success: false, message: 'Supplier not found' };
      }

    } catch (error: any) {
      console.error('Error logging in supplier:', error);
      return { success: false, message: error.message };
    }
  };

const supplierLogout=()=>{
  suppliers.value={};
}

  return { suppliers, addSupplier, loginSupplier,supplierLogout };
},{
  persist: true
});
