import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useSupplierStore } from '../../piniastore/suppliers';
import SupplierLogin from '../SupplierLogin.vue'; 
import { describe, it, beforeEach, expect, vi } from 'vitest';

describe('SupplierLogin.vue', () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  it('renders the login form correctly', () => {
    const wrapper = mount(SupplierLogin);

    expect(wrapper.find('h2').text()).toBe('Supplier Login');
    expect(wrapper.find('input#email').exists()).toBe(true);
    expect(wrapper.find('input#password').exists()).toBe(true);
    expect(wrapper.find('button.login-btn').text()).toBe('Login');
  });

  it('submits the form and calls the loginSupplier method', async () => {
    const wrapper = mount(SupplierLogin);
    const supplierStore = useSupplierStore();
    const loginSpy = vi.spyOn(supplierStore, 'loginSupplier');

    await wrapper.find('input#email').setValue('supplier@example.com');
    await wrapper.find('input#password').setValue('Madhuri@123');
    await wrapper.find('form#loginForm').trigger('submit.prevent'); 

    expect(loginSpy).toHaveBeenCalledWith('supplier@example.com', 'Madhuri@123');
  });

  it('requires email and password fields', async () => {
    const wrapper = mount(SupplierLogin);

    await wrapper.find('button.login-btn').trigger('click'); // Click the login button without filling fields

    expect(wrapper.find('input#email').element.validity.valid).toBe(false);
    expect(wrapper.find('input#password').element.validity.valid).toBe(false);
  });
  it("Supplier Login",(async ()=>{
    const wrapper = mount(SupplierLogin);
    await wrapper.find('input#email').setValue("madhuri@cognine.com");
   await wrapper.find('input#password').setValue("Hello123");
    expect(wrapper.vm.supplier.email).toBe("madhuri@cognine.com");
expect(wrapper.vm.supplier.password).toBe("Hello123");
    expect(wrapper.html()).toMatchSnapshot();


  }))
});
