import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import CgCard from '../CgCard.vue';

describe('CardComponent', () => {
    let wrapperResuable: any;
    beforeEach(() => {
        wrapperResuable = mount(CgCard, {
          slots: {
            title: '<h1>Card Title</h1>',
            default: '<p>Card Content</p>',
          },
          props: { elevation: 3, rounded: false },
        });
      });
  it('renders the component with default props', () => {
    const wrapper = mount(CgCard);
    expect(wrapper.exists()).toBe(true); 
    expect(wrapper.classes()).toContain('card'); 
    expect(wrapper.classes()).toContain('elevation-2'); 
    expect(wrapper.classes()).toContain('rounded'); 
  });

  it('applies custom elevation and rounded classes', () => {
    const wrapper = mount(CgCard, {
      props: {
        elevation: 4,
        rounded: 'lg',
      },
    });
    expect(wrapper.classes()).toContain('elevation-4');
    expect(wrapper.classes()).toContain('rounded-lg');
  });

  it('applies the correct styles based on props', () => {
    const wrapper = mount(CgCard, {
      props: {
        width: 300,
        height: '400px',
        minHeight: 150,
      },
    });

    const style = wrapper.attributes('style');
    expect(style).toContain('width: 300px;');
    expect(style).toContain('height: 400px;');
    expect(style).toContain('min-height: 150px;');
  });

  it('renders the title, subtitle, and actions slots', () => {
    const wrapper = mount(CgCard, {
      slots: {
        title: '<h1>Card Title</h1>',
        subtitle: '<h2>Card Subtitle</h2>',
        actions: '<button>Action</button>',
      },
    });

    expect(wrapper.find('.card-title').exists()).toBe(true);
    expect(wrapper.find('.card-title').html()).toContain('Card Title');

    expect(wrapper.find('.card-subtitle').exists()).toBe(true);
    expect(wrapper.find('.card-subtitle').html()).toContain('Card Subtitle');

    expect(wrapper.find('.card-actions').exists()).toBe(true);
    expect(wrapper.find('.card-actions').html()).toContain('Action');
  });
  it('should render the title slot content', () => {
    expect(wrapperResuable.html()).toContain('Card Title');
  });

  it('should apply the correct elevation class', () => {
    expect(wrapperResuable.classes()).toContain('elevation-3');
  });

  it('should not apply the rounded class when rounded is false', () => {
    expect(wrapperResuable.classes()).not.toContain('rounded');
  });

  it('renders the default slot content', () => {
    const wrapper = mount(CgCard, {
      slots: {
        default: '<p>This is the card content</p>',
      },
    });

    expect(wrapper.find('.card-content').exists()).toBe(true);
    expect(wrapper.find('.card-content').html()).toContain('This is the card content');
  });

  it('does not render unused slots', () => {
    const wrapper = mount(CgCard);
    expect(wrapper.find('.card-title').exists()).toBe(false);
    expect(wrapper.find('.card-subtitle').exists()).toBe(false);
    expect(wrapper.find('.card-actions').exists()).toBe(false);
  });
});
