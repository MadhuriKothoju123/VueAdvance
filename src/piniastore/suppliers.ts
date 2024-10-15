import { db } from "../firebase";
import { ISupplier } from "../types/supplier";
import { addDoc, collection, Timestamp, updateDoc } from "firebase/firestore";
import { defineStore } from "pinia";

export const useSupplierStore = defineStore('supplier',({
    state: () => ({
      suppliers: {} as ISupplier | {},
    }),

    actions: {
        async addSupplier(supplierData: Omit<ISupplier, 'createdAt' | 'updatedAt'>) {
          const timestamp = Timestamp.now();
          const supplierWithTimestamps: ISupplier = {
            ...supplierData,
            createdAt: timestamp,
            updatedAt: timestamp,
          };
    
          try {
            const suppliersRef= collection(db, "suppliers");
            // const docRef = await addDoc(collection(db, 'suppliers'), supplierWithTimestamps);
            console.log(suppliersRef,"docRef")
            const docRef = await addDoc(suppliersRef, supplierWithTimestamps);
            console.log(docRef,"docRef2")
            const supplierId = docRef.id;
            await updateDoc(docRef, { supplierId });

            console.log(docRef, "data")
            this.suppliers=({ ...supplierWithTimestamps, supplierId: supplierId });
          } catch (error) {
            console.error('Error adding supplier:', error);
          }
        },
      },

}));