import { defineStore } from 'pinia';
import { collection, addDoc, doc, setDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { ref } from 'vue';
import { Product } from '../types/product';



// Define the store
export const useProductStore = defineStore('productStore', () => {
  const products = ref<Product[]>(
 
  []);


  const addProduct = async (productData: Omit<Product, 'id'>): Promise<object>  => {
    try {
      const productRef = collection(db, 'products');
      const docRef = await addDoc(productRef, productData);
      await setDoc(docRef, { id: docRef.id }, { merge: true });
      console.log('Product added to Firestore with ID:', docRef.id);
      return { success: true, message: 'Product added successfully' };
    } catch (error:any) {
      console.error('Error adding product to Firestore:', error);
      return { success: false, message: error.message };
    }
  };

  const getProducts = async () => {
    try {
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() } as Product;
      });
      products.value = productsList;
      console.log('Products fetched from Firestore:', productsList);
    } catch (error) {
      console.error('Error fetching products from Firestore:', error);
    }
  };
  

  return {
    products,
    addProduct,
    getProducts,
  };
},{persist: true});
