import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import ProductView from '../ProductView.vue';
import { useProductStore } from '../../piniastore/products';
import { setActivePinia } from 'pinia';
import { createPinia } from 'pinia';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../../piniastore/auth';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
}));

describe('ProductView.vue', () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  it('fetches the selected product based on route query', async () => {
    const mockRoute = {
      query: {
        productQueryParam: '1', 
      },
    };
    (useRoute as vi.mock).mockReturnValue(mockRoute); 
    const productStore = useProductStore();
    productStore.$patch({
      products: [
        {
          id: '1',
          name: 'Test Product',
          price: 100,
          brand: 'Test Brand',
          delivery: 'yes',
          description: '<p>Test Description</p>',
          discount: 20,
          images: ['image1.jpg', 'image2.jpg'],
          sizes: ['S', 'M', 'L'],
          vendor: 'Test Vendor',
        },
        {
          id: '2',
          name: 'Another Product',
          price: 200,
          brand: 'Another Brand',
          delivery: 'no',
          description: '<p>Another Description</p>',
          discount: 10,
          images: ['image3.jpg', 'image4.jpg'],
          sizes: ['L', 'XL'],
          vendor: 'Another Vendor',
        },
      ],
    });

    const authStore = useAuthStore();
    authStore.$patch({
      user: {
        uid: 'user123',
        name: 'Janu',
        email: 'janu@example.com',
      },
      isAuthenticated: true,
    });

    const wrapper = mount(ProductView);

    await wrapper.vm.$nextTick(); // Wait for the component to process the route change

    const selectedProduct = productStore.products.find(
      (product: any) => product.id === mockRoute.query.productQueryParam
    );
    expect(wrapper.vm.selectedProduct).toEqual(selectedProduct);
    expect(wrapper.element).toMatchSnapshot();
  });
});
