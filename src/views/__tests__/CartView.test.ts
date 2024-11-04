import { mount, shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CartView from '../CartView.vue';
import { createTestingPinia } from '@pinia/testing';
import { useCartStore } from '../../piniastore/cart';

vi.mock('../../piniastore/products');
vi.mock('../../piniastore/categories');
describe('AddProductsView.vue', () => {
  let wrapper: any;
  let cartStore: any;
  vi.mock('../../piniastore/categories');
vi.mock('firebase/messaging', () => ({
    getMessaging: () => ({
      addEventListener: () => {},
    }),
  }));

  beforeEach(() => {
    wrapper = shallowMount(CartView, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });
    cartStore = useCartStore();
    cartStore.cart = [
      {
        id: '1',
        name: 'Product 1',
        image: 'image-url-1.jpg',
        price: 500,
        discount: 10,
        finalPrice: 450,
        quantity: 2,
        selectedSize: 'M',
        vendor: 'Vendor 1',
      },
      {
        id: '2',
        name: 'Product 2',
        image: 'image-url-2.jpg',
        price: 300,
        discount: 0,
        finalPrice: 300,
        quantity: 1,
        selectedSize: 'L',
        vendor: 'Vendor 2',
      },
    ];
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('displays the correct number of items in the cart', () => {
    const productCards = wrapper.findAll('.product-card');
    expect(productCards.length).toBe(cartStore.cart.length);
  });

  it('shows a discount badge if an item has a discount', () => {
    const productWithDiscount = wrapper.findAll('.discount').filter((node) => node.exists());
    expect(productWithDiscount.length).toBeGreaterThan(0);
  });

})