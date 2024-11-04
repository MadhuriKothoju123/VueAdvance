// src/stores/useCategoryStore.ts
import { Category } from "../types/category";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref, Ref } from "vue";



export const useCategoryStore = defineStore("categoryStore", () => {
  const categories: Ref<Category[]> = ref([]);
  const parentCategories: Ref<Category[]> = ref([]);

  const fetchCategories = async () => {

    try {
      const categoryCollection =collection(db, "categories");
      const snapshot = await getDocs(categoryCollection);
      const categoryData: Category[] = snapshot.docs.map((doc) => ({
        ...(doc.data() as Omit<Category, "id" >),
      }));

      categories.value = categoryData;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchParentCategories = async () => {
    try {
      const q = collection(db, "ParentCategories");
      const snapshot = await getDocs(q);
      const parentData: Category[] = snapshot.docs.map((doc) => ({
        ...(doc.data() as Omit<Category, "categoryId" | "parentId">),
      }));
      parentCategories.value = parentData;
    } catch (error) {
      console.error("Error fetching parent categories:", error);
    }
  };

  return {
    categories,
    parentCategories,
    fetchCategories,
    fetchParentCategories,
  };
}, {
  persist: true
});
