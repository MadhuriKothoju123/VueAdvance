import { mount } from '@vue/test-utils';
import { useAuthStore } from '../../piniastore/auth';
import { useCartStore } from '../../piniastore/cart';
import { useSupplierStore } from '../../piniastore/suppliers';
import { useRouter } from 'vue-router';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Header from '../Header.vue';

vi.mock('../../piniastore/auth.ts');
vi.mock('../../piniastore/cart');
vi.mock('../../piniastore/suppliers');
vi.mock('vue-router');

describe('HeaderComponent', () => {
  let authStore: any;
  let cartStore: any;
  let supplierStore: any;
  let router: any;

  beforeEach(() => {
    authStore = {
      user: null,
      logout: vi.fn()
    };
    cartStore = {
      cartItemCount: 3 
    };
    supplierStore = {
      supplierLogout: vi.fn()
    };
    router = {
      push: vi.fn()
    };

    (useAuthStore as any).mockReturnValue(authStore);
    (useCartStore as any).mockReturnValue(cartStore);
    (useSupplierStore as any).mockReturnValue(supplierStore);
    (useRouter as any).mockReturnValue(router);
  });

  it('navigates to login on `navigateUser` call', async () => {
    const wrapper = mount(Header);
    await wrapper.vm.navigateUser();
    expect(router.push).toHaveBeenCalledWith('./login');
  });

  it('calls logout methods and navigates to login on `logout` call', async () => {
    authStore.user = { name: 'Test User' }; 
    const wrapper = mount(Header);
    await wrapper.vm.logout();
    expect(authStore.logout).toHaveBeenCalled();
    expect(supplierStore.supplierLogout).toHaveBeenCalled();
    expect(router.push).toHaveBeenCalledWith('./login');
  });

  it('renders "Login" menu item when user is not authenticated', () => {
    authStore.user = null; // Ensure no user is logged in
    const wrapper = mount(Header);
    const menuItems = wrapper.vm.menuItems;
    expect(menuItems).toContainEqual(
      expect.objectContaining({ label: 'Login', value: 'login' })
    );
  });

  it('renders "Logout" menu item when user is authenticated', () => {
    authStore.user = { name: 'Test User' }; 
    const wrapper = mount(Header);
    const menuItems = wrapper.vm.menuItems;
    expect(menuItems).toContainEqual(
      expect.objectContaining({ label: 'Logout', value: 'logout' })
    );
  });

  it('calls the `onClick` function of the selected menu item in `handleSelect`', () => {
    const mockOnClick = vi.fn();
    const wrapper = mount(Header);
    const item = { onClick: mockOnClick };
    wrapper.vm.handleSelect(item);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('navigates to cart page if user is authenticated when calling `navigateToCart`', () => {
    authStore.user = { name: 'Test User' }; 
    const wrapper = mount(Header);
    wrapper.vm.navigateToCart();
    expect(router.push).toHaveBeenCalledWith('./cart');
  });

  it('navigates to login page if user is not authenticated when calling `navigateToCart`', () => {
    authStore.user = null;
    const wrapper = mount(Header);
    wrapper.vm.navigateToCart();
    expect(router.push).toHaveBeenCalledWith('./login');
  });

  it('navigates to supplier registration if user is authenticated on `supplierRegistration`', () => {
    authStore.user = { name: 'Test User' }; 
    const wrapper = mount(Header);
    wrapper.vm.supplierRegistration();
    expect(router.push).toHaveBeenCalledWith('./supplier/registration');
  });

  it('navigates to login page if user is not authenticated on `supplierRegistration`', () => {
    authStore.user = null; 
    const wrapper = mount(Header);
    wrapper.vm.supplierRegistration();
    expect(router.push).toHaveBeenCalledWith('./login');
  });

  it('displays the cart item count if there are items in the cart', () => {
    const wrapper = mount(Header);
    const cartBadge = wrapper.find('.cart-badge');
    expect(cartBadge.exists()).toBe(true);
    expect(cartBadge.text()).toBe(String(cartStore.cartItemCount));
  });
});
