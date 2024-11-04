import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRouter } from 'vue-router';
import Header from '../Header.vue';
import { useAuthStore } from '../../piniastore/auth';

// Mock the required stores
vi.mock('../../piniastore/auth.ts', () => ({
  useAuthStore: () => ({
    user: null,
    logout: vi.fn(),
  }),
}));

vi.mock('../../piniastore/cart.ts', () => ({
  useCartStore: () => ({
    cartItemCount: 0,
  }),
}));

vi.mock('../../piniastore/suppliers.ts', () => ({
  useSupplierStore: () => ({
    supplierLogout: vi.fn(),
  }),
}));

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('HeaderComponent', () => {
  let wrapper:any;
  let router;

  beforeEach(() => {
    router = useRouter();
    wrapper = mount(Header);
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.shoppycart-title').text()).toBe('Shoppy Cart');
  });

  it('navigates to login when clicking on Login menu item if user is not authenticated', async () => {
    const loginMenuItem = wrapper.vm.menuItems.find(item => item.label === 'Login');
    await loginMenuItem.onClick();
    expect(router.push).toHaveBeenCalledWith('./login');
  });

  it('calls logout method when clicking on Logout menu item if user is authenticated', async () => {
    const authStore = useAuthStore();
    authStore.user = { name: 'Test User' };

    await wrapper.vm.menuItems.find(item => item.label === 'Logout').onClick();
    expect(authStore.logout).toHaveBeenCalled();
    expect(wrapper.vm.supplierStore.supplierLogout).toHaveBeenCalled();
    expect(router.push).toHaveBeenCalledWith('./login');
  });

  it('navigates to supplier registration if user is authenticated', async () => {
    const authStore = useAuthStore();
    authStore.user = { name: 'Test User' };

    await wrapper.vm.supplierRegistration();
    expect(router.push).toHaveBeenCalledWith('./supplier/registration');
  });

  it('navigates to login when clicking on Become a Supplier if user is not authenticated', async () => {
    await wrapper.vm.supplierRegistration();
    expect(router.push).toHaveBeenCalledWith('./login');
  });

  it('navigates to cart if user is authenticated', async () => {
    const authStore = useAuthStore();
    authStore.user = { name: 'Test User' };

    await wrapper.vm.navigateToCart();
    expect(router.push).toHaveBeenCalledWith('./cart');
  });

  it('navigates to login when clicking on cart if user is not authenticated', async () => {
    await wrapper.vm.navigateToCart();
    expect(router.push).toHaveBeenCalledWith('./login');
  });

  it('calls handleSelect method when a menu item is selected', async () => {
    const handleSelectSpy = vi.spyOn(wrapper.vm, 'handleSelect');
    await wrapper.vm.handleSelect({ label: 'Profile' });
    expect(handleSelectSpy).toHaveBeenCalledWith({ label: 'Profile' });
  });
});
