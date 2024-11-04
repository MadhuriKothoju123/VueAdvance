// CategoryToolbar.spec.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useCategoryStore } from '../../piniastore/categories'; // Adjust the path as necessary
import { ref } from 'vue';
import CategoryList from '../CategoryList.vue';

vi.mock('../../piniastore/categories', () => {
  return {
    useCategoryStore: vi.fn(() => ({
      parentCategories: ref([
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
      ]),
      categories: ref([
        { categoryId: '1-1', name: 'Subcategory 1-1', parentId: 1 },
        { categoryId: '1-2', name: 'Subcategory 1-2', parentId: 1 },
        { categoryId: '2-1', name: 'Subcategory 2-1', parentId: 2 },
      ]),
      fetchParentCategories: vi.fn(),
      fetchCategories: vi.fn(),
    })),
  };
});

describe('CategoryToolbar.vue', () => {
  let wrapper: any;

  beforeEach(async () => {
    setActivePinia(createPinia()); 
    wrapper = mount(CategoryList); 
    await wrapper.vm.$nextTick(); 
  });

  it('renders category titles', () => {
    const categoryTitles = wrapper.findAll('.category-item');
    expect(categoryTitles.length).toBe(2);
    expect(categoryTitles[0].text()).toContain('Category 1');
    expect(categoryTitles[1].text()).toContain('Category 2');
  });

  it('toggles dropdown menu on category click', async () => {
    const category1 = wrapper.find('.category-item:nth-child(1)');
    await category1.trigger('click'); 

    expect(wrapper.find('.dropdown-menu').exists()).toBe(true);

    await category1.trigger('click'); 

    expect(wrapper.find('.dropdown-menu').exists()).toBe(false);
  });

  it('displays filtered categories when a category is opened', async () => {
    const category1 = wrapper.find('.category-item:nth-child(1)');
    await category1.trigger('click'); 

    const menuItems = wrapper.findAll('.menu-item');
    expect(menuItems.length).toBe(2); 
    expect(menuItems[0].text()).toBe('Subcategory 1-1');
    expect(menuItems[1].text()).toBe('Subcategory 1-2');
  });
});
