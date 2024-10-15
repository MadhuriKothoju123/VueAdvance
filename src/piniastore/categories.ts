// src/stores/categoryStore.ts
import { defineStore } from 'pinia';
import { collection, getDocs, Timestamp } from 'firebase/firestore';  // Assuming Firebase is already set up
import { db } from '../firebase';

// Define the Category type
interface Category {
  categoryId?: string;
  name: string;
  description?: string;
  createdAt?: Timestamp;
}

// Define the Pinia store using the Options API
export const useCategoryStore = defineStore({
  id: 'categoryStore',

  // State: Define the initial state for the store
  state: () => ({
    categories: [] as Category[],  // List of categories
    selectedCategory: null as Category | null,  // For holding a selected category
  }),

  // Getters: Define computed-like properties for accessing state
  getters: {
    getCategoryById: (state) => (id: string) => {
      return state.categories.find(category => category.categoryId === id);
    },

    categoryCount: (state) => {
      return state.categories.length;
    },
    getCategories:(state)=>{
        return state.categories;
    }
  },

  // Actions: Define functions to mutate the state or interact with external APIs
  actions: {
    addCategory(newCategory: Omit<Category, 'createdAt'>) {
      const timestamp = Timestamp.now();
      const categoryWithTimestamp: Category = {
        ...newCategory,
        createdAt: timestamp
      };

      this.categories.push(categoryWithTimestamp);
    },

    updateCategory(updatedCategory: Category) {
      const index = this.categories.findIndex(c => c.categoryId === updatedCategory.categoryId);
      if (index !== -1) {
        this.categories[index] = updatedCategory;
      }
    },

    removeCategory(categoryId: string) {
      this.categories = this.categories.filter(c => c.categoryId !== categoryId);
    },

    selectCategory(categoryId: string) {
      this.selectedCategory = this.categories.find(c => c.categoryId === categoryId) || null;
    },

    clearSelectedCategory() {
      this.selectedCategory = null;
    },
    async fetchCategoriesFromFirestore() {
        try {
          const categoriesRef = collection(db, 'categories');
          const querySnapshot = await getDocs(categoriesRef);
  
          this.categories = querySnapshot.docs.map(doc => ({
            categoryId: doc.id, 
            ...doc.data() as Category 
          }));
  
          console.log('Categories fetched:', this.categories);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      }
  },

});
