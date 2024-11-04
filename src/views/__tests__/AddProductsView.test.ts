import { mount, shallowMount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useProductStore } from '../../piniastore/products';
import { useCategoryStore } from '../../piniastore/categories';
import AddProductsView from '../AddProductsView.vue';

vi.mock('../../piniastore/products');
vi.mock('../../piniastore/categories');
vi.mock('vue-router', () => ({
    useRoute: () =>vi.fn()
  }));
vi.mock('firebase/messaging', () => ({
    getMessaging: () => ({
      addEventListener: () => {},
    }),
  }));
describe('ProductForm.vue', () => {
  let wrapper:any ;

  beforeEach(() => {
    wrapper = mount(AddProductsView, {
       
      global: {
        provide: {
          productStore: useProductStore(),
          categoryStore: useCategoryStore(),
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });


  it('allows input into the product title', async () => {
    const titleInput = wrapper.find('#title');
    await titleInput.setValue('Test Product');
    expect(wrapper.vm.product.name).toBe('Test Product');
  });



  it('handles sizes input correctly', async () => {
    const sizesInput = wrapper.find('input[placeholder="Enter sizes (e.g., S, M, L, XL)"]');
    await sizesInput.setValue('S, M, L');
    await sizesInput.trigger('input');
    expect(wrapper.vm.product.sizes).toEqual(['S', 'M', 'L']);
  });

});
