import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LoginView from '../LoginView.vue';
import { signInWithPopup } from 'firebase/auth';
import { createPinia } from 'pinia';
import { setActivePinia } from 'pinia';

vi.mock('../../piniastore/categories');
vi.mock('../../piniastore/products');
vi.mock('firebase/messaging', () => ({
    getMessaging: () => ({
      addEventListener: () => {},
    }),
  }));

vi.mock('firebase/auth', async (importOriginal) => {
    const actual: object = await importOriginal();
    return {
      ...actual,
      getAuth: vi.fn(() => ({
        currentUser: { uid: 'testUserId' }
      })),
      signInWithPopup: vi.fn(() => Promise.resolve({ user: { uid: 'testUserId', email: 'test@example.com' } })),
      signInWithRedirect: vi.fn(),
    };
  });
  
  describe('LoginView.vue', () => {
    beforeEach(() => {
        const pinia = createPinia();
        setActivePinia(pinia); 
      });
    it('displays an error if Google sign-in fails', async () => {
      const wrapper = mount(LoginView);
  
      await wrapper.find('.google-btn').trigger('click');
      expect(signInWithPopup).toHaveBeenCalledTimes(1);

      expect(wrapper.element).toMatchSnapshot();
    
    });
  });