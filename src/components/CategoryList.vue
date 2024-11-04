<template>

  <div class="toolbar">
    <div class="toolbar-title">Categories</div>
    <div class="categories">
      <i
        v-for="category in parentCategories"
        :key="category.id"
        @click="toggleMenu(category.id)"
        class="category-item"
      >
        {{ category.name }}
        <!-- Dropdown Menu -->
        <div
          v-if="isOpen === category.id"
          class="dropdown-menu"
        >
          <div
            v-for="filteredCategory in filteredCategories"
            :key="filteredCategory.categoryId"
            class="menu-item"
            @click="selectCategory(filteredCategory?.categoryId)"

          >
            {{ filteredCategory.name }}
          </div>
        </div>
      </i>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useCategoryStore } from "../piniastore/categories";
import { onMounted, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { Category } from "../types/category";

const categoryStore = useCategoryStore();
const { parentCategories, categories } = storeToRefs(categoryStore);
const filteredCategories: Ref<Category[]> =  ref([]);
const isOpen = ref<number | null>(null);
  const router = useRouter();

const toggleMenu = async (categoryId: number) => {
  isOpen.value = isOpen.value === categoryId ? null : categoryId;
  const parentCategory = parentCategories.value.find(cat => cat.id === categoryId);
  if (parentCategory) await filterCategoryByParentId(parentCategory);
};

const filterCategoryByParentId = async (parentcategory: any) => {
  filteredCategories.value = categories.value.filter(
    (category: any) => category.parentId === parentcategory.id
  );
};
const selectCategory = (categoryId: string) => {
  router.push({ name: 'Dashboard', query: { categoryId } });
};

onMounted(async () => {
  await categoryStore.fetchParentCategories();
  await categoryStore.fetchCategories();
});
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 10px 20px;
  color: white;
}

.toolbar-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.categories {
  display: flex;
  gap: 10px;
}

.category-item {
  position: relative;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.category-item:hover {
  color: #e334f3;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #444;
  color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  margin-top: 5px;
  min-width: 150px;
  z-index: 1;
}

.menu-item {
  padding: 5px 10px;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #555;
}
</style>
