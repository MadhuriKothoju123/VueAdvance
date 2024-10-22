// tests/Button.spec.ts
import { mount } from '@vue/test-utils';
// import { describe, it, expect } from 'vitest';
import CgButton from '../CgButton.vue';
import { describe, expect, it } from 'vitest';

describe('Button Component', () => {
  it('renders the button with default props', () => {
    const wrapper = mount(CgButton);
    expect(wrapper.classes()).toContain('btn');
  });

  it('displays loading spinner when loading is true', () => {
    const wrapper = mount(CgButton, {
      props: { loading: true },
    });
    expect(wrapper.find('.loading-spinner').exists()).toBe(true);
    expect(wrapper.attributes('disabled')).toBe("");
  });

  it('disables the button when disabled is true', () => {
    const wrapper = mount(CgButton, {
      props: { disabled: true },
    });
    expect(wrapper.attributes('disabled')).toBe("");
  });
  it('the button when disabled is false', () => {
    const wrapper = mount(CgButton, {
      props: { disabled: false },
    });
    expect(wrapper.attributes('disabled')).toBe(undefined);
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(CgButton, {
      props: { disabled: false, loading: false },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });

  it('does not emit click event if loading or disabled', async () => {
    const wrapper = mount(CgButton, {
      props: { loading: true },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted()).not.toHaveProperty('click');
  });

  it('renders slot content', () => {
    const wrapper = mount(CgButton, {
      slots: { default: 'Click me' },
    });
    expect(wrapper.text()).toBe('Click me');
  });
});
