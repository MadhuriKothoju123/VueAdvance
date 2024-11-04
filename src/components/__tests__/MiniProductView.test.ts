import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { useRouter } from 'vue-router';
import MiniProductView from '../MiniProductView.vue';

// Mocking useRouter
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe('ProductCard.vue', () => {
  const router = useRouter();

  const product = {
    id: '1',
    name: 'Sample Product',
    price: 1000,
    discount: 20,
    images: ['https://via.placeholder.com/150'],
    sizes: ['S', 'M', 'L'],
    delivery: 'yes',
  };

  it('renders product details correctly', () => {
    const wrapper = mount(MiniProductView, {
      props: { product },
    });

    expect(wrapper.find('.product-title').text()).toBe(product.name);
    expect(wrapper.find('.size').text()).toBe(`sizes available : ${product.sizes.join(', ')}`);
    expect(wrapper.find('.price').text()).toBe(`₹${Math.floor(product.price - (product.price * (product.discount / 100)))}`);
    expect(wrapper.find('.original-price').text()).toBe(`₹${product.price}`);
    expect(wrapper.find('.discount').text()).toBe(`${product.discount}% off`);
    expect(wrapper.find('.free-delivery').exists()).toBe(true);
  });

  it('does not show discount price if discount is 0', () => {
    const noDiscountProduct = { ...product, discount: 0 };
    const wrapper = mount(MiniProductView, {
      props: { product: noDiscountProduct },
    });

    expect(wrapper.find('.discount').exists()).toBe(false);
    expect(wrapper.find('.original-price').exists()).toBe(false);
  });

  it('renders "Free Delivery" text if delivery is yes', () => {
    const wrapper = mount(MiniProductView, {
      props: { product },
    });

    expect(wrapper.find('.free-delivery').exists()).toBe(true);
  });

  it('does not render "Free Delivery" text if delivery is not "yes"', () => {
    const noDeliveryProduct = { ...product, delivery: 'no' };
    const wrapper = mount(MiniProductView, {
      props: { product: noDeliveryProduct },
    });

    expect(wrapper.find('.free-delivery').exists()).toBe(false);
  });

  it('renders product image correctly', () => {
    const wrapper = mount(MiniProductView, {
      props: { product },
    });

    const img = wrapper.find('.product-image');
    expect(img.attributes('src')).toBe(product.images[0]);
    expect(img.attributes('alt')).toBe('Product Image');
  });

  it('computes actualPrice correctly based on discount', () => {
    const wrapper = mount(MiniProductView, {
      props: { product },
    });

    const expectedPrice = Math.floor(product.price - (product.price * (product.discount / 100)));
    expect(wrapper.vm.actualPrice).toBe(expectedPrice);
    expect(wrapper.find('.price').text()).toBe(`₹${expectedPrice}`);
  });
});
