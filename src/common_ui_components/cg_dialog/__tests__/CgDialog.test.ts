// Dialog.test.ts
import { mount } from '@vue/test-utils';
import { describe, beforeEach, it, expect, vi, afterEach, beforeAll } from 'vitest';
import CgDialog from '../CgDialog.vue';

const defaultProps = {
  isOpen: true,
  closeIcon: true,
  fullScreen: false,
  fullWidth: false,
  maxWidth: 'sm',
};

describe('Dialog Component Tests', () => {
  let wrapper: any;

  beforeAll(() => {
    wrapper = mount(CgDialog, {
      props: defaultProps,
      slots: {
        title: '<h1>Dialog Title</h1>',
        default: '<p>Dialog Content</p>',
        actions: '<button>Confirm</button>',
      },
    });
  });

  it('should render the dialog when isOpen is true', () => {
    expect(wrapper.find('.dialog').exists()).toBe(true);
    // expect(wrapper.find ('.dialog-title')).toBe(true);
    // expect(wrapper.find('.dialog-content').text()).toBe('Dialog Content');
  });

  it('should apply classes based on props', () => {
    expect(wrapper.classes()).toContain('dialog-default');
    expect(wrapper.classes()).toContain('max-width-sm');
    expect(wrapper.find('.close-button').exists()).toBe(true);
  });

//   it('should emit close event when close button is clicked', async () => {
//     const closeButton = wrapper.find('.close-button');
//     expect(closeButton.exists()).toBe(true); // Assert that the button exists

//     await closeButton.trigger('click'); // Trigger click on the close button
//     console.log(wrapper.emitted());
//     expect(wrapper.emitted('close')).toBeTruthy(); 
//   });

//   it('should not render the dialog when isOpen is false', async () => {
//     await wrapper.setProps({ isOpen: false });
//     expect(wrapper.find('.dialog').exists()).toBe(false);
//   });

//   it('should close the dialog when escape key is pressed', async () => {
//     const closeSpy = vi.fn();
//     wrapper.vm.$emit = closeSpy; 

//     await wrapper.setProps({ isOpen: true, disableEscapeKeyDown: false });
//     window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

//     expect(closeSpy).toHaveBeenCalled();
//   });

  it('should not close the dialog when escape key is pressed and disableEscapeKeyDown is true', async () => {
    const closeSpy = vi.fn();
    wrapper.vm.$emit = closeSpy; 

    await wrapper.setProps({ isOpen: true, disableEscapeKeyDown: true });
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(closeSpy).not.toHaveBeenCalled();
  });

  afterEach(() => {
    wrapper.unmount(); 
  });
});
